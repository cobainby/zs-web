<template>
  <div class="add-form">
    <el-dialog
      width="50%"
      title="监测点参数设置"
      :visible.sync="dialogFormVisible"
    >
      <el-dialog
        width="40%"
        title="监测点参数"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form
          :rules="ruleInline"
          ref="formData"
          :model="formData"
          label-position="right"
          label-width="100px"
          style='margin:0 20px;'
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="测点编号"
                prop="surveypointNumber"
              >
                <el-input
                  v-model="formData.surveypointNumber"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="初始累计值"
                prop="accumInitial"
              >
                <el-input
                  v-model="formData.accumInitial"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="测点状态"
                prop="surveypointCondition"
              >
                <el-select
                  v-model="formData.surveypointCondition"
                  placeholder="please input"
                >
                  <el-option
                    id="surveypointCondition"
                    v-for="item in option"
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
                label="报警设置"
                prop="warningUuid"
              >
                <el-select
                  v-model="formData.warningUuid"
                  placeholder="please input"
                >
                  <el-option
                    id="warningUuid"
                    v-for="item in warningSelect"
                    :key="item.warningUuid"
                    :label="item.warningName"
                    :value="item.warningUuid"
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
                label="排序号"
                prop="surveypointOrder"
              >
                <el-input
                  v-model="formData.surveypointOrder"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="设置时间"
                prop="dateSet"
              >
                <el-date-picker
                  id="dateSet"
                  v-model="formData.dateSet"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00"
                >
                </el-date-picker>
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
            @click="createData('formData')"
          >{{$t('table.confirm')}}</el-button>
          <el-button
            icon="el-icon-edit-outline"
            size="mini"
            type="danger"
            @click="resetForm('formData')"
          >重置</el-button>
          <el-button
            icon="el-icon-error"
            size="mini"
            @click="innerVisible=false"
          >{{$t('table.cancel')}}</el-button>
        </div>
      </el-dialog>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-circle-plus"
        style="margin-bottom:10px;"
        @click="addSuveyPoint"
      >新增</el-button>
      <el-table
        :key='tableKey'
        :height="tableHeight"
        :data="surveypointSetData"
        highlight-current-row
        border
      >
        <el-table-column
          align="center"
          width="80px"
          label="测点编号"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.surveypointNumber!=null">{{scope.row.surveypointNumber}}</span>
            <span v-if="scope.row.surveypointNumber==null">/</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="初始累计值"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.accumInitial!=null">{{scope.row.accumInitial}}</span>
            <span v-if="scope.row.accumInitial==null">/</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="80px"
          label="测点状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.surveypointCondition==0">未启用</span>
            <span v-if="scope.row.surveypointCondition==1">启用</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报警设置"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.paraWarningSet.warningName!=null">{{scope.row.paraWarningSet.warningName}}</span>
            <span v-if="scope.row.paraWarningSet.warningName==null">/</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="70px"
          label="排序号"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.surveypointOrder!=null">{{scope.row.surveypointOrder}}</span>
            <span v-if="scope.row.surveypointOrder==null">/</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设置时间"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.dateSet!=null">{{scope.row.dateSet| dateTimeFormat}}</span>
            <span v-if="scope.row.dateSet==null">/</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200px"
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.is_deleted===1"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateSuveyPoint(scope.row)"
            >修改</el-button>
            <el-button
              :disabled="scope.row.is_deleted===1"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="surveypointRemove(scope.row.surveypointUuid)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="handleClose"
        >取 消</el-button>
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
  getSuveyPointSet,
  addSuveyPointSet,
  viewSuveyPointSet,
  updateSuveyPointSet,
  removeSuveyPointSet,
  getWarningSet
} from "@/api/base/project";
import axios from "axios";

