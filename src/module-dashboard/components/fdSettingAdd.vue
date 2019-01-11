<template>
  <div class="add-form">
    <el-dialog width="50%" :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline" ref="formBase" :model="formBase" label-position="right" label-width="100px" style='margin:0 20px;'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监测项名称" prop="mItemName">
              <el-select v-model="formBase.mItemName" placeholder="请选择">
                <el-option id="mItemName" v-for="item in itemDropdownList" :key="item.itemName" :label="item.itemName" :value="item.itemName" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="虚拟断面" prop="sectionUuid" >
              <el-select v-model="formBase.sectionUuid" placeholder="请选择">
                <el-option id="sectionUuid" v-for="item in sectionDropdownList" :key="item.sectionUuid" :label="item.sectionName" :value="item.sectionUuid" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="采集模式" prop="mItemMode">
              <el-select v-model="formBase.mItemMode" placeholder="请选择">
                <el-option id="mItemMode" v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效状态" prop="mItemValid">
             <el-select v-model="formBase.mItemValid" placeholder="请选择">
                <el-option id="mItemValid" v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监测设备" prop="mItemDevices">
              <el-input v-model="formBase.mItemDevices" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监测频率" prop="mItemFrequency">
              <el-input v-model="formBase.mItemFrequency" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序号" prop="mItemOrder">
              <el-input v-model="formBase.mItemOrder" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监测项简码" prop="equipName">
              <el-input v-model="formBase.mItemEname" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-success" size="mini" type="primary" @click="createData('formBase')">确定</el-button>
        <el-button icon="el-icon-edit-outline" size="mini" type="danger" @click="resetForm('formBase')">重置</el-button>
        <el-button icon="el-icon-error" size="mini" @click="handleClose('formBase')">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shajs from "sha.js";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import axios from "axios";
import {addFdSet,getSection}from "@/api/base/project";

export default {
  name: "organAdd",
  props: [
    "text",
    "pageTitle",
    "PermissionGroupsList",
    "formBase",
    "ruleInline",
    "itemDropdownList",
    "sectionDropdownList",
    "projectId"
  ],
  data() {
    return {
      dialogFormVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      token: getToken(),
      userUuid:"",
      importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
      options1: [
        {
          value: 0,
          label: "手动"
        },
        {
          value: 1,
          label: "自动"
        }
      ],
      options2: [
        {
          value: 0,
          label: "无效"
        },
        {
          value: 1,
          label: "有效"
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
      this.$emit("handleCloseFd");
    },
    // 表单提交
    createData(formBase) {
      this.$refs[formBase].validate(valid => {
        if (valid) {
          debugger;
          let data = {
            ...this.formBase
          };
          var fdData=new Object();
          fdData.token=this.token;
          fdData.data=data;
          fdData.data.projectUuid=this.projectId;
          fdData.data.mItemOrder=0;//默认排序号是0
          if (this.text == "创建") {
            addFdSet(fdData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  this.$emit("handleCloseFd");
                  this.$confirm("创建监测项设置信息成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshFdList");
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
          } else if (this.text == "修改") {
            updateEquip(fdData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  this.$emit("handleCloseFd");
                  this.$confirm("修改设备成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshFdList");
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
                  message: "无法获取修改接口!"
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // 挂载结束
  mounted: function() {
  },
  // 创建完毕状态
  created() {
  },
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
