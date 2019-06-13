<template>
  <div class="add-form">
    <el-dialog
      width="55%"
      :title="text+pageTitle"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :rules="ruleInline2"
        ref="formBase2"
        :model="formBase2"
        label-position="right"
        label-width="90px"
        style='margin:0 40px;'
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="仪器型号"
              prop="equipModel"
            >
              <el-select
                v-model="formBase2.equipModel"
                placeholder="请选择"
              >
                <el-option
                  id="equipModel"
                  v-for="item in modelDropdownList"
                  :key="item.modelUuid"
                  :label="item.modelName"
                  :value="item.modelUuid"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="仪器名称"
              prop="equipName"
            >
              <el-input
                v-model="formBase2.equipName"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="仪器简称"
              prop="equipEname"
            >
              <el-input
                v-model="formBase2.equipEname"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="仪器编号"
              prop="equipID"
            >
              <el-input
                v-model="formBase2.equipId"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="设备状态"
              prop="equipStatus"
            >
              <el-select
                v-model="formBase2.equipStatus"
                placeholder="请选择"
              >
                <el-option
                  id="equipStatus"
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所在项目"
              prop="projectUuid"
            >
              <el-select
                v-model="formBase2.projectUuid"
                placeholder="请选择"
              >
                <el-option
                  id="projectUuid"
                  v-for="item in projectDropdownList"
                  :key="item.projectUuid"
                  :label="item.projectName"
                  :value="item.projectUuid"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="检验日期"
              prop="verifyDate"
            >
              <el-date-picker
                id="verifyDate"
                v-model="formBase2.verifyDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="有效日期"
              prop="verifyValidDate"
            >
              <el-date-picker
                id="verifyValidDate"
                v-model="formBase2.verifyValidDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="检验机构"
              prop="verifyOrg"
            >
              <el-input
                v-model="formBase2.verifyOrg"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="校准证号"
              prop="verifyNumber"
            >
              <el-input
                v-model="formBase2.verifyNumber"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="所有单位"
              prop="orgOwner"
            >
              <el-input
                v-model="formBase2.orgOwner"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="使用单位"
              prop="orgUse"
            >
              <el-input
                v-model="formBase2.orgUse"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="录入时间"
              prop="entryDate"
            >
              <el-date-picker
                id="entryDate"
                v-model="formBase2.entryDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="审核时间"
              prop="confirmDate"
            >
              <el-date-picker
                id="confirmDate"
                v-model="formBase2.confirmDate"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="仪器图片"
              prop="imageEquipment"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Please input"
                v-model="formBase2.imageEquipment"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="证书图片"
              prop="imageVerify"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Please input"
                v-model="formBase2.imageVerify"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          icon="el-icon-success"
          size="mini"
          type="primary"
          @click="createData('formBase2')"
        >{{$t('table.confirm')}}</el-button>
        <el-button
          icon="el-icon-edit-outline"
          size="mini"
          type="danger"
          @click="resetForm('formBase2')"
        >重置</el-button>
        <el-button
          icon="el-icon-error"
          size="mini"
          @click="handleClose('formBase2')"
        >{{$t('table.cancel')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import shajs from "sha.js";
import {addEquip, updateEquip} from "@/api/base/equip";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import { detail } from "@/api/base/organ";
import axios from "axios";

export default {
  name: "organAdd",
  props: [
    "text",
    "pageTitle",
    "PermissionGroupsList",
    "formBase2",
    "ruleInline2",
    "modelDropdownList",
    "projectDropdownList"
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
      options2: [
        {
          value: "0",
          label: "停用"
        },
        {
          value: "1",
          label: "启用"
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
      this.$emit("handleCloseEquip");
    },
    // 表单提交
    createData(formBase2) {
      this.$refs[formBase2].validate(valid => {
        if (valid) {
          debugger;
          let data = {
            ...this.formBase2
          };
          //注意：这里有个特殊情况，修改状态下自动化状态未选择则需转化成状态码。
          if(data.equipStatus=="停用"){
            data.equipStatus=0;
          }else if(data.equipStatus=="启用"){
            data.equipStatus=1;
          }
          var equipData = new Object();
          equipData.token = getToken();
          equipData.data = data;
          //录入人的Uuid
          equipData.data.entryAccUuid=this.userUuid;
          //注意：这里重新赋值，用了el-date-picker将json时间格式化了
          equipData.data.verifyDate =
            $("#verifyDate").val() != "" ? $("#verifyDate").val() : null;
          equipData.data.verifyValidDate =
            $("#verifyValidDate").val() != ""? $("#verifyValidDate").val(): null;
          equipData.data.entryDate =
            $("#entryDate").val() != "" ? $("#entryDate").val() : null;
          equipData.data.confirmDate =
            $("#confirmDate").val() != "" ? $("#confirmDate").val() : null;
          if (this.text == "创建") {
            addEquip(equipData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  this.$emit("handleCloseEquip"); 
                  this.$confirm("创建设备成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshEquipList");
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
            updateEquip(equipData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  this.$emit("handleCloseEquip");
                  this.$confirm("修改设备成功!", "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  this.$emit("refreshEquipList");
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
     //录入人就是登录人
     detail({token:this.token}).then(res=>{
        this.userUuid=res.data.userUuid;
     });
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
