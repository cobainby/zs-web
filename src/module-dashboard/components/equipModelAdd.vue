<template>
  <div class="add-form">
    <el-dialog width="35%" :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline1" ref="formBase1" :model="formBase1" label-position="right" label-width="80px" style='margin:0 15px;'>
        <el-row>
          <el-col :span="24">
            <el-form-item label="型号名称" prop="modelName">
              <el-input v-model="formBase1.modelName" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="型号简称" prop="modelEname">
              <el-input v-model="formBase1.modelEname" placeholder="Please input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属类型" prop="typeCode">
              <el-select v-model="formBase1.typeCode" placeholder="请选择"> 
                {{formBase1.typeName}}
                <el-option id="typeCode" v-for="item in options1" :key="item.typeCode" :label="item.typeName" :value="item.typeCode" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否自动" prop="modelAuto">
              <el-select   v-model="formBase1.modelAuto" placeholder="请选择">
                <el-option id="modelAuto" v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="数据格式" prop="modelFormat">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="formBase1.modelFormat">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="生产厂家" prop="manufacturer">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="formBase1.manufacturer">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-success" size="mini" type="primary" @click="createData('formBase1')">{{$t('table.confirm')}}</el-button>
        <el-button icon="el-icon-edit-outline" size="mini" type="danger" @click="resetForm('formBase1')">重置</el-button>
        <el-button icon="el-icon-error" size="mini" @click="handleClose('formBase1')">{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import shajs from "sha.js";
import {
  addEquipModel,
  updateEquipModel,
  getSysEquipmentType
} from "@/api/base/equip";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import axios from "axios";

export default {
  name: "organAdd",
  props: [
    "text",
    "pageTitle",
    "PermissionGroupsList",
    "formBase1",
    "ruleInline1"
  ],
  data() {
    return {
      dialogFormVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
      options1: [],
      options2: [
        {
          value: "0",
          label: "非全自动设备"
        },
        {
          value: "1",
          label: "全自动设备"
        },
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
    getEquipmentType() {
      getSysEquipmentType().then(response => {
        //获取到型号设备的种类
        this.options1 = response.data;
      });
    },
    // 表单提交
    createData(formBase1) {
      this.$refs[formBase1].validate(valid => {
        if (valid) {
          debugger;
          let data = {
            ...this.formBase1
          };
          //注意：这里有个特殊情况，修改状态下自动化状态未选择则需转化成状态码。
          if(data.modelAuto=="全自动设备"){
            data.modelAuto=1;
          }else if(data.modelAuto=="非全自动设备"){
            data.modelAuto=0;
          }
          var modelData = new Object();
          modelData.token = getToken();
          modelData.data = data;
          if (this.text == "创建") {
            addEquipModel(modelData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  this.$emit("handleCloseModal");
                  this.$confirm("创建设备型号成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshModelList");
                } else {
                  this.$confirm(response.data.message, "提示", {
                    type: "error",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                }
              })
              .catch(() => {
                this.$confirm("无法获取创建设备型号的接口", "提示", {
                  type: "error",
                  showConfirmButton: false,
                  showCancelButton: false
                });
              });
          } else if (this.text == "修改") {
            debugger;
            updateEquipModel(modelData)
              .then(response => {
                if (response.data.result == 1) {
                  this.$emit("handleCloseModal");
                  this.$confirm("修改设备型号成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshModelList");
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
    //获取设备型号种类
    this.getEquipmentType();
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
