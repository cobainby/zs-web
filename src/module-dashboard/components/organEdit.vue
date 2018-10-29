<template>
  <div class="edit-form">
    <el-dialog :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline" ref="dataForm" :model="formBase" label-position="right" label-width="140px" style='margin:0 50px;'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="formBase.orgName" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构地址" prop="orgAddress">
              <el-input v-model="formBase.orgAddress" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="orgLinkman">
              <el-input v-model="formBase.orgLinkman" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="orgLinkphone">
              <el-input v-model="formBase.orgLinkphone" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计量认证证书编号" prop="credentialsnumCheck">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="formBase.credentialsnumCheck">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检测资质证书编号" prop="credentialsnumMeterage">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="formBase.credentialsnumMeterage">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="技术负责人" prop="leaderTechnique">
              <el-input v-model="formBase.leaderTechnique" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人" prop="legalRepresentative">
              <el-input v-model="formBase.legalRepresentative" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型" prop="typeCode">
              <el-input v-model="formBase.type.code" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织机构代码" prop="orgCode">
              <el-input v-model="formBase.orgCode" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登记日期" prop="dateRegister">
              <el-input v-model="formBase.dateRegister" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效日期" prop="dateValid">
              <el-input v-model="formBase.dateValid" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-success" size="mini" type="primary" @click="createData('formBase')">{{$t('table.confirm')}}</el-button>
        <el-button icon="el-icon-edit-outline" size="mini" type="danger" @click="resetForm('formBase')">重置</el-button>
        <el-button icon="el-icon-error" size="mini" @click="handleClose('formBase')">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import shajs from "sha.js";
import { addInstitutes } from "@/api/base/organ";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import axios from "axios";

export default {
  name: "organAdd",
  props: [
    "text",
    "pageTitle",
    "PermissionGroupsList",
    "formBase",
    "ruleInline"
  ],
  data() {
    return {
      dialogFormVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
    // 退出
    handleClose() {
      this.$emit("handleCloseModal");
    },

    // 表单提交
    createData(formBase) {
      this.$emit("handleCloseModal");
      // this.$refs[formBase].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      debugger;
      let data = {
        ...this.formBase
      };
      var organData = new Object();
      organData.token = getToken();
      organData.data = data;
      var addJson = JSON.stringify(organData);
      console.log(addJson);
      debugger;
      addInstitutes(organData).then(response => {
        if (response.data.result == 1) {
          const jsonData = response.data;
        } else {
          Message.error(response.data.message);
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // 挂载结束

  mounted: function() {},
  // 创建完毕状态
  created() {},
  // 组件更新
  updated: function() {}
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-dialog {
  .el-dialog__header {
    position: relative;
    height: 40px;
    padding: 0;
    margin: 0;
    display: block;
    background-color: #135ace;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    text-align: center;
    .el-dialog__title {
      color: #ffffff;
    }
  }
  .el-dialog__headerbtn {
    margin-top: -12px;
  }
}
</style>
