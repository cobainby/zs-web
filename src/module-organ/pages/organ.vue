 <template>
  <div class="dashboard-container">
    <div class="app-container">
      <div id="organTableContainer" data-options="region:'center',border:false">
        <el-button class="filter-item fr" size="small" style="margin: 10px;" @click="toEditOrgan" type="primary" icon="el-icon-edit">机构信息编辑</el-button>
        <table class="tableEditDetail" id="organTable" cellpadding="0" cellspacing="1">
          <tr>
            <th colspan="1">
              机构名称
            </th>
            <td colspan="1">
              <label id="organName"></label>
            </td>
            <th colspan="1">
              设立时间
            </th>
            <td colspan="1">
              <label id="establishedTime"></label>
            </td>
          </tr>
          <tr>
            <th colspan="1">
              机构地址
            </th>
            <td colspan="1">
              <label id="orgAddress"></label>
            </td>
            <th colspan="1">
              组织机构代码
            </th>
            <td colspan="1">
              <label id="organCode"></label>
            </td>
          </tr>
          <tr>
            <th colspan="1">
              联系人
            </th>
            <td colspan="1">
              <label id="orgLinkman"></label>
            </td>
            <th colspan="1">
              联系人电话
            </th>
            <td colspan="1">
              <label id="orgLinkphone"></label>
            </td>
          </tr>
          <tr>
            <th colspan="1">
              法定代表人
            </th>
            <td colspan="1">
              <label id="legalRepresentative"></label>
            </td>
            <th colspan="1">
              技术负责人
            </th>
            <td colspan="1">
              <label id="leaderTechnique"></label>
            </td>
          </tr>
          <tr>
            <th colspan="1">
              检测资质证书编号
            </th>
            <td colspan="1">
              <label id="credentialsnumCheck"></label>
              <el-button class="filter-item fr" size="small" style="margin: 10px;" @click="toViewOrgan" type="danger" icon="el-icon-search" round>查看</el-button>
            </td>
            <th colspan="1">
              计量认证证书编号
            </th>
            <td colspan="1">
              <label id="credentialsnumMeterage"></label>
              <center>
                <el-button class="filter-item fr" size="small" style="margin: 10px;" @click="toViewOrgan" type="danger" icon="el-icon-search" round>查看</el-button>
              </center>
            </td>
          </tr>
          <tr>
            <th colspan="1">
              登记日期
            </th>
            <td colspan="1">
              <label id="dateRegister"></label>
            </td>
            <th colspan="1">
              有效日期
            </th>
            <td colspan="1">
              <label id="dateValid"></label>
            </td>
          </tr>
        </table>
        <!-- 新增编辑标签弹层 -->
        <component @refreshList="init" v-bind:is="OrganAdd" ref="editUser" :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline' v-on:handleCloseModal="handleCloseModal">
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import { Institutes, addInstitutes } from "@/api/base/organ";
import axios from "axios";
import { getToken } from "@/utils/auth";
import { MessageBox } from "element-ui";
import OrganAdd from "./../components/organAdd";
export default {
  components: {
    OrganAdd
  },
  data() {
    return {
      OrganAdd: "organAdd",
      text: "", // 新增、编辑文本
      pageTitle: "机构", // 页面标题
      formData: {
        orgUuid: "",
        orgCode: "",
        orgName: "",
        orgAddress: "",
        orgLinkman: "",
        orgLinkphone: "",
        leaderTechnique: "",
        credentialsnumCheck: "",
        credentialsnumMeterage: "",
        dateRegister: "",
        dateValid: "",
        type: {
          name: "",
          code: ""
        },
        legalRepresentative: ""
      },
      organData: [],
      ruleInline: {
        // 表单验证
        orgName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        dateRegister: [
          { required: true, message: "登记日期不能为空", trigger: "blur" }
        ],
        orgCode: [
          { required: true, message: "组织机构代码不能为空", trigger: "blur" }
        ],
        typeCode:[
          { required: true, message: "机构类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 获取列表数据
    init() {
      Institutes({
        token: getToken()
      }).then(response => {
        debugger;
        if (response.data.result == 1) {
          const jsonData = response.data.data;
          //当前机构信息长度大于1.说明是超级管理员获取到了列表
          if (jsonData.length > 1) {
            //当机构信息为数组时，必为超级机构，拿到超级机构的组织id
            var superOrg = response.data.data.filter(function(item) {
              return item.orgName == "超级机构";
            });
            this.organData = superOrg[0];
          } else {
            //非超级机构，机构数据则是一个对象
            this.organData = jsonData[0];
          }
          this.organData.orgName != null
            ? $("#organName").text(this.organData.orgName)
            : $("#organName").text("");
          this.organData.orgLinkman != null
            ? $("#orgLinkman").text(this.organData.orgLinkman)
            : $("#orgLinkman").text("");
          this.organData.orgLinkphone != null
            ? $("#orgLinkphone").text(this.organData.orgLinkphone)
            : $("#orgLinkphone").text("");
          this.organData.orgCode != null
            ? $("#organCode").text(this.organData.orgCode)
            : $("#organCode").text("");
          this.organData.orgAddress != null
            ? $("#orgAddress").text(this.organData.orgAddress)
            : $("#orgAddress").text("");
          this.organData.leaderTechnique != null
            ? $("#leaderTechnique").text(this.organData.leaderTechnique)
            : $("#leaderTechnique").text("");
          this.organData.credentialsnumCheck != null
            ? $("#credentialsnumCheck").text(this.organData.credentialsnumCheck)
            : $("#credentialsnumCheck").text("");
          this.organData.credentialsnumMeterage != null
            ? $("#credentialsnumMeterage").text(
                this.organData.credentialsnumMeterage
              )
            : $("#credentialsnumMeterage").text("");
          this.organData.dateRegister != null
            ? $("#dateRegister").text(this.organData.dateRegister)
            : $("#dateRegister").text("");
          this.organData.dateValid != null
            ? $("#dateValid").text(this.organData.dateValid)
            : $("#dateValid").text("");
          this.organData.legalRepresentative != null
            ? $("#legalRepresentative").text(this.organData.legalRepresentative)
            : $("#legalRepresentative").text("");
        } else {
          this.$message({
            type: "warning",
            message: response.data.message
          });
        }
      });
    },
    toEditOrgan() {
      // this.query();
      var _this = this;
      this.text = "编辑";
      _this.hanldeEditForm(this.organData);
      this.$refs.editUser.dialogFormV();
    },
    //加载详情
    hanldeEditForm(params) {
      debugger;
      this.formData.orgUuid = params.orgUuid;
      this.formData.orgCode = params.orgCode;
      this.formData.orgName = params.orgName;
      this.formData.orgAddress = params.orgAddress;
      this.formData.orgLinkman = params.orgLinkman;
      this.formData.orgLinkphone = params.orgLinkphone;
      this.formData.leaderTechnique = params.leaderTechnique;
      this.formData.credentialsnumCheck = params.credentialsnumCheck;
      this.formData.credentialsnumMeterage = params.credentialsnumMeterage;
      this.formData.dateRegister = params.dateRegister;
      this.formData.dateValid = params.dateValid;
      this.formData.legalRepresentative = params.legalRepresentative;
      // this.formData.type.code=params.type.code;
    },
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editUser.dialogFormH();
    },
    toViewOrgan() {}
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.init();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
  // text-align: right;
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

<style>
.el-table th {
  background-color: #fafafa;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
.el-table__row i {
  font-style: normal;
}
</style>
