<template>
  <div class="add-form">
    <el-dialog width="50%" title="断面参数设置" :visible.sync="dialogFormVisible">
      <el-dialog width="40%" title="断面参数" :visible.sync="innerVisible" append-to-body>
        <el-form ref="formData" :model="formData" label-position="right" label-width="100px" style='margin:0 20px;'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="断面名称" prop="sectionName">
                <el-input v-model="formData.sectionName" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="断面方向" prop="direction">
                <el-select v-model="formData.direction" placeholder="please input">
                  <el-option id="direction" v-for="item in directionOption" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="起始点" prop="startPoint">
                <el-input v-model="formData.startPoint" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="终止点" prop="endPoint">
                <el-input v-model="formData.endPoint" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="断面角度" prop="angle">
                <el-input v-model="formData.angle" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button icon="el-icon-success" size="mini" type="primary" @click="createData('formData')">{{$t('table.confirm')}}</el-button>
          <el-button icon="el-icon-edit-outline" size="mini" type="danger" @click="resetForm('formData')">重置</el-button>
          <el-button icon="el-icon-error" size="mini" @click="innerVisible=false">{{$t('table.cancel')}}</el-button>
        </div>
      </el-dialog>
      <el-button type="primary" size="small" icon="el-icon-circle-plus" style="margin-bottom:10px;" @click="addsection">新增</el-button>
      <el-table :key='tableKey' :height="tableHeight" :data="sectionSetData" :default-sort="{prop:'sectionName'}" highlight-current-row border>
        <el-table-column align="center" label="断面设置名称" prop="sectionName" sortable>
        </el-table-column>
        <el-table-column align="center" label="断面方向">
          <template slot-scope="scope">
            <span v-if="scope.row.direction==0">顺时针</span>
            <span v-if="scope.row.direction==1">逆时针</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="起始点">
          <template slot-scope="scope">
            <span v-if="scope.row.startPoint!=null">{{scope.row.startPoint}}</span>
            <span v-if="scope.row.startPoint==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止点">
          <template slot-scope="scope">
            <span v-if="scope.row.endPoint!=null">{{scope.row.endPoint}}</span>
            <span v-if="scope.row.endPoint==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="断面角度">
          <template slot-scope="scope">
            <span v-if="scope.row.accumsection!=null">{{scope.row.accumsection}}</span>
            <span v-if="scope.row.accumsection==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.is_deleted===1" type="primary" size="mini" icon="el-icon-edit" @click="updatesection(scope.row)">修改</el-button>
            <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger" icon="el-icon-delete" @click="sectionRemove(scope.row.sectionUuid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shajs from "sha.js";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import { detail } from "@/api/base/organ";
import {
  getSectionSet,
  addSectionSet,
  viewSectionSet,
  updateSectionSet,
  removeSectionSet
} from "@/api/base/project";
import axios from "axios";

export default {
  name: "sectionSet",
  props: ["projectId"],
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      sectionSetData: [],
      token: getToken(),
      userUuid: "",
      tableKey: 0,
      type: "",
      monitorItemUuid: "", //监测项设置中当前选中的监测项
      tableHeight: window.innerHeight / 2, //table高度
      importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
      directionOption: [
        {
          value: "0",
          label: "顺时针"
        },
        {
          value: "1",
          label: "逆时针"
        }
      ],
      formData: {
        sectionUuid: "",
        projectUuid: "",
        sectionName: "",
        direction: null,
        startPoint:"",
        endPoint:"",
        angle:null
      }
    };
  },
  computed: {},
  methods: {
    //断面设置列表数据
    getSectionList() {
      debugger
      getSectionSet({
        projectUuid: this.projectId,
        token: this.token
      }).then(res => {
        this.sectionSetData = res.data.data;
      });
    },
    // 弹层显示,显示列表
    dialogFormV(monitorItemUuid) {
      this.monitorItemUuid = monitorItemUuid;
      this.getSectionList();
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
    // 退出
    handleClose() {
      debugger
      this.$emit("handleCloseSection");
    },
    addsection() {
      this.type = "新增";
      this.innerVisible = true;
    },
    updatesection(params) {
      this.type = "修改";
      this.formData.sectionUuid = params.sectionUuid;
      this.formData.projectUuid = params.projectUuid;
      this.formData.sectionName = params.sectionName;
      this.formData.direction = params.direction==0?"顺时针":"逆时针";
      this.formData.startPoint = params.startPoint;
      this.formData.endPoint = params.endPoint;
      this.formData.angle = params.angle;
      this.innerVisible = true;
    },
    // 表单提交
    createData(formData) {
      let data = {
        ...this.formData
      };
      debugger
      //赋值当前项目和所选监测项
      data.projectUuid = this.projectId;
      data.monitorItemUuid = this.monitorItemUuid;
      data.direction=$("#direction").val();
      console.log(this.projectId);
      console.log(this.monitorItemUuid);
      var sectionData = new Object();
      sectionData.token = getToken();
      sectionData.data = data;
      if (this.type == "新增") {
        addSectionSet(sectionData)
          .then(response => {
            if (response.data.result == 1) {
              const jsonData = response.data;
              //重新加载数据
              this.getSectionList();
              this.$confirm("创建新断面参数成功!", "提示", {
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
            this.innerVisible = false;
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "无法获取创建断面参数接口!"
            });
            this.innerVisible = false;
          });
      } else if (this.type == "修改") {
        updateSectionSet(sectionData)
          .then(response => {
            if (response.data.result == 1) {
              const jsonData = response.data;
              this.getSectionList();
              this.$confirm("修改断面参数成功!", "提示", {
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
            this.innerVisible = false;
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "无法获取修改接口!"
            });
            this.innerVisible = false;
          });
      }
    },
    //删除断面设置
    sectionRemove(sectionUuid) {
      debugger;
      this.$confirm("此操作将永久删除该断面设置 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeSectionSet({ sectionUuid, token: this.token })
            .then(response => {
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getSectionList();
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败,该断面设置下有点，无法删除!!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
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
  created() {
    //录入人就是登录人
    detail({ token: this.token }).then(res => {
      this.userUuid = res.data.userUuid;
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
  .el-dialog__body {
    padding: 15px 20px;
  }
}
</style>