export default {
  name: "surveypointSet",
  props: ["projectId"],
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: [],
      surveypointSetData: [],
      token: getToken(),
      userUuid: "",
      tableKey: 0,
      type: "",
      monitorItemUuid: "", //监测项设置中当前选中的监测项
      tableHeight: window.innerHeight / 2, //table高度
      importFileUrl: "https://jsonplaceholder.typicode.com/posts/",
      option: [
        {
          value: "0",
          label: "未启用"
        },
        {
          value: "1",
          label: "启用"
        }
      ],
      warningSelect: [],
      formData: {
        surveypointUuid: "",
        monitorItemUuid: "",
        surveypointNumber: "",
        accumInitial: null,
        surveypointCondition: null,
        warningUuid: "",
        surveypointOrder: null,
        dateSet: ""
      },
      ruleInline: {
        // 表单验证
        accumInitial: [
          { required: true, message: "初始累计值不能为空", trigger: "blur" }
        ],
        surveypointOrder: [
          { required: true, message: "排序号不能为空", trigger: "blur" }
        ],
        surveypointCondition: [
          { required: true, message: "测点状态不能为空", trigger: "blur" }
        ],
        warningUuid: [
          { required: true, message: "报警设置不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //监测点设置列表数据
    getSuveyPointList() {
      getSuveyPointSet({
        monitorItemUuid: this.monitorItemUuid,
        token: this.token
      }).then(res => {
        debugger;
        this.surveypointSetData = res.data.data;
      });
    },
    // 弹层显示,显示列表
    dialogFormV(monitorItemUuid) {
      this.monitorItemUuid = monitorItemUuid;
      getWarningSet({
        monitorItemUuid: this.monitorItemUuid,
        token: this.token
      }).then(res => {
        debugger;
        this.warningSelect = res.data.data;
      });
      this.getSuveyPointList();
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
    // 退出
    handleClose() {
      this.$emit("handleCloseSurveypoint");
    },
    addSuveyPoint() {
      this.type = "新增";
      this.innerVisible = true;
    },
    updateSuveyPoint(params) {
      this.type = "修改";
      debugger;
      this.formData.surveypointUuid = params.surveypointUuid;
      this.formData.monitorItemUuid = params.fdMonitorItem.monitorItemUuid;
      this.formData.surveypointNumber = params.surveypointNumber;
      this.formData.accumInitial = params.accumInitial;
      this.formData.surveypointCondition =
        params.surveypointCondition == 0 ? "未启用" : "启用";
      this.formData.warningUuid = params.paraWarningSet.warningUuid;
      this.formData.surveypointOrder = params.surveypointOrder;
      this.formData.dateSet = params.dateSet;
      this.innerVisible = true;
    },
    // 表单提交
    createData(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          let data = {
            ...this.formData
          };
          debugger;
          //赋值当前项目和所选监测项
          data.projectUuid = this.projectId;
          data.monitorItemUuid = this.monitorItemUuid;
          data.dateSet = $("#dateSet").val();
          data.surveypointCondition = $("#surveypointCondition").val();
          var surveypointData = new Object();
          surveypointData.token = getToken();
          surveypointData.data = data;
          if (this.type == "新增") {
            addSuveyPointSet(surveypointData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  //重新加载数据
                  this.getSuveyPointList();
                  this.$confirm("创建新监测点参数成功!", "提示", {
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
                  message: "无法获取创建监测点参数接口!"
                });
                this.innerVisible = false;
              });
          } else if (this.type == "修改") {
            updateSuveyPointSet(surveypointData)
              .then(response => {
                if (response.data.result == 1) {
                  const jsonData = response.data;
                  this.getSuveyPointList();
                  this.$confirm("修改监测点参数成功!", "提示", {
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
        }
      });
    },
    //删除监测点设置
    surveypointRemove(surveypointUuid) {
      debugger;
      this.$confirm("此操作将永久删除该监测点设置 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeSuveyPointSet({ surveypointUuid, token: this.token })
            .then(response => {
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getSuveyPointList();
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败,该监测点设置下有点，无法删除!!");
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
