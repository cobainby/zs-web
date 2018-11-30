<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="tableListTitle2" style="margin-top:5px;">
          <label id="proName">基坑测试项目</label>
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
          <el-form id="projectForm" style="height:100%;overflow:auto;" ref="formBase">
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
                  <input name="code" rows="2" cols="20" class="input" id="projectCode" style="height:30px;width:80%;"></input>
                </td>
                <th style="width: 15%">
                  监督编号
                </th>
                <td>
                  <input name="superviseCode" rows="2" cols="20" class="input" id="superviseCode" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th style="width: 15%">
                  工程名称
                </th>
                <td>
                  <input name="projectName" rows="2" cols="20" id="projectName" class="input" style="height:30px;width:80%;" required></input>
                  <label style="color:red">*</label>
                </td>
                <th>
                  工程地址
                </th>
                <td>
                  <input name="address" rows="2" cols="20" id="projectLocation" class="input" style="height:30px;width:80%;" required></input>
                  <input type="hidden" name="" id="" />
                  <input type="hidden" name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  所属区域
                </th>
                <td>
                  <input name="projectRegion" id="projectRegion" class="easyui-combobox" data-options="valueField: 'value',textField: 'label'" style="width:80%;height:30px;" />
                </td>
                <th>
                  经纬度
                </th>
                <td>
                  <label>经纬度</label>
                  <input name="lon" maxlength="20" type="text" id="projectLatLon" class="input" style="width:16%;" disabled="true " />
                  <label>纬度</label>
                  <input name="lat" maxlength="20" type="text" id="lat" class="input" style="width:16%;" disabled="true " />
                  <input type="button" @click="selectLonlat" data-toggle="modal" id="lonlatSelect" class="btton85" value="获取经纬度" />
                  <label style="color:red">(*请选择位置)</label>
                </td>
              </tr>
              <tr>
                <th>
                  支护形式
                </th>
                <td>
                  <input name="structure" rows="2" cols="20" id="supportingStructure" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                  安全等级
                </th>
                <td>
                  <el-select v-model="formBase.safetyClass" placeholder="请选择">
                    <el-option id="safetyClass" v-for="item in safetyOption" :key="item.classCode" :label="item.className" :value="item.classCode" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <th>
                  基坑设计深度
                </th>
                <td>
                  <input name="deep" rows="2" cols="20" id="foundationDepth" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
                <th>
                  基坑周长:
                </th>
                <td>
                  <input name="perimeter" rows="2" cols="20" id="foundationPerimeter" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
              </tr>
              <tr>
                <th>
                  计划开挖时间
                </th>
                <td>
                  <input name="deep" rows="2" cols="20" id="excavationDatePlaned" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
                <th>
                  计划回填时间
                </th>
                <td>
                  <input name="perimeter" rows="2" cols="20" id="backfillDatePlaned" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
              </tr>
              <tr>
                <th>
                  实际开挖时间
                </th>
                <td>
                  <input name="deep" rows="2" cols="20" id="excavationDateActual" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
                <th>
                  实际回填时间
                </th>
                <td>
                  <input name="perimeter" rows="2" cols="20" id="backfillDateActual" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
              </tr>
              <tr>
                <th>
                  施工工况
                </th>
                <td>
                  <el-select v-model="formBase.constructionStep" placeholder="请选择">
                    <el-option id="constructionStep" v-for="item in stepOption" :key="item.stepCode" :label="item.stepName" :value="item.stepCode" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </td>
                <th>
                  项目状态
                </th>
                <td>
                  <el-select v-model="formBase.constructionState" placeholder="请选择">
                    <el-option id="constructionState" v-for="item in stateOption" :key="item.stateCode" :label="item.stateName" :value="item.stateCode" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <th>
                  监测单位
                </th>
                <td>
                  <input name="monitorLeader" type="text" id="monitoringOrg" class="input" style="width:40%;height:30px;" />
                </td>
                <th>
                  监测负责人
                </th>
                <td>
                  <input name="monitorWorker" type="text" id="monitoringHead" class="input" style="width:60%;height:30px;" disabled="true " />
                  <el-button id="addMonitorWorker" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                  <el-button id="deleteMonitorWorker" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                </td>
              </tr>
              <tr>
                <th>
                  监测人员
                </th>
                <td>
                  <input name="monitorWorker" type="text" id="monitoringSurveyor" class="input" style="width:60%;height:30px;" disabled="true " />
                  <el-button id="addMonitorWorker" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                  <el-button id="deleteMonitorWorker" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                </td>
                <th>
                  行政主管部门
                </th>
                <td colspan="1">
                  <input name="superviseWorker" rows="2" cols="20" id="admDepartment" class="input" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th>
                  监督单位
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="supervisorOrg" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                  监督人员
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="supervisorLinkman" class="input" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th>
                  项目创建人
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="createAccUuid" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                  项目创建时间
                </th>
                <td colspan="1">
                  <input name="superviseWorker" rows="2" cols="20" id="createDate" class="input" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th>
                  项目结束时间
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="finishDate" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                  工程概况描述
                </th>
                <td colspan="1">
                  <input name="superviseWorker" rows="2" cols="20" id="projectDetail" class="input" style="height:30px;width:80%;"></input>
                </td>
              </tr>
            </table>
            <table class="tableEditDetail" id="projectInfo1" cellpadding="0" cellspacing="1" style="margin-top: -1px;height:41%;">
              <tr>
                <th style="width: 15%;">
                  建设单位
                </th>
                <td style="width: 35%;">
                  <textarea name="buildCompany" rows="2" cols="20" id="proprietorOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="proprietorLinkman" class="input" style="width:99%;"></label>
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
                  <textarea name="designCompany" rows="2" cols="20" id="designOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="designLinkman" class="input" style="width:99%;"></label>
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
                  <textarea name="constructCompany" rows="2" cols="20" id="constructionOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="constructionLinkman" class="input" style="width:99%;"></label>
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
                  <textarea name="supervisorCompany" rows="2" cols="20" id="supervisionOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%;background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="supervisionLinkman" class="input" style="width:99%;"></label>
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
                  <el-button id="saveBtn" @click="saveProject" type="success" size="mini" icon="el-icon-check">
                    <strong>
                      <i class="glyphicon glyphicon-ok"></i>&nbsp提交</strong>
                  </el-button>
                  <el-button type="info" size="mini" id="cancelBtn" icon="el-icon-delete" data-dismiss="modal">
                    <strong>
                      <i class="glyphicon glyphicon-remove"></i>&nbsp重置</strong>
                  </el-button>
                </th>
              </tr>
            </table>
          </el-form>
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
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </th>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测项设置" name="fouth-ta">
          <el-table :data="items" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
            <el-table-column align="center" :label="$t('table.id')" width="50px">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="监测项名称">
              <template slot-scope="scope">
                <span>监测项名称</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="报警设置" width="250px">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-warning" @click="handleClick(scope.row)" size="small">报警设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="断面设置" width="250px">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-news" size="small">断面设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="自动采集/手动上传">
              <template slot-scope="scope">
                <span>自动采集/手动上传</span>
              </template>
            </el-table-column>
            <!-- 头像 -->
            <el-table-column align="center" width="250px" label="测点设置">
              <template slot-scope="scope">
                <el-button type="warning" icon="el-icon-location-outline" size="small">测点设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="250px" label="监测项设置">
              <template slot-scope="scope">
                <el-button type="info" icon="el-icon-setting" size="small">监测项设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" width="150px" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger" @click="removeUser(scope.row.id)">{{$t('table.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="自动化设置" name="fifth-ta">
          <span style="font-size:60px;color:blue;">
            尚在开发中！！</span>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { list } from "@/api/example/table";
import {
  projectAdd,
  projectUpdate,
  getSafety,
  getStep,
  getState
} from "@/api/base/project";
import echarts from "echarts";
import { debounce } from "@/utils";
import { getToken } from "@/utils/auth";
// import ProjectMap from "./../components/mapLayout";
require("echarts/theme/macarons"); // echarts theme

export default {
  name: "datachart-table-index",
  components:{
    
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
      dialogImageUrl: "",
      dialogVisible: false,
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
      listLoading: true,
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
      formBase: [],
      loading: false,
      multipleSelection: [],
      dialogVisible: false,
      formData: [],
      projectInfo: [],
      token: getToken(),
      safetyOption: [],
      stepOption: [],
      stateOption: []
    };
  },
  methods: {
    saveProject() {
      debugger;
      var projectParams = new Object();
      var projectData = new Object();
      projectParams.token = this.token;
      projectParams.data = projectData;
      projectData.superviseCode = $("#superviseCode").val();
      projectData.projectName = $("#projectName").val();
      projectData.projectLocation = $("#projectLocation").val();
      projectData.projectLatLon = $("#projectLatLon").val();
      projectData.projectRegion = $("#projectRegion").val();
      projectData.supportingStructure = $("#supportingStructure").val();
      projectData.safetyClass = $("#safetyClass").val();
      projectData.foundationDepth = $("#foundationDepth").val();
      projectData.foundationPerimeter = $("#foundationPerimeter").val();
      projectData.excavationDatePlaned = $("#excavationDatePlaned").val();
      projectData.backFillDatePlaned = $("#backfillDatePlaned").val();
      projectData.excavationDateActual = $("#excavationDateActual").val();
      projectData.backfillDateActual = $("#backfillDateActual").val();
      projectData.constructionStep = $("#constructionStep").val();
      projectData.constructionState = $("#constructionState").val();
      projectData.monitoringOrg = $("#monitoringOrg").val();
      projectData.monitoringHead = $("#monitoringHead").val();
      projectData.monitoringSurveyor = $("#monitoringSurveyor").val();
      projectData.supervisorOrg = $("#supervisorOrg").val();
      projectData.supervisorLinkman = $("#supervisorLinkman").val();
      projectData.proprietorOrg = $("#proprietorOrg").val();
      projectData.proprietorLinkman = $("#proprietorLinkman").val();
      projectData.designOrg = $("#designOrg").val();
      projectData.designLinkman = $("#designLinkman").val();
      projectData.constructionOrg = $("#constructionOrg").val();
      projectData.constructionLinkman = $("#constructionLinkman").val();
      projectData.supervisionOrg = $("#supervisionOrg").val();
      projectData.supervisionLinkman = $("#supervisionLinkman").val();
      projectData.admDepartment = $("#admDepartment").val();
      projectData.createDate = $("#createDate").val();
      projectData.createAccUuid = $("#createAccUuid").val();
      projectData.finishDate = $("#finishDate").val();
      projectData.projectDetail = $("#projectDetail").val();
      projectAdd(projectParams)
        .then(response => {
          if (response.data.result == 1) {
            const jsonData = response.data;
            this.$emit("handleCloseEquip");
            this.$confirm("创建工程成功!", "提示", {
              type: "success",
              showConfirmButton: false,
              showCancelButton: false
            });
            this.$emit("refreshEquipList");
          } else {
            Message.error(response.data.message);
            this.$confirm("创建工程失败!", "提示", {
              type: "error",
              showConfirmButton: false,
              showCancelButton: false
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "无法获取创建接口!"
          });
        });
    },
    selectLonlat(){
      this.$refs.viewMap.dialogFormV();
    },
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
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      //获取安全等级，施工工况，工程状态下拉列表
      getSafety().then(res => {
        this.safetyOption = res.data;
      });
      getStep().then(res => {
        this.stepOption = res.data;
      });
      getState().then(res => {
        this.stateOption = res.data;
      });
      //取到路由传参
      this.projectInfo = this.$route.params.projectInfo;
      console.log(this.projectInfo);
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
    getBack() {
      this.$router.push({ path: "/itemList" });
    },
    // 获取列表数据
    getList(params) {
      debugger;
      this.listLoading = true;
      list()
        .then(data => {
          this.items = data.data.items;
          this.total = data.data.total;
          this.alertText = `共 ${this.total} 条记录`;
          this.listLoading = false;
        })
        .catch(e => {
          this.$message.e("错了哦，这是一条错误消息");
        });
    }
  },
  created() {
    this.barSearch.expandInputs = false;
    this.barSearch.expandBtnText = "展开▼";
  },
  // 挂载结束
  mounted() {
    this.getParams();
    this.getList();
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
