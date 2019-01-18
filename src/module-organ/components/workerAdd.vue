<template>
  <div class="add-form">
    <el-dialog width="55%" :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline" ref="formBase" :model="formBase" label-position="right" label-width="140px" style='margin:0 50px;'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户名称" prop="accountName">
              <el-input v-model="formBase.accountName" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
                <el-option id="roleCode" v-for="item in options" :key="item.roleCode" :label="item.label" :value="item.roleCode" :disabled="item.disabled">
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
      options: [
        {
          roleCode: "0",
          label: "系统管理员",
          disabled: true
        },
        {
          roleCode: "1",
          label: "机构管理员"
        },
        {
          roleCode: "2",
          label: "机构领导"
        },
        {
          roleCode: "3",
          label: "项目负责人"
        },
        {
          roleCode: "4",
          label: "监测人员"
        },
        {
          roleCode: "5",
          label: "监理人员"
        },
        {
          roleCode: "6",
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
    },
    // 退出
    handleClose() {
      this.$emit("handleCloseModal");
    },

    // 表单提交
    createData(formBase) {
      //表单验证
      debugger;
      this.$refs[formBase].validate(valid => {
        if (valid) {
          //验证通过
          let data = {
            ...this.formBase
          };
          var workerData = new Object();
          workerData.token = getToken();
          workerData.data = data;
          //注意：这里重新赋值，登录名，密码和账户名称保持一致，另时间采用el-date-picker将json时间格式化了
          workerData.data.loginName = data.accountName;
          workerData.data.password = data.mobilePhone.substr(0,6);;
          workerData.data.dateRegister =
            $("#dateRegister").val() != "" ? $("#dateRegister").val() : null;
          workerData.data.dateValid =
            $("#dateValid").val() != "" ? $("#dateValid").val() : null;
          debugger;
          if (this.text == "创建") {
            addAccount(workerData)
              .then(response => {
                if (response.data.result == 1) {
                  this.$emit("handleCloseModal");
                  const jsonData = response.data;
                  this.$confirm("创建人员成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshList");
                } else {
                  this.$confirm(response.data.message, "提示", {
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
          } else if (this.text == "编辑") {
            updateAccount(workerData)
              .then(response => {
                if (response.data.result == 1) {
                  this.$emit("handleCloseModal");
                  const jsonData = response.data;
                  this.$confirm("编辑人员成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  //刷新表单
                  this.$emit("refreshList");
                } else {
                  this.$confirm(response.data.message, "提示", {
                    type: "error",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                }
              })
              .catch(() => {
                this.$message({
                  type: "warning",
                  message: "无法获取编辑接口!"
                });
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formBase) {
      this.$refs[formBase].resetFields();
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
