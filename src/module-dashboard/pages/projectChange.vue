<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="tableListTitle2" style="margin-top:5px;">
                <label id="projectName">基坑测试项目</label>
         </div>
      </el-col>
      <el-col :span="1">
        <el-button id="backButton" @click="getBack" style="margin-bottom:5px;" size="mini" type="primary" icon="el-icon-caret-left">返回</el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" v-loading="loading">
      <!-- 搜索栏 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="chartsPanel" label="工程概况" name="first-ta">
          <!-- 项目当前信息 / -->
          <form id="projectForm" style="height:100%;overflow:auto;">
            <input id="formUrl" type="hidden">
            <input id="projectUuid" type="hidden">
            <table id="tableHeader" cellpadding="0" cellspacing="0">
              <tr>
                <th id="tableName">
                  工程概况
                </th>
              </tr>
            </table>
            <table class="tableEditDetail" id="projectInfo" style="height:45%;" cellpadding="0" cellspacing="1">
              <tr>
                <th style="width: 15%;">
                  工程编号
                </th>
                <td style="width: 35%">
                  <textarea name="code" rows="2" cols="20" class="input" id="code" style="height:30px;width:80%;"></textarea>
                </td>
                <th style="width: 15%">
                  监督编号
                </th>
                <td>
                  <textarea name="superviseCode" rows="2" cols="20" class="input" id="superviseCode" style="height:30px;width:80%;"></textarea>
                </td>
              </tr>
              <tr>
                <th style="width: 15%">
                  工程名称
                </th>
                <td>
                  <textarea name="projectName" rows="2" cols="20" id="projectName" class="input" style="height:30px;width:80%;" required></textarea>
                </td>
                <th>
                  工程地址
                </th>
                <td>
                  <textarea name="address" rows="2" cols="20" id="address" class="input" style="height:30px;width:80%;" required></textarea>
                  <input type="hidden" name="" id="" />
                  <input type="hidden" name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  工程类别
                </th>
                <td>
                  <input name="projectType" id="projectType" class="easyui-combobox" data-options="valueField: 'value',textField: 'label'" style="width:80%;height:30px;" />
                </td>
                <th>
                  经纬度
                </th>
                <td>
                  <label>经度</label>
                  <input name="lon" maxlength="20" type="text" id="lon" class="input" style="width:16%;" disabled="true " />
                  <label>纬度</label>
                  <input name="lat" maxlength="20" type="text" id="lat" class="input" style="width:16%;" disabled="true " />
                  <input type="button" data-toggle="modal" id="lonlatSelect" class="btton85" value="获取经纬度" />
                  <label style="color:red">(*请选择位置)</label>
                </td>
              </tr>
              <tr>
                <th>
                  支护形式
                </th>
                <td>
                  <textarea name="structure" rows="2" cols="20" id="structure" class="input" style="height:30px;width:80%;"></textarea>
                </td>
                <th>
                  安全等级
                </th>
                <td>
                  <select name="safeLevel" id="safeLevel" class="easyui-combobox" style="width:80%;height:30px;">
                    <option value="">---请选择---</option>
                    <option value="1">一级</option>
                    <option value="2">二级</option>
                    <option value="3">三级</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>
                  基坑设计深度
                </th>
                <td>
                  <textarea name="deep" rows="2" cols="20" id="deep" class="input" style="height:30px;width:80%;"></textarea>(M)
                </td>
                <th>
                  基坑周长:
                </th>
                <td>
                  <textarea name="perimeter" rows="2" cols="20" id="perimeter" class="input" style="height:30px;width:80%;"></textarea>(M)
                </td>
              </tr>
              <tr>
                <th>
                  监测负责人
                </th>
                <td>
                  <input name="monitorLeader" type="text" id="monitorLeader" class="input" style="width:60%;height:30px;" disabled="true " />
                  <el-button id="addMonitorLeader" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                  <el-button id="deleteMonitorLeader" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                </td>
                <th>
                  监测人员
                </th>
                <td>
                  <input name="monitorWorker" type="text" id="monitorWorker" class="input" style="width:60%;height:30px;" disabled="true " />
                  <el-button id="addMonitorWorker" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                  <el-button id="deleteMonitorWorker" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                </td>
              </tr>
              <tr>
                <th>
                  监督单位
                </th>
                <td>
                  <textarea name="superviseCompany" rows="2" cols="20" id="superviseCompany" class="input" style="height:30px;width:80%;"></textarea>
                </td>
                <th>
                  监督人员
                </th>
                <td colspan="1">
                  <textarea name="superviseWorker" rows="2" cols="20" id="superviseWorker" class="input" style="height:30px;width:80%;"></textarea>
                </td>
              </tr>
            </table>
            <table class="tableEditDetail" id="projectInfo1" cellpadding="0" cellspacing="1" style="margin-top: -1px;height:41%;">
              <tr>
                <th style="width: 15%;">
                  建设单位
                </th>
                <td style="width: 35%;">
                  <textarea name="buildCompany" rows="2" cols="20" id="buildCompany" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="buildContactName" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addBuildName" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteBuildName" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th style="width: 15%;">
                  设计单位
                </th>
                <td style="width: 35%;">
                  <textarea name="designCompany" rows="2" cols="20" id="designCompany" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="designContactName" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addDesign" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteDesign" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th style="width: 15%;">
                  施工单位
                </th>
                <td style="width: 35%;">
                  <textarea name="constructCompany" rows="2" cols="20" id="constructCompany" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="constructContactName" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addMonitorLeader" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteMonitorLeader" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th style="width: 15%;">
                  监理单位
                </th>
                <td style="width: 35%;">
                  <textarea name="supervisorCompany" rows="2" cols="20" id="supervisorCompany" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%;background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="supervisorContactName" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addMonitorLeader" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteMonitorLeader" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th colspan="3">
                  <el-button id="saveBtn" type="success" size="mini" icon="el-icon-check">
                    <strong>
                      <i class="glyphicon glyphicon-ok"></i>&nbsp确定</strong>
                  </el-button>
                  <el-button type="info" size="mini" id="cancelBtn" icon="el-icon-delete" data-dismiss="modal">
                    <strong>
                      <i class="glyphicon glyphicon-remove"></i>&nbsp清空</strong>
                  </el-button>
                </th>
              </tr>
            </table>
          </form>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测方案" name="second-ta">
          <table class="tableEditDetail" cellpadding="0" cellspacing="1">
            <tr>
              <th colspan="1" style="background-color: #fff2ec;">
                <label>方案类别</label>
              </th>
              <th colspan="1" style="background-color: #fff2ec;">
                <label>操作(只支持doc和pdf)</label>
              </th>
              <th colspan="2" style="background-color: #fff2ec;">
                <label>文件</label>
              </th>
            </tr>
            <tr>
              <th class="fieldLabel" colspan="1">
                <label style="font-weight:normal;">方案审批表:</label>
              </th>
              <th colspan="1">
                <el-button size="mini" type="primary">附件上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <form action="uploadProjectFiles" method="post" enctype="multipart/form-data" class="col-lg-12 col-sm-12" id="projectDocForm1" style="display:none">
                  <input id="project_input1" class="input" value="portrait" name="file" type="file" data-show-preview="false">
                </form>
              </th>
              <td colspan="2" id="approvalForm">
              </td>
            </tr>
            <tr>
              <th class="fieldLabel" colspan="1">
                <label style="font-weight:normal;">基坑监测方案:</label>
              </th>
              <th colspan="1">
                <el-button size="mini" type="primary">附件上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <form action="uploadProjectFiles" method="post" enctype="multipart/form-data" class="col-lg-12 col-sm-12" id="projectDocForm2" style="display:none">
                  <input id="project_input2" class="input" value="portrait" name="file" type="file" data-show-preview="false">
                </form>
              </th>
              <td colspan="2" id="plan"></td>
            </tr>
            <tr>
              <th class="fieldLabel" colspan="1">
                <label style="font-weight:normal;">其他相关文件:</label>
              </th>
              <th colspan="1">
                <el-button size="mini" type="primary">附件上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <a id="otherFile" href="#"></a>
                <form action="uploadProjectFiles" method="post" enctype="multipart/form-data" class="col-lg-12 col-sm-12" id="projectDocForm3" style="display:none">
                  <input id="project_input3" class="input" value="portrait" name="file" type="file" data-show-preview="false">
                </form>
              </th>
              <td colspan="2" id="other">
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测平面图" name="third-ta">
          <table class="tableEditDetail" cellpadding="0" cellspacing="1">
            <tr>
              <th class="fieldLabel" colspan="1">
                <label>监测平面图:</label>
              </th>
              <th colspan="2">
                <el-button size="mini" type="primary">图片上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </th>
              <!--                  <th colspan="2"> -->
              <!--                     <a id="delPicFileBtn" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-circle-arrow-up"></i>&nbsp删除图片</a> -->
              <!--                 </th> -->
              <td colspan="2" id="picForm">
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测项设置" name="fouth-ta">
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="自动化设置" name="fifth-ta">
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { list } from "@/api/example/table";
import echarts from "echarts";
import { debounce } from "@/utils";
require("echarts/theme/macarons"); // echarts theme

