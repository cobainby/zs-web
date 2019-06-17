<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card  class="box-card" shadow="never" v-loading="loading">
        <el-row>
          <el-col :span="12">
            <!-- 搜索栏 -->
            <el-form :inline="true">
              <el-form-item label="根据点号过滤">
                <el-select size="small" style="width:100px;" @change="getPointCode" v-model="initialValue" placeholder="请选择">
                  <el-option id="pointCode" v-for="item in cxPoints" :key="item" :label="item" :value="item" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="根据次数过滤">
                <el-select size="small" style="width:100px;" @change="getNumber" v-model="selectNumber" placeholder="请选择">
                  <el-option id="numbers" v-for="item in numbersList" :key="item.numberValue" :label="item.numberText" :value="item.numberValue" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button class="filter-item fr" size="small"  type="primary" icon="el-icon-back">返回列表</el-button>
           <el-button
                size="small"
                class="filter-item fr"
                style="margin-right:10px;"
                type="success"
                @click="exportData()"
              >
                报表导出
                <i class="el-icon-download el-icon--right"></i>
              </el-button>
            </el-form>
            <el-table :data="selectDatas" border :default-sort="{prop:'depth'}" :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" style="width: 100%;margin-top:-10px;" :height="tableHeight" @selection-change="handleSelectionChange">
              <el-table-column align="center" label="埋深" prop="depth" :show-overflow-tooltip="true" sortable>
              </el-table-column>
              <el-table-column align="center" label="上次累计位移(mm)" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.calValue}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单次变化量(mm)" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.lastVary}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="累计变化量(mm)" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.accumVary}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单次变化速率(mm/d)" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.rateVary}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
          </el-col>
          <el-col :span="12">
            <!-- 数据表格 / -->
            <div :class="className" id="cxLine"></div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/example/table";
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { getClinometer, getCliPointNumbers } from "@/api/base/chartData"; //调用测斜相关接口
import { viewSuveryPointSet } from "@/api/base/project"; //调用报警设置接口
import { getToken } from "@/utils/auth";

