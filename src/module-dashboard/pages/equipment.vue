<template>
  <div class="dashboard-container users">
    <div class="app-container">
      <el-card shadow="never">
        <el-tabs type="border-card">
          <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="getBack" type="primary" icon="el-icon-back">返回首页</el-button>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-tickets"></i> 设备型号</span>
            <!-- 搜索 -->
            <el-form :model="requestParameters" ref="requestParameters">
              <div class="filter-container">
                <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="toAddModel" type="primary" icon="el-icon-edit">新增型号</el-button>
              </div>
            </el-form>
            <el-alert v-if="alertText1 !== ''" :title="alertText1" type="info" class="alert" :closable='false' show-icon></el-alert>
            <!-- end -->
            <!-- 数据 -->
            <el-table :key='tableKey' :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" :height="tableHeight" :data="EquipModelDataList" :row-class-name="rowClassStatus" v-loading="listLoading1" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
              <el-table-column align="center" label="型号名称">
                <template slot-scope="scope">
                  <span v-if="scope.row.modelName!=null">{{scope.row.modelName}}</span>
                  <span v-if="scope.row.modelName==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="型号简称">
                <template slot-scope="scope">
                  <span v-if="scope.row.modelEname!=null">{{scope.row.modelEname}}</span>
                  <span v-if="scope.row.modelEname==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="所属类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.sysEquipmentType.typeName!=null">{{scope.row.sysEquipmentType.typeName}}</span>
                  <span v-if="scope.row.sysEquipmentType.typeName==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="是否自动">
                <template slot-scope="scope">
                  <span v-if="scope.row.modelAuto==0">非全自动设备</span>
                  <span v-if="scope.row.modelAuto==1">全自动设备</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数据格式">
                <template slot-scope="scope">
                  <span v-if="scope.row.modelFormat!=null">{{scope.row.modelFormat}}</span>
                  <span v-if="scope.row.modelFormat==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="生产厂家">
                <template slot-scope="scope">
                  <span v-if="scope.row.manufacturer!=null">{{scope.row.manufacturer}}</span>
                  <span v-if="scope.row.manufacturer==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('table.actions')" width="250px" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.is_deleted===1" size="mini" type="success" icon="el-icon-info" @click="modelView(scope.row.modelUuid)">查看</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" type="primary" size="mini" icon="el-icon-edit"  @click="modelUpdate(scope.row)">修改</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger"  icon="el-icon-delete" @click="modelRemove(scope.row.modelUuid)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- end -->
            <!-- 分页 -->
            <div class="pagination">
              <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
              </PageTool>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-info"></i> 设备信息</span>
            <el-form :model="requestParameters" ref="requestParameters">
              <div class="filter-container">
                <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="toAddEquip" type="primary" icon="el-icon-edit">新增设备</el-button>
              </div>
            </el-form>
            <el-alert v-if="alertText2 !== ''" :title="alertText2" type="info" class="alert" :closable='false' show-icon></el-alert>
            <!-- end -->
            <!-- 数据 -->
            <el-table :key='tableKey' :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" :height="tableHeight" :data="equipDataList" :row-class-name="rowClassStatus" v-loading="listLoading2" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
              <el-table-column align="center" width="100px;" label="设备型号">
                <template slot-scope="scope">
                  <span v-if="scope.row.paraEquipmentModul.modelName!=null">{{scope.row.paraEquipmentModul.modelName}}</span>
                  <span v-if="scope.row.paraEquipmentModul.modelName==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="仪器名称">
                <template slot-scope="scope">
                  <span v-if="scope.row.equipName!=null">{{scope.row.equipName}}</span>
                  <span v-if="scope.row.equipName==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="仪器简称">
                <template slot-scope="scope">
                  <span v-if="scope.row.equipEname!=null">{{scope.row.equipEname}}</span>
                  <span v-if="scope.row.equipEname==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="80px;" label="仪器编号">
                <template slot-scope="scope">
                  <span v-if="scope.row.equipID!=null">{{scope.row.equipID}}</span>
                  <span v-if="scope.row.equipID==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="校验日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.verifyDate!=null">{{scope.row.verifyDate | dateTimeFormat}}</span>
                  <span v-if="scope.row.verifyDate==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="有效日期">
                <template slot-scope="scope">
                  <span v-if="scope.row.verifyValidDate!=null">{{scope.row.verifyValidDate | dateTimeFormat}}</span>
                  <span v-if="scope.row.verifyValidDate==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="检验机构">
                <template slot-scope="scope">
                  <span v-if="scope.row.verifyOrg!=null">{{scope.row.verifyOrg}}</span>
                  <span v-if="scope.row.verifyOrg==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="校准证号">
                <template slot-scope="scope">
                  <span v-if="scope.row.verifyNumber!=null">{{scope.row.verifyNumber}}</span>
                  <span v-if="scope.row.verifyNumber==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="100px;" label="设备状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.equipStatus==0"><img :src="disableGif" alt="停用设备"></img> 停用</span>
                  <span v-if="scope.row.equipStatus==1"><img :src="normalGif" alt="设备正常启用"></img> 启用</span>
                  <span v-if="scope.row.equipStatus==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="所有单位">
                <template slot-scope="scope">
                  <span v-if="scope.row.orgOwner!=null">{{scope.row.orgOwner}}</span>
                  <span v-if="scope.row.orgOwner==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="使用单位">
                <template slot-scope="scope">
                  <span v-if="scope.row.orgUse!=null">{{scope.row.orgUse}}</span>
                  <span v-if="scope.row.orgUse==null">/</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('table.actions')" width="250px" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.is_deleted===1" size="mini" type="success"  icon="el-icon-info" @click="equipView(scope.row.equipUuid)">查看</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" type="primary" size="mini"  icon="el-icon-edit"  @click="equipUpdate(scope.row)">修改</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger"   icon="el-icon-delete" @click="equipRemove(scope.row.equipUuid)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- end -->
            <!-- 分页 -->
            <div class="pagination">
              <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
              </PageTool>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- end -->
        <!-- 新增标签弹层 -->
        <component @refreshModelList="getEquipModelList" v-bind:is="ModelAdd" ref="editModel" :formData.sync='requestParameters' :text='text' :pageTitle='pageTitle' :formBase1='formData1' :ruleInline1='ruleInline1' :PermissionGroupsList='PermissionGroupsList' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
        </component>
        <!-- 新增标签弹层 -->
        <component @refreshEquipList="getEquipList" v-bind:is="EquipAdd" ref="editEquip" :formData.sync='requestParameters' :text='text' :pageTitle='pageTitle' :formBase2='formData2' :modelDropdownList='modelDropdownList' :projectDropdownList='projectDropdownList' :ruleInline2='ruleInline2' :PermissionGroupsList='PermissionGroupsList' v-on:newDataes="handleLoadDataList" v-on:handleCloseEquip="handleCloseEquip">
        </component>
      </el-card>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}

