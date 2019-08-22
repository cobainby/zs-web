<template>
  <div class="app-container">
    <el-card
      class="box-card"
      shadow="never"
      v-loading="loading"
    >
      <!-- 项目当前信息 / -->
      <el-form
        id="projectForm"
        style="height:100%;overflow:auto;"
        ref="formBase"
      >
        <input
          id="formUrl"
          type="hidden"
        >
        <input
          id="projectUuid"
          type="hidden"
        >
        <table
          id="tableHeader"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <th id="tableName">
              工程概况
            </th>
          </tr>
        </table>
        <table
          class="tableEditDetail"
          style="height:45%;"
          cellpadding="0"
          cellspacing="1"
        >
          <tr>
            <th style="width: 15%;">
              工程编号
            </th>
            <td style="width: 35%">
              <label
                name="code"
                rows="2"
                cols="20"
                class="label"
                id="projectCode"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th style="width: 15%">
              监督编号
            </th>
            <td>
              <label
                name="superviseCode"
                rows="2"
                cols="20"
                class="label"
                id="superviseCode"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th style="width: 15%">
              工程名称
            </th>
            <td>
              <label
                name="projectName"
                rows="2"
                cols="20"
                id="projectName"
                class="label"
                style="height:30px;width:80%;"
                required
              ></label>
            </td>
            <th>
              工程地址
            </th>
            <td>
              <label
                name="address"
                rows="2"
                cols="20"
                id="projectLocation"
                class="label"
                style="height:30px;width:80%;"
                required
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              所属区域
            </th>
            <td>
              <label
                name="projectRegion"
                id="projectRegion"
                data-options="valueField: 'value',textField: 'label'"
                style="width:80%;height:30px;"
              />
            </td>
            <th>
              经纬度
            </th>
            <td>
              <label
                name="projectLatLon"
                id="projectLatLon"
                data-options="valueField: 'value',textField: 'label'"
                style="width:80%;height:30px;"
              />
            </td>
          </tr>
          <tr>
            <th>
              支护形式
            </th>
            <td>
              <label
                name="structure"
                rows="2"
                cols="20"
                id="supportingStructure"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              安全等级
            </th>
            <td>
              <label
                name="safetyClass"
                rows="2"
                cols="20"
                id="safetyClass"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              基坑设计深度
            </th>
            <td>
              <label
                name="deep"
                rows="2"
                cols="20"
                id="foundationDepth"
                class="label"
                style="height:30px;width:80%;"
              ></label>(M)
            </td>
            <th>
              基坑周长:
            </th>
            <td>
              <label
                name="perimeter"
                rows="2"
                cols="20"
                id="foundationPerimeter"
                class="label"
                style="height:30px;width:80%;"
              ></label>(M)
            </td>
          </tr>
          <tr>
            <th>
              计划开挖时间
            </th>
            <td>
              <label
                name="deep"
                rows="2"
                cols="20"
                id="excavationDatePlaned"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              计划回填时间
            </th>
            <td>
              <label
                name="perimeter"
                rows="2"
                cols="20"
                id="backfillDatePlaned"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              实际开挖时间
            </th>
            <td>
              <label
                name="deep"
                rows="2"
                cols="20"
                id="excavationDateActual"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              实际回填时间
            </th>
            <td>
              <label
                name="perimeter"
                rows="2"
                cols="20"
                id="backfillDateActual"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              施工工况
            </th>
            <td>
              <label
                name="constructionStep"
                rows="2"
                cols="20"
                id="constructionStep"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              项目状态
            </th>
            <td>
              <label
                name="constructionState"
                rows="2"
                cols="20"
                id="constructionState"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              监测单位
            </th>
            <td>
              <label
                name="monitorLeader"
                type="text"
                id="monitoringOrg"
                class="label"
                style="width:40%;height:30px;"
              />
            </td>
            <th>
              监测负责人
            </th>
            <td>
              <label
                name="monitorWorker"
                type="text"
                id="monitoringHead"
                class="label"
                style="width:60%;height:30px;"
                disabled="true "
              />

            </td>
          </tr>
          <tr>
            <th>
              监测人员
            </th>
            <td>
              <label
                name="monitorWorker"
                type="text"
                id="monitoringSurveyor"
                class="label"
                style="width:60%;height:30px;"
                disabled="true "
              />

            </td>
            <th>
              行政主管部门
            </th>
            <td colspan="1">
              <label
                name="superviseWorker"
                rows="2"
                cols="20"
                id="admDepartment"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              监督单位
            </th>
            <td>
              <label
                name="superviseCompany"
                rows="2"
                cols="20"
                id="supervisorOrg"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              监督人员
            </th>
            <td>
              <label
                name="superviseCompany"
                rows="2"
                cols="20"
                id="supervisorLinkman"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              项目创建人
            </th>
            <td>
              <label
                name="createAccUuid"
                rows="2"
                cols="20"
                id="createAccUuid"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              项目创建时间
            </th>
            <td colspan="1">
              <label
                name="createDate"
                rows="2"
                cols="20"
                id="createDate"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
          <tr>
            <th>
              项目结束时间
            </th>
            <td>
              <label
                name="finishDate"
                rows="2"
                cols="20"
                id="finishDate"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
            <th>
              工程概况描述
            </th>
            <td colspan="1">
              <label
                name="projectDetail"
                rows="2"
                cols="20"
                id="projectDetail"
                class="label"
                style="height:30px;width:80%;"
              ></label>
            </td>
          </tr>
        </table>
        <table
          class="tableEditDetail"
          id="projectInfo1"
          cellpadding="0"
          cellspacing="1"
          style="margin-top: -1px;height:41%;"
        >
          <tr>
            <th style="width: 15%;">
              建设单位
            </th>
            <td style="width: 35%;">
              <label
                name="buildCompany"
                rows="2"
                cols="20"
                id="proprietorOrg"
                class="label"
                style="height:55px;width:80%;"
              ></label>
            </td>
            <td style="width: 50%;">
              <table
                class="tableEditDetail"
                cellpadding="0"
                cellspacing="1"
                width="100%"
              >
                <tr>
                  <th style="width: 25%; background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 40%">
                    <label
                      id="proprietorLinkman"
                      class="label"
                      style="width:99%;"
                    ></label>
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
              <label
                name="designCompany"
                rows="2"
                cols="20"
                id="designOrg"
                class="label"
                style="height:55px;width:80%;"
              ></label>
            </td>
            <td style="width: 50%;">
              <table
                class="tableEditDetail"
                cellpadding="0"
                cellspacing="1"
                width="100%"
              >
                <tr>
                  <th style="width: 25%; background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 40%">
                    <label
                      id="designLinkman"
                      class="label"
                      style="width:99%;"
                    ></label>
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
              <label
                name="constructCompany"
                rows="2"
                cols="20"
                id="constructionOrg"
                class="label"
                style="height:55px;width:80%;"
              ></label>
            </td>
            <td style="width: 50%;">
              <table
                class="tableEditDetail"
                cellpadding="0"
                cellspacing="1"
              >
                <tr>
                  <th style="width: 25%; background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 40%">
                    <label
                      id="constructionLinkman"
                      class="label"
                      style="width:99%;"
                    ></label>
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
              <label
                name="supervisorCompany"
                rows="2"
                cols="20"
                id="supervisionOrg"
                class="label"
                style="height:55px;width:80%;"
              ></label>
            </td>
            <td style="width: 50%;">
              <table
                class="tableEditDetail"
                cellpadding="0"
                cellspacing="1"
                width="100%"
              >
                <tr>
                  <th style="width: 25%;background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 40%">
                    <label
                      id="supervisionLinkman"
                      class="label"
                      style="width:99%;"
                    ></label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { projectList } from "@/api/base/project";
