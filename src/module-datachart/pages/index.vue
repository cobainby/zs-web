<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never" v-loading="loading">
        <!-- 数据表格 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane class="chartsPanel" label="概览" name="first-ta">
            <el-table :data="items" border :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" style="width: 100%; margin-top:10px;" @selection-change="handleSelectionChange">
              <el-table-column align="center" prop="title" label="监测项目"></el-table-column>
              <el-table-column label="累计变化">
                <el-table-column align="center" prop="title" label="点号"></el-table-column>
                <el-table-column align="center" prop="importance" label="最大值(mm)"></el-table-column>
              </el-table-column>
              <el-table-column label="变化速率">
                <el-table-column align="center" prop="title" label="点号"></el-table-column>
                <el-table-column align="center" prop="forecast" label="最大值(mm/d)"></el-table-column>
              </el-table-column>
              <el-table-column label="报警指标">
                <el-table-column align="center" prop="warning" label="报警值"></el-table-column>
                <el-table-column align="center" prop="warning" label="允许值(mm)"></el-table-column>
                <el-table-column align="center" prop="warning" label="变化速率(mm/d)"></el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="pageviews" label="报警情况">
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
          <el-tab-pane class="chartsPanel" label="现场图片" name="second-ta">
            <!-- <div :class="className" id="enLine"></div> -->
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
  name: "database-table",
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
      activeName: "first-ta",
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
      return "background-color:#FFDCA9;color: #000000;text-align:center;";
    },
    //tab切换获取当前ID
    handleClick: function(tab, event) {
      $("#enLine").width($(".app-container").width());
      $("#enLine").height($(window).height() - 300);
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
    this.doQuery();
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