export default {
  name: "dataIndex",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
      tableHeight: window.innerHeight - 200,
      chartHeight: window.innerHeight - 110,
      activeName: "first-ta",
      projectUuid: "",
      monitorItemUuid: "",
      token: getToken(),
      filters: {
        column: {
          create_start_date: "",
          create_end_date: ""
        }
      },
      pickerBeginDateBefore: {
        disabledDate: time => {
          let beginDateVal = this.filters.column.create_end_date;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: time => {
          let beginDateVal = this.filters.column.create_start_date;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        }
      },
      selectModel: [], //选择框的初始值
      depthData: [], //埋深
      allAccumOffsetData: [], //累计位移值
      warningPlusData: [], //报警正值集合
      warningMIData: [], //报警负值集合
      controlPlusData: [], //控制值正值集合
      controlMIData: [], //控制值负值集合
      warningPlus: [], //报警正值
      warningMI: [], //报警负值
      controlPlus: [], //控制值正值
      controlMI: [], //控制值负值
      accumVarySeries: [], //曲线图累计变化量的数据
      timeSeries: [], //横轴的时间数据
      allItems: new Array(), //所有cx的数据
      cxPoints: [], //所有cx点的集合
      initialValue: "", //默认选中点号
      numbersList: [], //测量次数数组
      surveypointUuid: "", //当前选择的点号
      selectNumber: "", //当前选择的次数
      lastCxDatas: [], //cx的最新一条数据
      selectDatas: [], //cx的勾选时间以后的表格数据，未限定时间时与lastCxDatas相等
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: true,
      multipleSelection: []
    };
  },
  methods: {
    getBack() {
      this.$router.push({ path: "/itemList" });
    },
    //表格table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "background-color:#FFF7EA";
      } else {
        return "background-color:#ffffff";
      }
    },
    //修改table header的背景色和居中显示
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background-color:#FFDCA9;color: #000000;text-align:center;";
      }
    },
    //图形展示
    initChart() {
      var chartOption = {
        legend: {
          data: [
            "本次累计位移",
            "报警值(+)",
            "报警值(-)",
            "控制值(+)",
            "控制值(-)"
          ],
          itemHeight: 8,
          itemWidth: 18,
          itemGap: 8,
          textStyle: {
            fontSize: 10
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "深度：{b}m,累计位移{c}mm"
        },
        grid: {
          left: "6%",
          right: "6%",
          containLabel: true
        },
        xAxis: {
          name: "累计位移",
          nameLocation: "middle",
          nameGap: "30",
          position: "top",
          type: "value",
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#aaa"]
            }
          },
          axisLabel: {
            formatter: "{value} mm"
          }
        },
        yAxis: {
          name: "埋深",
          nameLocation: "middle",
          nameGap: "50",
          type: "category",
          axisLine: {
            onZero: false
          },
          axisLabel: {
            formatter: "{value} m"
          },
          boundaryGap: false,
          data: this.depthData
        },
        series: [
          {
            name: "本次累计位移",
            type: "line",
            smooth: false,
            symbolSize: 10,
            symbol: "diamond",
            lineStyle: {
              normal: {
                width: 2.5
              }
            },
            data: this.allAccumOffsetData
          },
          {
            name: "报警值(+)",
            type: "line",
            smooth: false,
            symbolSize: 8,
            symbol: "Rect",
            itemStyle: {
              normal: {
                color: "#F3FC02"
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                color: "#F3FC02"
              }
            },
            data: this.warningPlusData
          },
          {
            name: "报警值(-)",
            type: "line",
            smooth: false,
            symbolSize: 8,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "#F3FC02"
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                color: "#F3FC02"
              }
            },
            data: this.warningMIData
          },
          {
            name: "控制值(-)",
            type: "line",
            smooth: false,
            symbolSize: 8,
            symbol: "roundRect",
            itemStyle: {
              normal: {
                color: "#FB0606"
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                color: "#FB0606"
              }
            },
            data: this.controlMIData
          },
          {
            name: "控制值(+)",
            type: "line",
            smooth: false,
            symbolSize: 8,
            symbol: "triangle",
            itemStyle: {
              normal: {
                color: "#FB0606"
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                color: "#FB0606"
              }
            },
            data: this.controlPlusData
          }
        ]
      };
      var myLineChartAccum = echarts.init(
        document.getElementById("cxLine"),
        "macarons"
      );
      myLineChartAccum.setOption(chartOption);
    },
    init() {
      this.monitorItemUuid = this.$route.query.monitorItemUuid;
      this.projectUuid=this.$route.query.id;
      //拿到点的集合
      getCliPointNumbers({
        monitorItemUuid: this.monitorItemUuid,
        token: this.token
      }).then(res => {
        debugger
        this.allItems = res.data.data;
        var cxPoints = []; //测点的集合
        $.each(res.data.data, function(i) {
          console.log(i);
          cxPoints.push(i);
        });
        this.cxPoints = cxPoints; //点的集合
        this.loading = false;
        this.initialValue = this.cxPoints[0]; //默认选中第一个点号
        this.getPointCode(this.initialValue);
        $("#cxLine").height(this.chartHeight);
      });
    },
    //选择点号
    getPointCode(selval) {
      debugger;
      this.numbersList = []; //初始化测量次数列表
      this.selectNumber = ""; //初始化选中次数
      //如果该点号下有测量次数
      if (
        this.allItems[selval].maxNumber != null &&
        this.allItems[selval].maxNumber != undefined
      ) {
        var maxNumber = this.allItems[selval].maxNumber; //测量次数最大值
        this.surveypointUuid = this.allItems[selval].surveypointUuid; //当前选中的点的uuid
        for (var i = maxNumber; i > 0; i--) {
          var number = {
            numberValue: i,
            numberText: "第" + i + "次"
          };
          this.numbersList.push(number);
        } //拿到测量次数数组
        this.selectNumber = maxNumber; //默认切换点号的时候选择最新一次的测量结果
        //拿到报警设置参数
        viewSuveryPointSet({
          surveypointUuid: this.surveypointUuid,
          token: this.token
        }).then(res => {
          this.warningPlus = res.data.data.paraWarningSet.accumAlarm; //报警正值
          this.warningMI = -res.data.data.paraWarningSet.accumAlarm; //报警负值
          this.controlPlus = res.data.data.paraWarningSet.accumControl; //控制值正值
          this.controlMI = -res.data.data.paraWarningSet.accumControl; //控制值负值
          this.getCliData(1, 20); // 拿到该点当前次数下的数据
        });
      } else {
        this.$message({
          message: "该点号下无数据",
          type: "warning"
        });
        //清空表格和折线图
        this.selectDatas = [];
        this.depthData = [];
        this.allAccumOffsetData = [];
        this.initChart();
      }
    },
    getNumber(numVal) {
      this.selectNumber = numVal;
      this.getCliData(1, 20); // 选中次数后拿到该点当前次数下的数据
    },
    // 拿到数据
    getCliData(page, limit) {
      debugger;
      getClinometer({
        surveypointUuid: this.surveypointUuid,
        collectOrder: this.selectNumber,
        token: this.token
      }).then(res => {
        this.pagination.currentPage = page;
        this.pagination.pageSize = limit;
        this.pagination.total = res.data.length;

        this.depthData = []; //埋深初始化一次
        this.allAccumOffsetData = []; //累计变化量的曲线图数据初始化一次

        this.selectDatas = res.data.data; //初始化为限定时间时，表格数据就是所有点的最新数据
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          this.depthData.push(-res.data.data[i].depth);
          this.allAccumOffsetData.push(res.data.data[i].accumVary);
          this.warningPlusData.push(this.warningPlus); //报警正值集合
          this.warningMIData.push(this.warningMI); //报警负值集合
          this.controlPlusData.push(this.controlPlus); //控制值正值集合
          this.controlMIData.push(this.controlMI); //控制值负值集合
        }
        this.initChart();
      });
    },
    //重置时间选择框的选择项
    handleRest() {
      $("#startTime").val("");
      $("#endTime").val("");
      this.selectDatas = this.lastCxDatas;
    },
    //根据时间查询最新数据
    handleSearch() {
      var timesData = [];
      var beforeTime = new Date(
        this.filters.column.create_start_date
      ).getTime();
      var afterTime = new Date(this.filters.column.create_end_date).getTime();
      var newTime;
      for (var i = 0; i < this.lastCxDatas.length; i++) {
        newTime = new Date(this.lastCxDatas[i].surveyTime).getTime();
        if (newTime >= beforeTime && newTime <= afterTime) {
          timesData.push(this.lastCxDatas[i]);
        }
      }
      this.selectDatas = timesData;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val, this.multipleSelection);
    },
    handleSizeChange(val) {
      this.init(1, val);
    },
    handleCurrentChange(val) {
      this.init(val, this.pagination.pageSize);
    },
    //格式化时间
    changeTimeFormat(val) {
      var d = new Date(val);
      var times =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2) +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2);
      return times;
    }
  },
  created() {
    this.init(1, 20);
  },
  // 挂载结束
  mounted: function() {},
  watch: {
    $route: function(to, from) {
      // 通过监听跳转来重新刷新数据
      this.init(1, 20);
    }
  }
};
</script>

<style rel="stylesheet/css" scoped>
.box-card {
  margin: -15px;
}
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ffffff !important;
}
</style>
