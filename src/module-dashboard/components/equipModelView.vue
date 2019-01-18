<template>
  <div class="add-form">
    <el-dialog width="35%" :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="ruleInline1" :disabled="true"  ref="formBase1" :model="formBase1" label-position="right" label-width="80px" style='margin:0 15px;'>
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
