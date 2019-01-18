<template>
  <div class="add-form">
    <el-dialog width="55%"  :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form ref="formBase" :model="formBase" label-position="right" label-width="140px" style='margin:0 50px;' :disabled="true">
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
              <el-select v-model="formBase.type.code" placeholder="请选择">
                <el-option id="typeCode" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
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
import { addInstitutes, updateInstitutes } from "@/api/base/organ";
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
          label: "第三方监测单位"
        },
        {
          value: "1",
          label: "施工检测单位"
        },
        {
          value: "2",
          label: "监理单位"
        },
        {
          value: "3",
          label: "安监单位"
        },
        {
          value: "4",
          label: "业主单位"
        },
        {
          value: "5",
          label: "设计单位"
        },
        {
          value: "6",
          label: "施工单位"
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