.pagination {
  margin-top: 10px;
  // text-align: right;
}
</style>

<script>
import { equipModelList, equipList,viewEquipModel,viewEquip,removeEquipModel,removeEquip } from "@/api/base/equip";
import PageTool from "./../components/pageTool";
import { getToken } from "@/utils/auth";
import { Institutes } from "@/api/base/organ";
import normalGif from "@/assets/green.png";
import disableGif from "@/assets/red.gif";
import ModelAdd from "./../components/equipModelAdd.vue";
import EquipAdd from "./../components/equipAdd.vue";
import { projectList } from "@/api/base/project";
export default {
  name: "base-users",
  components: {
    ModelAdd,
    EquipAdd,
    PageTool
  },
  data() {
    return {
      ModelAdd: "ModelAdd",
      EquipAdd: "EquipAdd",
      normalGif,
      disableGif,
      pageTitle: "", // 页面标题
      text: "", // 新增、编辑文本
      token: getToken(), //获取token
      tableKey: 0,
      deletedDate: false,
      showDate: true,
      EquipModelDataList: [], //设备型号数据
      equipDataList: [], //设备信息数据
      PermissionGroupsList: [], // 权限组加载
      total: null,
      tableHeight: window.innerHeight - 290, //table高度
      listLoading1: true,
      listLoading2: true,
      dialogStatus: "",
      alertText1: "",
      alertText2: "",
      modelDropdownList: "", //创建设备时候，设备型号下拉列表
      projectDropdownList: "", //创建设备时,工程项目列表
      requestParameters: {
        page: 1,
        pagesize: 10,
        username: this.username
      },
      formData1: {
        modelUuid: "",
        modelName: "",
        modelEname: "",
        typeCode: "",
        modelAuto: "",
        modelFormat: "",
        manufacturer: ""
      },
      formData2: {
        equipUuid: "",
        equipModel: "",
        equipName: "",
        equipEname: "",
        equipId: "",
        verifyDate: "",
        verifyValidDate: "",
        verifyOrg: "",
        verifyNumber: "",
        projectUuid: "",
        equipStatus: "",
        orgOwner: "",
        orgUse: "",
        imageEquipment: "",
        imageVerify: "",
        entryAccUuid: "",
        entryDate: "",
        confirmAccUuid: "",
        confirmDate: ""
      },
      ruleInline1: {
        // 表单验证
        modelName: [
          { required: true, message: "型号名称不能为空", trigger: "blur" }
        ],
        typeCode: [
          { required: true, message: "所属类型不能为空", trigger: "blur" }
        ],
        modelAuto: [
          {
            required: true,
            message: "是否自动不能为空",
            trigger: "blur"
          }
        ]
      },
      ruleInline2: {
        //设备的表单验证
        equipModel: [
          { required: true, message: "仪器型号不能为空", trigger: "blur" }
        ],
        equipName: [
          { required: true, message: "仪器名称不能为空", trigger: "blur" }
        ],
        equipStatus: [
          { required: true, message: "设备状态不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //表格table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "background-color:#FFF7EA";
      } else {
        return "background-color:#ffffff";
      }
    },
    //修改table header的背景色和居中显示
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background-color:#FFDCA9;color: #000000;text-align:center;";
      }
    },
    //获取工程下拉列表
    getProjectList() {
      projectList({ token: this.token }).then(response => {
        debugger;
        this.projectDropdownList = response.data;
      });
    },
    // 获取设备型号列表数据
    getEquipModelList(params) {
      this.listLoading1 = true;
      equipModelList({ token: this.token })
        .then(res => {
          if (res.data.result == 1) {
            debugger;
            this.EquipModelDataList = res.data.data;
            this.modelDropdownList = this.EquipModelDataList; //options1作为创建设备时的型号下拉列表
            this.total = res.data.data.length;
            this.alertText1 = `共 ${this.total} 条记录`;
            this.listLoading1 = false;
          } else {
            this.$confirm(res.data.message, "提示", {
              type: "warning",
              showConfirmButton: false,
              showCancelButton: false
            });
          }
        })
        .catch(() => {
          this.$confirm("无法获取设备型号接口", "提示", {
            type: "error",
            showConfirmButton: false,
            showCancelButton: false
          });
        });
    },
    //获取设备信息接口数据
    getEquipList(params) {
      this.listLoading2 = true;
      Institutes({ token: this.token })
        .then(response => {
          //先获取登录人机构的id
          if (Array.isArray(response.data.data) == true) {
            //当机构信息为数组时，必为超级机构，拿到超级机构的组织id
            var superOrg = response.data.data.filter(function(item) {
              return item.orgName == "超级机构";
            });
            var organUuid = superOrg[0].orgUuid;
          } else {
            //非超级机构，机构数据则是一个对象
            var organUuid = response.data.data.orgUuid;
          }
          equipList({
            orguuid: organUuid,
            token: this.token
          })
            .then(res => {
              debugger;
              if (res.data.result == 1) {
                this.equipDataList = res.data.data;
                this.total = res.data.data.length;
                this.alertText2 = `共 ${this.total} 条记录`;
                this.listLoading2 = false;
              } else {
                this.$confirm(res.data.message, "提示", {
                  type: "warning",
                  showConfirmButton: false,
                  showCancelButton: false
                });
              }
            })
            .catch(() => {
              this.$confirm("无法获取设备信息接口", "提示", {
                type: "error",
                showConfirmButton: false,
                showCancelButton: false
              });
            });
        })
        .catch(() => {
          this.$confirm("无法获取机构ID接口", "提示", {
            type: "error",
            showConfirmButton: false,
            showCancelButton: false
          });
        });
    },
    // 重置
    resetForm() {
      this.$refs["requestParameters"].resetFields();
    },
    // 搜索信息
    handleFilter() {
      this.requestParameters.page = 1;
      this.getEquipModelList(this.requestParameters);
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.requestParameters.pagesize = val;
      if (this.requestParameters.page === 1) {
        this.getEquipModelList(this.requestParameters);
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val;
      this.getEquipModelList();
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.getEquipModelList();
    },
    // 数据删除后显示样式
    rowClassStatus(row) {
      if (row.row.is_deleted === 1) {
        this.deletedDate = true;
        this.showDate = false;
        return "disabled";
      } else {
        return "";
      }
    },
    // **********************************
    // 型号新建
    queryModel() {
      this.formData1 = {
        modelUuid: "default",
        modelName: null,
        modelEname: null,
        typeCode: null,
        modelAuto: null,
        modelFormat: null,
        manufacturer: null
      };
    },
    queryEquip() {
      this.formData2 = {
        equipUuid: "default",
        equipModel: null,
        equipName: null,
        equipEname: null,
        equipId: null,
        verifyDate: null,
        verifyValidDate: null,
        verifyOrg: null,
        verifyNumber: null,
        projectUuid: "",
        equipStatus: null,
        orgOwner: null,
        orgUse: null,
        imageEquipment: null,
        imageVerify: null,
        entryAccUuid: "",
        entryDate: null,
        confirmAccUuid: "",
        confirmDate: null
      };
    },
    // 新增型号
    toAddModel() {
      this.queryModel();
      this.text = "创建";
      this.pageTitle = "型号";
      this.$refs.editModel.dialogFormV();
    },
    //新增设备
    toAddEquip() {
      this.queryEquip();
      this.text = "创建";
      this.pageTitle = "设备";
      this.$refs.editEquip.dialogFormV();
    },
    // 窗口操作**********************************
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editModel.dialogFormH();
    },
    handleCloseEquip() {
      this.$refs.editEquip.dialogFormH();
    },
    modelView(modelUuid){
      // this.queryModel();
      
    },
    //
    modelUpdate(params) {
      // this.queryModel();
      var _this = this;
      this.text = "修改";
      this.pageTitle = "型号";
      this.$refs.editModel.dialogFormV();
      _this.modelEditForm(params);
    },
    equipUpdate(params) {
      // this.queryModel();
      var _this = this;
      this.text = "修改";
      this.pageTitle = "设备";
      this.$refs.editEquip.dialogFormV();
      _this.equipEditForm(params);
    },
    // 修改型号
    // 表单详情数据加载
    modelEditForm(params) {
      this.formData1.modelUuid = params.modelUuid;
      this.formData1.modelName = params.modelName;
      this.formData1.modelEname = params.modelEname;
      this.formData1.typeCode = params.sysEquipmentType.typeCode; //这里拿到的数字，但是在新建表单里是展示typeName型号名字
      this.formData1.modelAuto =
        params.modelAuto == 0 ? "非全自动设备" : "全自动设备";
      this.formData1.modelFormat = params.modelFormat;
      this.formData1.manufacturer = params.manufacturer;
    },
    // 设备详情数据加载
    equipEditForm(params) {
      debugger;
      this.formData2.equipUuid = params.equipUuid;
      this.formData2.equipModel = params.paraEquipmentModul.modelUuid;
      this.formData2.equipName = params.equipName;
      this.formData2.equipEname = params.equipEname;
      this.formData2.equipId = params.equipID;
      this.formData2.verifyDate = params.verifyDate;
      this.formData2.verifyValidDate = params.verifyValidDate;
      this.formData2.verifyOrg = params.verifyOrg;
      this.formData2.verifyNumber = params.verifyNumber;
      this.formData2.projectUuid =params.projectFoundationDitch != null? params.projectFoundationDitch.projectUuid: "";
      this.formData2.equipStatus = params.equipStatus == 0 ? "停用" : "启用";
      this.formData2.orgOwner = params.orgOwner;
      this.formData2.orgUse = params.orgUse;
      this.formData2.imageEquipment = params.imageEquipment;
      this.formData2.imageVerify = params.imageVerify;
      this.formData2.entryAccUuid =params.userAccountEntry != null? params.userAccountEntry.accountUuid: "";
      this.formData2.entryDate = params.entryDate;
      this.formData2.confirmAccUuid =params.userAccountConfirm != null? params.userAccountConfirm.accountUuid: "";
      this.formData2.confirmDate = params.confirmDate;
    },
    // 删除
    modelRemove(modelUuid) {
      this.$confirm("此操作将永久删除设备型号 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeEquipModel({ modelUuid, token: this.token })
            .then(response => {
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getEquipModelList(this.requestParameters);
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败!该型号下有设备，无法删除!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    equipRemove(equipUuid) {
      this.$confirm("此操作将永久删除设备 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeEquip({ equipUuid, token: this.token })
            .then(response => {
              debugger
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getEquipList(this.requestParameters);
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    //回到首页
    getBack() {
      this.$router.push({ path: "/" });
    }
  },
  // 挂载结束
  mounted: function() {
    //获取工程列表
    this.getProjectList();
  },
  // 创建完毕状态
  created() {
    this.getEquipModelList();
    this.getEquipList();
    // 键盘enter操作
    // var lett = this;
    // document.onkeydown = function(e) {
    //   var key = window.event.keyCode;
    //   if (key === 13) {
    //     lett.handleFilter(this.requestParameters);
    //   }
    // };
  },
  // 组件更新
  updated: function() {}
};
</script>
