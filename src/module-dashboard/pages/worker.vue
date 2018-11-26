<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-button class="filter-item fr" size="small" style="margin: -10px 0 10px 0;" @click="toAddWorker" type="primary" icon="el-icon-circle-plus-outline">增加人员</el-button>
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- 数据 -->
        <el-table :key='tableKey' :data="dataList" v-loading="listLoading" :header-cell-style="tableHeaderStyle" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
          <el-table-column align="center" width="80px" label="账户名称">
            <template slot-scope="scope">
              <span v-if="scope.row.accountName!=null">{{scope.row.accountName}}</span>
              <span v-if="scope.row.accountName==null">/</span>
            </template>
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
          <el-table-column align="center"  width="100px" label="权限角色">
            <template slot-scope="scope">
              <span v-if="scope.row.sysRole.name!=null">{{scope.row.sysRole.name}}</span>
              <span v-if="scope.row.sysRole.name==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px">
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
        <!-- 新增标签弹层 -->
        <component @refreshList="getList" v-bind:is="WorkerAdd" ref="editUser" :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
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
import axios from "axios";
export default {
  name: "base-worker",
  components: {
    PageTool,
    WorkerAdd
  },
  data() {
    return {
      WorkerAdd: "workerAdd",
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
    // 获取列表数据
    getList(page = 1, limit = 20) {
      this.listLoading = true;
      this.pagination.currentPage = page;
      this.pagination.pageSize = limit;
      this.alertText = "";
      this.dataList = [];
      var token = getToken();
      debugger;
      // list({page, limit})
      Institutes({
        token: token
      }).then(response => {
        const organData = response.data.data[0];
        var orgUuid = organData.orgUuid;
        this.formData.orgUuid = orgUuid;
        UserAccount({
          token: token,
          orguuid: orgUuid
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
      });
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
        roleCode: null
      };
    },
    toAddWorker() {
      this.query();
      this.text = "创建";
      this.$refs.editUser.dialogFormV();
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
      this.formData.password = params.accountName;
      this.formData.orgUuid = params.userInstitutes.orgUuid;
      this.formData.pid = params.pid;
      this.formData.email = params.email;
      this.formData.post = params.post;
      this.formData.mobilePhone = params.mobilePhone;
      this.formData.wechat = params.wechat;
      this.formData.numCertificate = params.numCertificate;
      this.formData.dateRegister = params.dateRegister;
      this.formData.dateValid = params.dateValid;
      this.formData.roleCode = params.sysRole.name;
    },
    //删除机构
    removeUser(accountUuid) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeAccount({ accountUuid, token: getToken() })
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
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.getList();
  },
  // 组件更新
  updated: function() {}
};
</script>
