<template>
  <div class="add-form">
    <el-dialog width="55%" :title="text" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline" ref="formBase" :model="formBase" label-position="right" label-width="140px" style='margin:0 50px;'>
        <el-row>
          <el-col :span="24">
            <el-form-item label="账户昵称" prop="accountName">
              <el-input v-model="formBase.accountName" placeholder="Please input" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="新密码" prop="password">
              <el-input v-model="formBase.password" placeholder="Please input"></el-input>
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
import { updatePassword } from "@/api/base/worker";
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
      token:getToken()
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
          updatePassword({token:this.token,newpassword:data.password}).then(response => {
            if (response.data.result == 1) {
              this.$emit("handleCloseModal");
              const jsonData = response.data;
              this.$confirm("修改密码成功!", "提示", {
                type: "success",
                showConfirmButton: false,
                showCancelButton: false
              });
            } else {
              this.$confirm(response.data.message, "提示", {
                type: "error",
                showConfirmButton: false,
                showCancelButton: false
              });
            }
          });
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