import { getToken } from "@/utils/auth";
export default {
  name: "datachart-table-index",
  data() {
    return {
      text: "",
      pageTitle: "",
      type: null, //新增还是修改项目的判断值
      activeName: "first-ta", //切换tab的值
      projectId: "", //判断是否有projectUuid来进入下几个tab，如果projectuuid没有值，则必须新建项目
      dialogAdd: false,
      addData: {
        location_id: "", // 以萨卡口编号
        loc_id: "", // 厂商卡口编号
        text: "", // 点位名称
        lng: "", // 经度
        lat: "", // 纬度
        rtmp: "" // rtmp地址或rtsp地址
      },
      location: "",
      iconUrl: "./../assets/images/map/",
      filters: {
        column: {
          create_start_date: "",
          create_end_date: ""
        }
      },
      itemDropdownList: [], //新增监测项时的监测项下拉列表
      sectionDropdownList: [], //断面设置的下拉列表
      dialogImageUrl: "",
      dialogVisible: false,
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
      projectInfo: [],
      token: getToken(),
      safetyOption: [],
      stepOption: [],
      stateOption: []
    };
  },
  methods: {
    //工程概况
    getParams() {
      debugger;
      projectList({ token: this.token }).then(res => {
        var projectList = res.data;
        var projectUuid = this.$route.query.id;
        for (var i = 0; i < projectList.length; i++) {
          if (projectList[i].projectUuid == projectUuid) {
            this.projectInfo = projectList[i];
            $("#projectCode").html(this.projectInfo.projectCode);
            $("#superviseCode").html(this.projectInfo.superviseCode);
            $("#projectName").html(this.projectInfo.projectName);
            $("#projectLocation").html(this.projectInfo.projectLocation);
            $("#projectLatLon").html(this.projectInfo.projectLatLon);
            $("#projectRegion").html(this.projectInfo.projectRegion);
            $("#supportingStructure").html(
              this.projectInfo.supportingStructure
            );
            $("#safetyClass").html(this.projectInfo.safetyClass);
            $("#foundationDepth").html(this.projectInfo.foundationDepth);
            $("#foundationPerimeter").html(
              this.projectInfo.foundationPerimeter
            );
            $("#excavationDatePlaned").html(
              this.projectInfo.excavationDatePlaned
            );
            $("#backfillDatePlaned").html(this.projectInfo.backfillDatePlaned);
            $("#excavationDateActual").html(
              this.projectInfo.excavationDateActual
            );
            $("#backfillDateActual").html(this.projectInfo.backfillDateActual);
            if (this.projectInfo.constructionStep == 0) {
              $("#constructionStep").html("未开始");
            } else if (this.projectInfo.constructionStep == 1) {
              $("#constructionStep").html("打桩");
            } else if (this.projectInfo.constructionStep == 2) {
              $("#constructionStep").html("开挖");
            } else if (this.projectInfo.constructionStep == 3) {
              $("#constructionStep").html("倒底板");
            } else if (this.projectInfo.constructionStep == 4) {
              $("#constructionStep").html("支模");
            } else if (this.projectInfo.constructionStep == 5) {
              $("#constructionStep").html("回填");
            }
            if (this.projectInfo.constructionState == 0) {
              $("#constructionState").html("准备施工");
            } else if (this.projectInfo.constructionState == 1) {
              $("#constructionState").html("正在施工");
            } else if (this.projectInfo.constructionState == 2) {
              $("#constructionState").html("已完工");
            } 
            $("#monitoringOrg").html(this.projectInfo.monitoringOrg);
            $("#monitoringHead").html(this.projectInfo.monitoringHead);
            $("#monitoringSurveyor").html(this.projectInfo.monitoringSurveyor);
            $("#supervisorOrg").html(this.projectInfo.supervisorOrg);
            $("#supervisorLinkman").html(this.projectInfo.supervisorLinkman);
            $("#proprietorOrg").html(this.projectInfo.proprietorOrg);
            $("#proprietorLinkman").html(this.projectInfo.proprietorLinkman);
            $("#designOrg").html(this.projectInfo.designOrg);
            $("#designLinkman").html(this.projectInfo.designLinkman);
            $("#constructionOrg").html(this.projectInfo.constructionOrg);
            $("#constructionLinkman").html(
              this.projectInfo.constructionLinkman
            );
            $("#supervisionOrg").html(this.projectInfo.supervisionOrg);
            $("#supervisionLinkman").html(this.projectInfo.supervisionLinkman);
            $("#admDepartment").html(this.projectInfo.admDepartment);
            $("#createDate").html(
              this.changeTimeFormat(this.projectInfo.createDate)
            );
            $("#finishDate").html(
              this.changeTimeFormat(this.projectInfo.finishDate)
            );
            $("#projectDetail").html(this.projectInfo.projectDetail);
            break;
          }
        }
      });
    },
    // 格式化时间
    changeTimeFormat(html) {
      debugger;
      var d = new Date(html);
      var times =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) + //月份+1.因为getMonth是0——11
        "-" +
        ("0" + d.getDate()).slice(-2) +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2);
      return times;
    },
    getBack() {
      this.$router.push({ path: "/itemList" });
    }
  },
  created() {},
  // 挂载结束
  mounted() {
    this.getParams();
  },
  watch: {
    //监测路由变化
    $route: "getParams"
  }
};
</script>
<style rel="stylesheet/css" scoped>
@media (min-width: 640px) and (max-width: 1399px) {
  #projectForm {
    margin: -10px;
  }
}
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

.tableEditDetail {
  border-collapse: separate;
  border-spacing: 1px;
}

.tableEditDetail input {
  margin: 5px 0px 5px 0px !important;
  padding: 0 !important;
}

.tableEditDetail input:focus,
label:focus {
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
label {
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
  background-image: url(../../module-dashboard/assets/images/normal_05.gif);
}

#tableHeader th {
  width: 573px;
  height: 43px;
  color: #237fd2;
  text-align: left;
  font-weight: normal;
  padding-left: 35px;
  background-image: url(../../module-dashboard/assets/images/normal_03.gif);
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
