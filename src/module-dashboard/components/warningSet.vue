<template>
  <div class="add-form">
    <el-dialog width="50%" title="报警参数设置" :visible.sync="dialogFormVisible">
      <el-dialog width="40%" title="报警参数" :visible.sync="innerVisible" append-to-body>
        <el-form ref="formData" :model="formData" label-position="right" label-width="150px" style='margin:0 20px;'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="速率预警值(mm/d)" prop="rateWarning">
                <el-input v-model="formData.rateWarning" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="累计预警值(mm)" prop="accumWarning">
                <el-input v-model="formData.accumWarning" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="速率报警值(mm/d)" prop="rateAlarm">
                <el-input v-model="formData.rateAlarm" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="累计报警值(mm)" prop="accumAlarm">
                <el-input v-model="formData.accumAlarm" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="速率控制值(mm/d)" prop="rateControl">
                <el-input v-model="formData.rateControl" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="累计控制值(mm)" prop="accumControl">
                <el-input v-model="formData.accumControl" placeholder="Please input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="报警设置名称" prop="warningName">
                <el-input v-model="formData.warningName" placeholder="Please input"></el-input>
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
      <el-button type="primary" size="small" icon="el-icon-circle-plus" style="margin-bottom:10px;" @click="addWarning">新增</el-button>
      <el-table :key='tableKey' :height="tableHeight" :data="warningSetData" :default-sort="{prop:'warningName'}" highlight-current-row border>
        <el-table-column align="center" label="报警设置名称" prop="warningName" sortable>
        </el-table-column>
        <el-table-column align="center" label="速率预警值(mm/d)">
          <template slot-scope="scope">
            <span v-if="scope.row.rateWarning!=null">{{scope.row.rateWarning}}</span>
            <span v-if="scope.row.rateWarning==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="速率报警值(mm/d)">
          <template slot-scope="scope">
            <span v-if="scope.row.rateAlarm!=null">{{scope.row.rateAlarm}}</span>
            <span v-if="scope.row.rateAlarm==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="速率控制值(mm/d)">
          <template slot-scope="scope">
            <span v-if="scope.row.rateControl!=null">{{scope.row.rateControl}}</span>
            <span v-if="scope.row.rateControl==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="累计预警值(mm)">
          <template slot-scope="scope">
            <span v-if="scope.row.accumWarning!=null">{{scope.row.accumWarning}}</span>
            <span v-if="scope.row.accumWarning==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="累计报警值(mm)">
          <template slot-scope="scope">
            <span v-if="scope.row.accumAlarm!=null">{{scope.row.accumAlarm}}</span>
            <span v-if="scope.row.accumAlarm==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="累计控制值(mm)">
          <template slot-scope="scope">
            <span v-if="scope.row.accumControl!=null">{{scope.row.accumControl}}</span>
            <span v-if="scope.row.accumControl==null">/</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.is_deleted===1" type="primary" size="mini" icon="el-icon-edit" @click="updateWarning(scope.row)">修改</el-button>
            <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger" icon="el-icon-delete" @click="warningRemove(scope.row.warningUuid)">删除</el-button>
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
import { addEquip, updateEquip } from "@/api/base/equip";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import { detail } from "@/api/base/organ";
import {
  getWarningSet,
  addWarningSet,
  viewWarningSet,
  updateWarningSet,
  removeWarningSet
} from "@/api/base/project";
import axios from "axios";

export default {
  name: "warningSet",
  props: ["projectId"],
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      warningSetData: [],
      token: getToken(),
      userUuid: "",
      tableKey: 0,
      type: "",
      monitorItemUuid: "", //监测项设置中当前选中的监测项
      tableHeight: window.innerHeight / 2, //table高度
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
      ],
      formData: {
        warningUuid: "",
        projectUuid: "",
        monitorItemUuid: "",
        warningName: null,
        rateWarning: null,
        rateAlarm: null,
        rateControl: null,
        accumWarning: null,
        accumAlarm: null,
        accumControl: null
      }
    };
  },
  computed: {},
  methods: {
    //报警设置列表数据
    getWarningList() {
      getWarningSet({
        monitorItemUuid: this.monitorItemUuid,
        token: this.token
      }).then(res => {
        this.warningSetData = res.data.data;
      });
    },
    // 弹层显示,显示列表
    dialogFormV(monitorItemUuid) {
      this.monitorItemUuid = monitorItemUuid;
      this.getWarningList();
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
    // 退出
    handleClose() {
      this.$emit("handleCloseWarning");
    },
    addWarning() {
      this.type = "新增";
      this.innerVisible = true;
    },
    updateWarning(params) {
      this.type = "修改";
      this.formData.warningUuid = params.warningUuid;
      this.formData.projectUuid = params.projectUuid;
      this.formData.monitorItemUuid = params.monitorItemUuid;
      this.formData.warningName = params.warningName;
      this.formData.rateWarning = params.rateWarning;
      this.formData.rateAlarm = params.rateAlarm;
      this.formData.rateControl = params.rateControl;
      this.formData.accumWarning = params.accumWarning;
      this.formData.accumAlarm = params.accumAlarm;
      this.formData.accumControl = params.accumControl;
      this.innerVisible = true;
    },
    // 表单提交
    createData(formData) {
      let data = {
        ...this.formData
      };
      //赋值当前项目和所选监测项
      data.projectUuid = this.projectId;
      data.monitorItemUuid = this.monitorItemUuid;
      console.log(this.projectId);
      console.log(this.monitorItemUuid);
      var warningData = new Object();
      warningData.token = getToken();
      warningData.data = data;
      if (this.type == "新增") {
        addWarningSet(warningData)
          .then(response => {
            if (response.data.result == 1) {
              const jsonData = response.data;
              //重新加载数据
              this.getWarningList();
              this.$confirm("创建新报警参数成功!", "提示", {
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
              message: "无法获取创建报警参数接口!"
            });
            this.innerVisible = false;
          });
      } else if (this.type == "修改") {
        updateWarningSet(warningData)
          .then(response => {
            if (response.data.result == 1) {
              const jsonData = response.data;
              this.getWarningList();
              this.$confirm("修改报警参数成功!", "提示", {
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
    //删除报警设置
    warningRemove(warningUuid){
      debugger
      this.$confirm("此操作将永久删除该报警设置 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeWarningSet({warningUuid,token:this.token})
            .then(response => {
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getWarningList();
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败,该报警设置下有点，无法删除!!");
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
