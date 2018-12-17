<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never" v-loading="loading">
        <!-- 搜索栏 -->
        <el-form :inline="true" :model="formSearch" style="margin-top:-5px;">
          <el-form-item label="开始时间">
            <el-date-picker v-model="filters.column.create_start_date" size="small" type="date" :picker-options="pickerBeginDateBefore" format="yyyy-MM-dd" placeholder="">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="至" label-width="25px">
            <el-date-picker v-model="filters.column.create_end_date" size="small" type="date" format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter" placeholder="">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" @click="handleSearch">查询</el-button>
            <el-button @click="handleRest" size="small">重置</el-button>
            <el-button type="text" @click="handleExpand"></el-button>
          </el-form-item>
          <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="getBack" type="primary" icon="el-icon-back">返回列表</el-button>
        </el-form>
        <!-- 数据表格 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:-10px;">
          <el-tab-pane class="chartsPanel" label="数据展示" name="first-ta">
            <el-table :data="lastZcData" border :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" style="width: 100%;" :height="tableHeight" @selection-change="handleSelectionChange">
              <el-table-column align="center" label="测点编号" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.pointCode}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  label="支撑类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.forceType==0">锚索内力</span>
                  <span v-if="scope.row.forceType==1">钢支撑内力</span>
                  <span v-if="scope.row.forceType==2">硂支撑内力</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  label="计算值" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.calValue}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="采集模数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.moduleData}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单次变化量" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.lastVary}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center"  label="单次变化速率" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.rateVary}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="累计变化量" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.accumVary}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  label="采集时间" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.surveyTime}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
            <!-- 数据表格 / -->
          </el-tab-pane>
          <el-tab-pane class="chartsPanel" label="图形展示" name="second-ta">
            <div :class="className" id="enLine"></div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹出窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :rules="rules" ref="dataForm" :model="formData" label-width="50px" label-position="right">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="formData.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="类型">
            <el-option label="CN" value="CN"></el-option>
            <el-option label="US" value="US"></el-option>
            <el-option label="JP" value="JP"></el-option>
            <el-option label="EU" value="EU"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSave(false)">取 消</el-button>
        <el-button type="primary" @click="handleSave(true)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出窗 / -->
  </div>
</template>

<script>
import { list } from "@/api/example/table";
import echarts from "echarts";
import { debounce } from "@/utils";
require("echarts/theme/macarons"); // echarts theme
import { getForce } from "@/api/base/chartData"; //调用轴力接口
import { getFdSet, getSuveyPointSet } from "@/api/base/project"; //通过该项目获取当前监测项ID
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
      tableHeight: window.innerHeight - 290,
      activeName: "first-ta",
      projectUuid: "",
      monitorUuid: "",
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
      formSearch: {
        user: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        state: ""
      },
      barSearch: {
        expandInputs: false,
        expandBtnText: "",
        alertText: ""
      },
      allItems: new Array(), //所有zc的数据
      zcPoints: [], //所有zc点的集合
      lastZcData: [], //zc的最新一条数据
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: true,
      multipleSelection: [],
      dialogVisible: false,
      formData: [],
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 45, message: "长度在 5 到 45 个字符", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
      }
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
      $("#enLine").width($(".chartsPanel").width());
      $("#enLine").height($(window).height() - 280);
      this.initChart();
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    },
    //图形展示
    initChart() {
      var myChart = echarts.init(document.getElementById("enLine"));
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "g1",
            "g2",
            "g3",
            "g4",
            "g5",
            "g6",
            "g7",
            "g8",
            "g9",
            "g10",
            "g11"
          ]
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
          start: 20,
          end: 80
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push("2018-03-" + i);
              }
              return list;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            min: -3,
            max: 3
          }
        ],
        series: [
          {
            name: "g1",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                debugger;
                list.push(-Math.random());
              }
              return list;
            })()
          },
          {
            name: "g2",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g3",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g4",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(-Math.random());
              }
              return list;
            })()
          },
          {
            name: "g5",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g6",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g7",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(-Math.random());
              }
              return list;
            })()
          },
          {
            name: "g8",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g9",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g10",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          },
          {
            name: "g11",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.random());
              }
              return list;
            })()
          }
        ]
      });
    },
    // 业务方法
    init(page = 1, limit = 20) {
      debugger;
      this.projectUuid = this.$route.query.id;
      console.log(this.projectUuid);
      getFdSet({ projectUuid: this.projectUuid, token: this.token }).then(
        res => {
          //先拿到当前监测项的monitorItemUuid
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].mItemName == "支撑内力") {
              var monitorItemUuid = res.data.data[i].monitorItemUuid;
              break; //拿到当前监测项ID后就终止循环
            }
          }
          if (monitorItemUuid == null || monitorItemUuid == undefined) {
            this.$message.info("当前监测项没有数据!"); //当前无数据
            return;
          }
          // 获取当前uuid下的所有数据
          getForce({
            monitorItemUuid: monitorItemUuid,
            token: this.token
          }).then(res => {
            this.pagination.currentPage = page;
            this.pagination.pageSize = limit;
            this.barSearch.alertText = "";
            this.allItems = res.data.data;
            this.pagination.total = res.data.length;
            this.barSearch.alertText = `共 ${this.pagination.total} 条记录`;
            this.loading = false;
            getSuveyPointSet({
              monitorItemUuid: monitorItemUuid,
              token: this.token
            }).then(res => {
              for (var j = 0; j < res.data.data.length; j++) {
                this.zcPoints.push(res.data.data[j].surveypointNumber);
              }
              for (var k = 0; k < this.zcPoints.length; k++) {
                var zcDatas = this.allItems[this.zcPoints[k]]; //每个点的数据
                var lastData = zcDatas[zcDatas.length - 1]; //每个点的最新数据
                if (lastData == undefined) {
                  lastData = new Object();
                }
                lastData["pointCode"] = this.zcPoints[k];
                this.lastZcData.push(lastData);
              }
              console.log(this.lastZcData);
            });
          });
        }
      );
    },
    // UI方法
    handleRest() {
      this.formSearch = {
        user: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        state: ""
      };
    },
    handleExpand() {
      this.barSearch.expandInputs = !this.barSearch.expandInputs;
      this.barSearch.expandBtnText = this.barSearch.expandInputs
        ? "收起▲"
        : "展开▼";
    },
    handleSearch() {
      this.doQuery();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val, this.multipleSelection);
    },
    handleSizeChange(val) {
      this.doQuery(1, val);
    },
    handleCurrentChange(val) {
      this.doQuery(val, this.pagination.pageSize);
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(ret => {
          console.log(ret);
          this.dialogVisible = false;
        })
        .catch(ret => {
          console.log(ret);
        });
    },
    handleNew() {
      this.formData = {
        title: "",
        author: "",
        type: ""
      };
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleEdit(item) {
      this.formData = {
        ...item
      };
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleSave(isSave) {
      if (isSave) {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            this.dialogVisible = false;
            this.$message({
              message: "保存成功",
              type: "success"
            });
          } else {
            return false;
          }
        });
      } else {
        this.dialogVisible = false;
      }
    },
    handleDelete(item) {
      this.$confirm("确认删除？")
        .then(ret => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          console.log(ret);
        })
        .catch(ret => {
          console.log(ret);
        });
    }
  },
  created() {
    this.barSearch.expandInputs = false;
    this.barSearch.expandBtnText = "展开▼";
    this.init();
  },
  // 挂载结束
  mounted: function() {}
};
</script>

<style rel="stylesheet/css" scoped>
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
