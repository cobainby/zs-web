<template>
  <div class="add-form">
    <el-dialog
      width="50%"
      title="测点设置"
      :visible.sync="dialogFormVisible"
    >
      <el-dialog
        width="40%"
        title="excel上传监测点"
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
                label="上传点号"
                prop="surveypointNumber"
              >
                <form
                  enctype="multipart/form-data"
                  id="form_example"
                  style="height:40px"
                >
                  <input
                    type="file"
                    name="files"
                    id="pointsUpload"
                    multiple
                  /><br /><br />
                </form>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="dfValue"
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
                label="设置时间"
                prop="dateSet"
              >
                <el-date-picker
                  id="dateSet"
                  v-model="formData2.dateSet"
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
      <el-dialog
        width="40%"
        title="新增监测点"
        :visible.sync="innerOriVisible"
        append-to-body
      >
        <el-form
          :rules="ruleInline2"
          ref="formData2"
          :model="formData2"
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
                  v-model="formData2.surveypointNumber"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="dfValue"
                prop="accumInitial"
              >
                <el-input
                  v-model="formData2.accumInitial"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="起始数"
                prop="beginNum"
              >
                <el-input
                  v-model="formData2.beginNum"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="测点数"
                prop="spCount"
              >
                <el-input
                  v-model="formData2.spCount"
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
                  v-model="formData2.surveypointCondition"
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
                  v-model="formData2.warningUuid"
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
                  v-model="formData2.surveypointOrder"
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
                  v-model="formData2.dateSet"
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
            @click="createOriData('formData2')"
          >{{$t('table.confirm')}}</el-button>
          <el-button
            icon="el-icon-edit-outline"
            size="mini"
            type="danger"
            @click="resetForm('formData2')"
          >重置</el-button>
          <el-button
            icon="el-icon-error"
            size="mini"
            @click="innerOriVisible=false"
          >{{$t('table.cancel')}}</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="40%"
        title="修改监测点"
        :visible.sync="innerUpdateVisible"
        append-to-body
      >
        <el-form
          :rules="updateRuleInline"
          ref="updateFormData"
          :model="updateFormData"
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
                  v-model="updateFormData.surveypointNumber"
                  placeholder="Please input"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="dfValue"
                prop="accumInitial"
              >
                <el-input
                  v-model="updateFormData.accumInitial"
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
                  v-model="updateFormData.surveypointCondition"
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
                  v-model="updateFormData.warningUuid"
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
                  v-model="updateFormData.surveypointOrder"
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
                  v-model="updateFormData.dateSet"
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
            @click="createData('updateFormData')"
          >{{$t('table.confirm')}}</el-button>
          <el-button
            icon="el-icon-edit-outline"
            size="mini"
            type="danger"
            @click="resetForm('updateFormData')"
          >重置</el-button>
          <el-button
            icon="el-icon-error"
            size="mini"
            @click="innerUpdateVisible=false"
          >{{$t('table.cancel')}}</el-button>
        </div>
      </el-dialog>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-upload"
        style="margin-bottom:10px;"
        @click="addExcelSuveyPoint"
      >excel上传点号</el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-circle-plus"
        style="margin-bottom:10px;"
        @click="addOriSuveyPoint"
      >原始上传点号</el-button>
      <el-table
        :key='tableKey'
        :height="tableHeight"
        :data="surveypointSetData"
        :default-sort="{prop:'surveypointNumber'}"
        highlight-current-row
        border
      >
        <el-table-column
          align="center"
          width="80px"
          label="测点编号"
          prop="surveypointNumber"
          sortable
        >
        </el-table-column>
        <el-table-column
          align="center"
          :label="dfValue"
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
  props: ["projectId","dfValue"],
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      innerOriVisible: false,
      innerUpdateVisible: false,
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
        dateSet: ""
      },
      formData2: {
        surveypointUuid: "",
        monitorItemUuid: "",
        surveypointNumber: "",
        beginNum: "",
        spCount: "",
        accumInitial: null,
        surveypointCondition: null,
        warningUuid: "",
        surveypointOrder: null,
        dateSet: ""
      },
      updateFormData: {
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
        surveypointCondition: [
          { required: true, message: "测点状态不能为空", trigger: "blur" }
        ],
        warningUuid: [
          { required: true, message: "报警设置不能为空", trigger: "blur" }
        ]
      },
      ruleInline2: {
        // 表单验证
        accumInitial: [
          { required: true, message: "初始累计值不能为空", trigger: "blur" }
        ],
        beginNum: [
          { required: true, message: "起始数不能为空", trigger: "blur" }
        ],
        spCount: [
          { required: true, message: "测点数不能为空", trigger: "blur" }
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
      },
      updateRuleInline: {
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
    addExcelSuveyPoint() {
      this.type = "新增";
      this.innerVisible = true;
      this.formData = [];
    },
    addOriSuveyPoint() {
      this.innerOriVisible = true;
      this.formData2 = [];
    },
    updateSuveyPoint(params) {
      this.type = "修改";
      this.updateFormData.surveypointUuid = params.surveypointUuid;
      this.updateFormData.monitorItemUuid =
        params.fdMonitorItem.monitorItemUuid;
      this.updateFormData.surveypointNumber = params.surveypointNumber;
      this.updateFormData.accumInitial = params.accumInitial;
      this.updateFormData.surveypointCondition =
        params.surveypointCondition == 0 ? "未启用" : "启用";
      this.updateFormData.warningUuid = params.paraWarningSet.warningUuid;
      this.updateFormData.surveypointOrder = params.surveypointOrder;
      this.updateFormData.dateSet = params.dateSet;
      this.innerUpdateVisible = true;
    },
    // 表单提交
    createData(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          debugger;
          let data;
          if (this.type == "新增") {
            data = {
              ...this.formData
            };
          } else if (this.type == "修改") {
            data = {
              ...this.updateFormData
            };
          }
          //赋值当前项目和所选监测项
          data.projectUuid = this.projectId;
          data.monitorItemUuid = this.monitorItemUuid;
          if (this.updateFormData.surveypointCondition == "未启用") {
            data.surveypointCondition = 0;
          } else if (this.updateFormData.surveypointCondition == "启用") {
            data.surveypointCondition = 1;
          }
          data.dateSet = $("#dateSet").val();
          var surveypointData = new Object();
          surveypointData.token = getToken();
          surveypointData.data = data;
          if (this.type == "新增") {
            debugger;
            //拿到全局vue的指向
            var _this = this;
            var files = document.getElementById("pointsUpload");
            this.fileList = [];
            for (var i = 0; i < files.files.length; i++) {
              this.fileList.push(files.files[i]);
            }
            var allFormData = new FormData();
            // var request = new XMLHttpRequest();
            //循环添加到formData中
            this.fileList.forEach(function(file) {
              allFormData.append("files", file, file.name);
            });
            allFormData.append("token", this.token);
            allFormData.append("projectUuid", this.projectId);
            allFormData.append("monitorItemUuid", data.monitorItemUuid);
            allFormData.append("accumInitial", data.accumInitial);
            allFormData.append(
              "surveypointCondition",
              data.surveypointCondition
            );
            allFormData.append("warningUuid", data.warningUuid);
            allFormData.append("dateSet", data.dateSet);
            $.ajax({
              url: "/ZsPlatform/fdSetting/surveypoint/exceladd",
              type: "POST",
              data: allFormData,
              cache: false, //不设置缓存
              processData: false, // 不处理数据
              contentType: false, // 不设置内容类型
              dataType: "json",
              success: function(res) {
                if (res.result == 1) {
                  //重新加载数据
                  _this.$confirm(res.message, "提示", {
                    type: "success",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                  _this.getSuveyPointList();
                } else {
                  _this.$confirm(res.message, "提示", {
                    type: "error",
                    showConfirmButton: false,
                    showCancelButton: false
                  });
                }
                _this.innerVisible = false;
              },
              error: function(res) {
                alert("上传失败!无法获取上传接口");
              }
            });
            $("#pointsUpload")[0].value = "";
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
                this.innerUpdateVisible = false;
              })
              .catch(() => {
                this.$message({
                  type: "warning",
                  message: "无法获取修改接口!"
                });
                this.innerUpdateVisible = false;
              });
          }
        }
      });
    },
    createOriData(formData2) {
      this.$refs[formData2].validate(valid => {
        if (valid) {
          debugger;
          let data;
          data = {
            ...this.formData2
          };
          //赋值当前项目和所选监测项
          data.projectUuid = this.projectId;
          data.monitorItemUuid = this.monitorItemUuid;
          if (this.updateFormData.surveypointCondition == "未启用") {
            data.surveypointCondition = 0;
          } else if (this.updateFormData.surveypointCondition == "启用") {
            data.surveypointCondition = 1;
          }
          data.dateSet = $("#dateSet").val();
          var surveypointData = new Object();
          surveypointData.token = getToken();
          surveypointData.data = data;
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
              this.innerOriVisible = false;
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "无法获取创建监测点参数接口!"
              });
              this.innerOriVisible = false;
            });
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
