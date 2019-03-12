<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-select v-model="formData.orgUuid" placeholder="请选择">
          <el-option id="orgUuid" v-for="item in organOptions" :key="item.orgUuid" :label="item.orgName" :value="item.orgUuid" :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="chooseWorker">筛选</el-button>
        <el-button class="filter-item fr" size="small" @click="toAddWorker" type="primary" icon="el-icon-circle-plus-outline">增加人员</el-button>
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- 数据 -->
        <el-table :key='tableKey' :data="dataList" v-loading="listLoading" :default-sort="{prop:'accountName'}" :header-cell-style="tableHeaderStyle" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
          <el-table-column align="center" width="80px" prop="accountName" label="账户名称" sortable>
          </el-table-column>
          <el-table-column align="center" label="身份证号码">
            <template slot-scope="scope">
              <span v-if="scope.row.pid!=null">{{scope.row.pid}}</span>
              <span v-if="scope.row.pid==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="140px" label="邮箱">
            <template slot-scope="scope">
              <span v-if="scope.row.email!=null">{{scope.row.email}}</span>
              <span v-if="scope.row.email==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120px" label="工作岗位">
            <template slot-scope="scope">
              <span v-if="scope.row.post!=null">{{scope.row.post}}</span>
              <span v-if="scope.row.post==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120px" label="手机号码">
            <template slot-scope="scope">
              <span v-if="scope.row.mobilePhone!=null">{{scope.row.mobilePhone}}</span>
              <span v-if="scope.row.mobilePhone==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100px" label="微信号">
            <template slot-scope="scope">
              <span v-if="scope.row.wechat!=null">{{scope.row.wechat}}</span>
              <span v-if="scope.row.wechat==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="上岗证编号">
            <template slot-scope="scope">
              <span v-if="scope.row.numCertificate!=null">{{scope.row.numCertificate}}</span>
              <span v-if="scope.row.numCertificate==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="登记日期">
            <template slot-scope="scope">
              <span v-if="scope.row.dateRegister!=null">{{scope.row.dateRegister | dateTimeFormat}}</span>
              <span v-if="scope.row.dateRegister==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="有效日期">
            <template slot-scope="scope">
              <span v-if="scope.row.dateValid!=null">{{scope.row.dateValid | dateTimeFormat}}</span>
              <span v-if="scope.row.dateValid==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100px" label="权限角色">
            <template slot-scope="scope">
              <span v-if="scope.row.sysRole.name!=null">{{scope.row.sysRole.name}}</span>
              <span v-if="scope.row.sysRole.name==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px" fixed="right">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-info" @click="viewUser(scope.row)">查看</el-button>
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUser(scope.row.accountUuid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div class="pagination-container">
          <PageTool :paginationPage="pagination.page" :paginationPagesize="pagination.pageSize" :total="pagination.total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        <!-- 新增编辑标签弹层 -->
        <component @refreshList="getList" v-bind:is="WorkerAdd" ref="editUser" :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
        </component>
        <!-- 新增查看弹层 -->
        <component @refreshList="getList" v-bind:is="WorkerView" ref="viewUser" :text='text' :pageTitle='pageTitle' :formBase='formData'>
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
  text-align: right;
}
</style>

