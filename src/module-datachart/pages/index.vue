<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never" v-loading="loading">
        <!-- 搜索栏 -->
        <el-form :inline="true" :model="formSearch">
          <el-form-item label="开始时间">
            <el-date-picker v-model="filters.column.create_start_date" type="date" :picker-options="pickerBeginDateBefore" format="yyyy-MM-dd" placeholder="">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="至" label-width="25px">
            <el-date-picker v-model="filters.column.create_end_date" type="date" format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter" placeholder="">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="活动时间" v-if="barSearch.expandInputs">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="formSearch.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formSearch.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" v-if="barSearch.expandInputs">
            <el-switch v-model="formSearch.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动状态" v-if="barSearch.expandInputs">
            <el-select v-model="formSearch.state" placeholder="活动状态">
              <el-option label="开启" value="1"></el-option>
              <el-option label="关闭" value="0"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="warning" @click="handleSearch">查询</el-button>
            <el-button @click="handleRest">重置</el-button>
            <el-button type="text" @click="handleExpand"></el-button>
          </el-form-item>
        </el-form>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="handleNew">新建</el-button>
        <el-alert v-if="barSearch.alertText !== ''" :title="barSearch.alertText" type="info" class="alert" :closable='false' show-icon>
        </el-alert> -->
        <!-- 搜索栏 / -->
        <!-- 数据表格 -->
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane class="chartsPanel" label="数据展示" name="first-ta">
            <el-table :data="items" border :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" style="width: 100%; margin-top:10px;" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="title" label="监测项目"></el-table-column>
              <el-table-column prop="type" label="监测时间" width="140"></el-table-column>
              <el-table-column prop="author" label="测点数量" width="80"></el-table-column>
              <el-table-column prop="reviewer" label="实测数量" width="80"></el-table-column>
              <el-table-column prop="pageviews" label="最大值累计值测点" width="150"></el-table-column>
              <el-table-column prop="display_time" label="最大累计值" width="120"></el-table-column>
              <el-table-column prop="display_time" label="最大变化值测点" width="150"></el-table-column>
              <el-table-column prop="display_time" label="最大变化值" width="120"></el-table-column>
              <el-table-column prop="pageviews" label="报告" width="80"></el-table-column>
              <el-table-column prop="pageviews" label="报警情况" width="80"></el-table-column>
              <el-table-column prop="pageviews" label="审核信息" width="80"></el-table-column>
              <el-table-column prop="pageviews" label="提交审核时间" width="140"></el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
                  <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
            <!-- 数据表格 / -->
          </el-tab-pane>
          <el-tab-pane class="chartsPanel" label="图形展示" name="second-ta" >
            <div :class="className"  id="enLine" :style="{height:height,width:width}"></div>
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

export default {
  name: "datachart-table-index",
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
      activeName2: "first-ta",
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
      items: [],
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: false,
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
          data: ["最高", "最低"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataZoom: { show: true },
            dataView: { show: true },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
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
                list.push("2013-03-" + i);
              }
              return list;
            })()
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "最高",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 30));
              }
              return list;
            })()
          },
          {
            name: "最低",
            type: "line",
            data: (function() {
              var list = [];
              for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 10));
              }
              return list;
            })()
          }
        ]
      });
    },
    // 业务方法
    doQuery(page = 1, limit = 20) {
      this.pagination.currentPage = page;
      this.pagination.pageSize = limit;
      this.loading = true;
      this.barSearch.alertText = "";
      this.items = [];
      list({ page, limit })
        .then(res => {
          console.log(res.data);
          this.items = res.data.items;
          this.pagination.total = res.data.total;
          this.barSearch.alertText = `共 ${this.pagination.total} 条记录`;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
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
  }
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
