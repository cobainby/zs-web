<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" shadow="never" v-loading="loading">
        <!-- 数据表格 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:-10px;">
          <el-tab-pane class="chartsPanel" label="成果数据" name="first-ta">
            <!-- 搜索栏 -->
            <el-form :inline="true">
              <el-form-item label="开始时间">
                <el-date-picker id="startTime" v-model="filters.column.create_start_date" size="small" type="datetime" :picker-options="pickerBeginDateBefore" placeholder="" default-time="00:00:00">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="至" label-width="25px">
                <el-date-picker id="endTime" v-model="filters.column.create_end_date" size="small" type="datetime" :picker-options="pickerBeginDateAfter" placeholder="" default-time="23:59:59">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" size="small" @click="handleSearch">查询</el-button>
                <el-button @click="handleRest" size="small">重置</el-button>
              </el-form-item>
              <el-button class="filter-item fr" size="small" style="margin-right: 10px;" @click="getBack" type="primary" icon="el-icon-back">返回列表</el-button>
            </el-form>
            <el-table :data="selectDatas" border :row-style="tableRowStyle" :default-sort="{prop:'pointCode'}" :header-cell-style="tableHeaderStyle" style="width: 100%;" :height="tableHeight" @selection-change="handleSelectionChange">
              <el-table-column align="center" prop="pointCode" label="测点编号" :show-overflow-tooltip="true" sortable>
              </el-table-column>
              <el-table-column align="center" label="初始值">
                <template slot-scope="scope">
                  <span>{{scope.row.initialValue}}</span>
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
              <el-table-column align="center" label="变化速率(mm/d)" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.rateVary}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="采集时间" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-if="scope.row.surveyTime!=null">{{scope.row.surveyTime|dateTimeFormat}}</span>
                  <span v-if="scope.row.surveyTime==null"></span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
            <!-- 数据表格 / -->
          </el-tab-pane>
          <el-tab-pane label="单次变化量" name="second-ta">
            <div :class="className" id="wysLineGap"></div>
          </el-tab-pane>
          <el-tab-pane label="累计变化量" name="third-ta">
            <div :class="className" id="wysLineAccum"></div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/example/table";
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { getHorizontal } from "@/api/base/chartData"; //调用轴力接口
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
      tableHeight: window.innerHeight - 250,
      activeName: "first-ta",
      projectUuid: "",
      monitorItemUuid: "",
      lastVarySeries: [], //曲线图单次变化量的数据
      accumVarySeries: [], //曲线图累计变化量的数据
      timeSeries: [], //横轴的时间数据
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
      allItems: new Array(), //所有wys的数据
      wysPoints: [], //所有wys点的集合
      lastWysDatas: [], //wys的最新一条数据
      selectDatas: [], //wys的勾选时间以后的表格数据，未限定时间时与lastWysDatas相等
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
    //tab切换获取当前ID
    handleClick: function(tab, event) {
      $("#wysLineGap").width($(".chartsPanel").width());
      $("#wysLineGap").height($(window).height() - 180);
      $("#wysLineAccum").width($(".chartsPanel").width());
      $("#wysLineAccum").height($(window).height() - 180);
      this.initChart();
    },
    //图形展示
    initChart() {
      var myChartGap = echarts.init(
        document.getElementById("wysLineGap"),
        "macarons"
      );
      var myChartAccum = echarts.init(
        document.getElementById("wysLineAccum"),
        "macarons"
      );
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.wysPoints
        },
        grid: {
          left: "60",
          top: "32",
          right: "60",
          bottom: "38"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        dataZoom: {
          show: true,
          realtime: true,
          start: 10,
          end: 90
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.timeSeries
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} mm"
            }
          }
        ]
      };
      myChartGap.setOption(option);
      myChartGap.setOption({
        series: this.lastVarySeries
      });
      myChartAccum.setOption(option);
      myChartAccum.setOption({
        series: this.accumVarySeries
      });
    },
    // 业务方法
    init(page, limit) {
      this.monitorItemUuid = this.$route.query.monitorItemUuid;
      this.projectUuid=this.$route.query.id;
      getHorizontal({
        monitorItemUuid: this.monitorItemUuid,
        token: this.token
      }).then(res => {
        this.pagination.currentPage = page;
        this.pagination.pageSize = limit;
        this.allItems = res.data.data;
        this.pagination.total = res.data.length;
        this.loading = false;
        var wysPoints = []; //测点的集合
        $.each(res.data.data, function(i) {
          console.log(i);
          wysPoints.push(i);
        });
        this.wysPoints = wysPoints; //点的集合
        this.lastVarySeries = []; //单次变化量的曲线图数据源集合初始化一次
        this.accumVarySeries=[];//累计变化量的曲线图数据初始化一次
        this.lastWysDatas = []; //初始化一次
        for (var k = 0; k < this.wysPoints.length; k++) {
          var wysDatas = this.allItems[this.wysPoints[k]]; //每个点的数据
          var lastData = wysDatas[wysDatas.length - 1]; //每个点的最新数据
          if (lastData == undefined) {
            lastData = new Object();
          }
          lastData["pointCode"] = this.wysPoints[k];
          this.lastWysDatas.push(lastData); //最新一条数据的集合，用于表格
          this.selectDatas = this.lastWysDatas; //初始化为限定时间时，表格数据就是所有点的最新数据
          //折线图数据源的获取
          var lastVaryData = []; //单次变化量的data二维数组，存放时间和单次变化量
          var accumVaryData = []; //累计变化量的data二维数组，存放时间和累计变化量
          var singleTime = new Object(); //测量时间
          for (var j = 0; j < wysDatas.length; j++) {
            singleTime = this.changeTimeFormat(wysDatas[j].surveyTime); //格式化时间
            lastVaryData[j] = [singleTime, wysDatas[j].lastVary];
            accumVaryData[j] = [singleTime, wysDatas[j].accumVary];
            if (this.timeSeries.indexOf(singleTime) == -1) {
              this.timeSeries.push(singleTime);
            }
          }
          //构造曲线图series的形态
          var lastVarySingle = new Object(); //单个点的单次变化量数据
          var accumVarySingle = new Object(); //单个点的累计变化量数据
          //构造echart的series格式
          lastVarySingle["name"] = this.wysPoints[k];
          lastVarySingle["type"] = "line";
          lastVarySingle["smooth"] = false; //决定线图是折线还是曲线
          lastVarySingle["data"] = lastVaryData;
          this.lastVarySeries.push(lastVarySingle);
          accumVarySingle["name"] = this.wysPoints[k];
          accumVarySingle["type"] = "line";
          accumVarySingle["smooth"] = false; //决定线图是折线还是曲线
          accumVarySingle["data"] = accumVaryData;
          this.accumVarySeries.push(accumVarySingle);
        }
        this.timeSeries.sort((a, b) => new Date(a) - new Date(b));
        console.log(this.lastVarySeries);
        console.log(this.timeSeries);
      });
    },
    //重置时间选择框的选择项
    handleRest() {
      $("#startTime").val("");
      $("#endTime").val("");
      this.selectDatas = this.lastWysDatas;
    },
    //根据时间查询最新数据
    handleSearch() {
      debugger;
      var timesData = [];
      var beforeTime = new Date(
        this.filters.column.create_start_date
      ).getTime();
      var afterTime = new Date(this.filters.column.create_end_date).getTime();
      var newTime;
      for (var i = 0; i < this.lastWysDatas.length; i++) {
        newTime = new Date(this.lastWysDatas[i].surveyTime).getTime();
        if (newTime >= beforeTime && newTime <= afterTime) {
          timesData.push(this.lastWysDatas[i]);
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
      debugger;
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
