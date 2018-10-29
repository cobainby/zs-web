<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card shadow="never">
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- 数据 -->
        <el-table :key='tableKey' :data="dataList" fit highlight-current-row style="width: 100%" border>
          <el-table-column align="center" label="账户名称">
            <template slot-scope="scope">
              <span v-if="scope.row.accountName!=null">{{scope.row.accountName}}</span>
              <span v-if="scope.row.accountName==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="登录名">
            <template slot-scope="scope">
              <span v-if="scope.row.loginName!=null">{{scope.row.loginName}}</span>
              <span v-if="scope.row.loginName==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="身份证号码">
            <template slot-scope="scope">
              <span v-if="scope.row.pid!=null">{{scope.row.pid}}</span>
              <span v-if="scope.row.pid==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="邮箱">
            <template slot-scope="scope">
              <span v-if="scope.row.email!=null">{{scope.row.email}}</span>
              <span v-if="scope.row.email==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="工作岗位">
            <template slot-scope="scope">
              <span v-if="scope.row.email!=null">{{scope.row.post}}</span>
              <span v-if="scope.row.email==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号码">
            <template slot-scope="scope">
              <span v-if="scope.row.mobilePhone!=null">{{scope.row.mobilePhone}}</span>
              <span v-if="scope.row.mobilePhone==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="微信号">
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
              <span v-if="scope.row.dateRegister!=null">{{scope.row.dateRegister}}</span>
              <span v-if="scope.row.dateRegister==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="有效日期">
            <template slot-scope="scope">
              <span v-if="scope.row.dateValid!=null">{{scope.row.dateValid}}</span>
              <span v-if="scope.row.dateValid==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="权限角色">
            <template slot-scope="scope">
              <span v-if="scope.row.sysRole.name!=null">{{scope.row.sysRole.name}}</span>
              <span v-if="scope.row.sysRole.name==null">/</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-info" @click="handleUpdate(scope.row.id)">查看</el-button>
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="removeUser(scope.row.id)">修改</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleUpdate(scope.row.id)">删除</el-button>
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
// import { list } from '@/api/base/logs'
import PageTool from "./../components/pageTool";
import { UserAccount } from "@/api/base/work";
import { Institutes } from "@/api/base/organ";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "base-worker",
  components: {
    PageTool
  },
  data() {
    return {
      dataList: [],
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
      }
    };
  },
  computed: {},
  methods: {
    // 获取列表数据
    getList(page = 1, limit = 20) {
      this.listLoading = true;
      // list(this.requestParameters)
      //   .then(data => {
      //     this.dataList = data.data.list
      //     this.total = data.data.counts
      //     this.alertText = `共 ${this.total} 条记录`
      //     this.listLoading = false
      //   })
      //   .catch(e => {
      //     this.$message.e('错了哦，这是一条错误消息')
      //   })
      this.pagination.currentPage = page;
      this.pagination.pageSize = limit;
      this.loading = true;
      this.alertText = "";
      this.dataList = [];
      var token=getToken();
      debugger;
      // list({page, limit})
      Institutes({
        token:token
      }).then(response => {
        const organData = response.data.data[0];
        var orguuid = organData.orgUuid;
        UserAccount({
          token:token,
          orguuid: orguuid,
        }).then(res => {
          debugger;
          this.dataList = res.data.data;
          this.pagination.total = res.data.data.length;
          this.alertText = `共 ${this.pagination.total} 条记录`;
          this.loading = false;
        });
      });
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