<style>
.el-table th {
  background-color: #fafafa;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
</style>
<script>
import PageTool from "./../components/pageTool";
import { UserAccount, removeAccount } from "@/api/base/worker";
import { Institutes } from "@/api/base/organ";
import { getToken } from "@/utils/auth";
import WorkerAdd from "./../components/workerAdd";
import WorkerView from "./../components/workerView";
import axios from "axios";
export default {
  name: "base-worker",
  components: {
    PageTool,
    WorkerAdd,
    WorkerView
  },
  data() {
    return {
      WorkerAdd: "workerAdd",
      WorkerView: "workerView",
      organOptions: [], //机构选择数据源
      organUuid: "", //当前选择的机构ID
      token: getToken(),
      pageTitle: "人员", // 页面标题
      dataList: [],
      text: "", // 新增、编辑文本
      tableKey: 0,
      total: null,
      listLoading: true,
      dialogStatus: "",
      alertText: "",
      pagination: {
        page: 1,
        // pagesize: 10
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      formData: {
        accountUuid: "",
        accountName: "",
        loginName: "",
        password: "",
        orgUuid: "",
        pid: "",
        email: "",
        post: "",
        mobilePhone: "",
        wechat: "",
        numCertificate: "",
        dateRegister: "",
        dateValid: "",
        roleCode: ""
      },
      ruleInline: {
        accountName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        mobilePhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        roleCode: [
          { required: true, message: "请选择角色权限", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //首先获取所属机构
    getOrgan() {
      Institutes({ token: this.token })
        .then(res => {
          var organData = res.data.data;
          this.organOptions = organData;
          //当前选择的机构id
          this.organUuid = organData[0].orgUuid;
          // 初始化选择第一个机构
          this.formData.orgUuid = organData[0].orgUuid;
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "token失效！无法获取人员列表!"
          });
        });
    },
    // 获取列表数据
    getList(page = 1, limit = 20) {
      this.listLoading = true;
      this.pagination.currentPage = page;
      this.pagination.pageSize = limit;
      this.alertText = "";
      this.dataList = [];
      UserAccount({
        token: this.token,
        orguuid: this.organUuid
      })
        .then(res => {
          debugger;
          this.dataList = res.data.data;
          this.pagination.total = res.data.data.length;
          this.alertText = `共 ${this.pagination.total} 条记录`;
          this.listLoading = false;
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "无法获取人员列表!"
          });
        });
    },
    chooseWorker() {
      debugger;
      this.organUuid = this.formData.orgUuid;
      this.getList();
    },
    // 搜索的项目
    query() {
      this.formData = {
        accountUuid: "default",
        accountName: null,
        loginName: null,
        password: null,
        orgUuid: this.formData.orgUuid,
        pid: null,
        email: null,
        post: null,
        mobilePhone: null,
        wechat: null,
        numCertificate: null,
        dateRegister: null,
        dateValid: null,
        roleCode: null,
      };
    },
    toAddWorker() {
      this.query();
      this.text = "创建";
      this.$refs.editUser.dialogFormV();
    },
    //查看人员
    viewUser(params) {
      this.query();
      var _this = this;
      this.text = "查看";
      _this.hanldeEditForm(params);
      this.$refs.viewUser.dialogFormV();
    },
    //编辑人员信息
    handleUpdate(params) {
      debugger;
      this.query();
      var _this = this;
      this.text = "编辑";
      _this.hanldeEditForm(params);
      this.$refs.editUser.dialogFormV();
    },
    //加载详情
    hanldeEditForm(params) {
      this.formData.accountUuid = params.accountUuid;
      this.formData.accountName = params.accountName;
      this.formData.loginName = params.accountName;
      this.formData.password = params.password;
      this.formData.orgUuid = params.userInstitutes.orgUuid;
      this.formData.pid = params.pid;
      this.formData.email = params.email;
      this.formData.post = params.post;
      this.formData.mobilePhone = params.mobilePhone;
      this.formData.wechat = params.wechat;
      this.formData.numCertificate = params.numCertificate;
      this.formData.dateRegister = params.dateRegister;
      this.formData.dateValid = params.dateValid;
      // this.formData.roleCode = params.sysRole.name;
    },
    //删除机构
    removeUser(accountUuid) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeAccount({ accountUuid, token: this.token })
            .then(response => {
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              } else {
                this.$message({
                  type: "danger",
                  message: "删除失败!"
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "删除失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增后刷新列表
    handleLoadDataList() {
      this.getList();
    },
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editUser.dialogFormH();
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.pagination.pagesize = val;
      if (this.pagination.page === 1) {
        this.getList(this.pagination);
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getList();
    },
    //修改table header的背景色和居中显示
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background-color:#FFDCA9;color: #000000;text-align:center;text-shadow: 0 1px 0 rgba(255, 255, 255, .5)";
      }
    }
  },
  // 挂载结束
  mounted: function() {
    this.getOrgan();
  },
  // 创建完毕状态
  created() {},
  // 组件更新
  updated: function() {}
};
</script>
