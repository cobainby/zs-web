<template>
  <div class="add-form">
    <el-dialog width="55%" :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form  ref="formBase" :disabled="true" :model="formBase" label-position="right" label-width="140px" style='margin:0 50px;'>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录ID" prop="loginName">
              <el-input v-model="formBase.loginName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户昵称" prop="accountName">
              <el-input v-model="formBase.accountName" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="mobilePhone">
              <el-input v-model="formBase.mobilePhone" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="formBase.email" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号码" prop="pid">
              <el-input v-model="formBase.pid" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信号" prop="wechat">
              <el-input placeholder="Please input" v-model="formBase.wechat">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作岗位" prop="post">
              <el-input placeholder="Please input" v-model="formBase.post">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上岗证编号" prop="numCertificate">
              <el-input v-model="formBase.numCertificate" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色权限" prop="roleCode">
              <el-select v-model="formBase.roleCode" placeholder="请选择">
                <el-option id="roleCode" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登记日期" prop="dateRegister">
              <el-date-picker id="dateRegister" v-model="formBase.dateRegister" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效日期" prop="dateValid">
              <el-date-picker id="dateValid" v-model="formBase.dateValid" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import shajs from "sha.js";
import { addAccount, updateAccount, deleteAccount } from "@/api/base/worker";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import axios from "axios";

export default {
  name: "workerAdd",
  props: [
    "text",
    "pageTitle",
    "PermissionGroupsList",
    "formBase"
  ],
  data() {
    return {
      dialogFormVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
      options: [
        {
          value: "0",
          label: "系统管理员",
          disabled: true
        },
        {
          value: "1",
          label: "机构管理员"
        },
        {
          value: "2",
          label: "机构领导"
        },
        {
          value: "3",
          label: "项目负责人"
        },
        {
          value: "4",
          label: "监测人员"
        },
        {
          value: "5",
          label: "监理人员"
        },
        {
          value: "6",
          label: "学习账号"
        }
      ]
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