export default {
  name: "datachart-table-index",
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
      },
      id: ""
    };
  },
  methods: {
    //tab切换获取当前ID
    handleClick: function(tab, event) {
      debugger;
      this.initChart();
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    },
    //图形展示
    initChart() {},
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
    getParams() {
      debugger;
      //取到路由传参
      var projectId = this.$route.params.projectId;
      //将数据放在当前组件内
      this.id = projectId;
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
    },
    getBack(){
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.barSearch.expandInputs = false;
    this.barSearch.expandBtnText = "展开▼";
    this.getParams();
  },
  watch: {
    //监测路由变化
    $route: "getParams"
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

.tableEditDetail {
  border-collapse: separate;
  border-spacing: 1px;
}

.tableEditDetail input {
  margin: 5px 0px 5px 0px !important;
  padding: 0 !important;
}

.tableEditDetail input:focus,
textarea:focus {
  border-color: #03a9f4;
  box-shadow: 0 0 15px #03a9f4;
  -webkit-box-shadow: 0 0 15px #03a9f4;
  -moz-box-shadow: 0 0 15px #03a9f4;
}

input {
  width: 60%;
  height: 20px;
  font-size: 12px;
  border: 1px solid #7f9db9;
  line-height: 20px;
}
textarea {
  overflow: hidden;
  vertical-aglin: middle;
  line-height: 30px;
  width: 80%;
}

.easyui-combobox {
  height: 30px;
  line-hgiht: 30px;
}

.tableEditDetail {
  color: #000;
}
/*按钮样式*/
.btton133 {
  width: 133px;
  height: 29px;
  font-size: 12px;
  line-height: 29px;
  border-style: none;
  border-color: inherit;
  border-width: medium;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 3px;
}

.btton85 {
  width: 85px;
  height: 22px;
  font-size: 12px;
  line-height: 22px;
  border-style: none;
  border-color: inherit;
  border-width: medium;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 3px;
}

/*自定义表头风格2*/
.tableListTitle2 {
	color: #237fd2;
	height: 25px;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	padding-top: 5px;
}
/*头部提示地址表格样式*/
#tableHeader {
  width: 100%;
  height: 43px;
  margin: 0 auto;
  border: 0px;
  font-size: 12px;
  background-image: url(./../assets/images/normal_05.gif);
}

#tableHeader th {
  width: 573px;
  height: 43px;
  color: #237fd2;
  text-align: left;
  font-weight: normal;
  padding-left: 35px;
  background-image: url(./../assets/images/normal_03.gif);
  background-repeat: no-repeat;
}

#tableHeader td {
  font-size: 12px;
  text-align: right;
  margin-right: 10px;
}

.topTool {
  border: 1px solid #d0e2f8;
}

/*编辑详情表格样式*/
.tableEditDetail {
  width: 99%;
  margin: 0 auto;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  table-layout: fixed;
  background-color: #cad8e6;
}

.tableEditDetail th {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: normal;
  background-color: #f0faff;
}

.tableEditDetail td {
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 5px;
  word-wrap: break-word;
  background-color: #fafafa;
}

.tableEditDetail td .span {
  color: Red;
}

/*表格自动换行*/
.ui-jqgrid tr.jqgrow td {
  white-space: normal !important;
  height: auto;
  vertical-align: middle;
}
</style>
