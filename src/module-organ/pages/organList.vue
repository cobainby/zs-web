<template>
  <!--监听子组件绑定的方法-->
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-button
          class="filter-item fr"
          size="small"
          style="margin: -10px 0 10px 0;"
          @click="toAddOrgan"
          type="primary"
          icon="el-icon-circle-plus-outline"
        >添加机构</el-button>
        <el-alert
          v-if="alertText !== ''"
          :title="alertText"
          type="info"
          class="alert"
          :closable='false'
          show-icon
        ></el-alert>
        <!-- 数据 -->
        <el-table
          :key='tableKey'
          :data="dataList"
          v-loading="listLoading"
          :default-sort="{prop:'orgName'}"
          :header-cell-style="tableHeaderStyle"
          element-loading-text="给我一点时间"
          fit
          highlight-current-row
          style="width: 100%"
          border
        >
          <el-table-column
            align="center"
            width="80px"
            label="机构名称"
            prop="orgName"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="机构地址"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orgAddress!=null">{{scope.row.orgAddress}}</span>
              <span v-if="scope.row.orgAddress==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="80px"
            label="联系人"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orgLinkman!=null">{{scope.row.orgLinkman}}</span>
              <span v-if="scope.row.orgLinkman==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100px"
            label="联系人电话"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orgLinkphone!=null">{{scope.row.orgLinkphone}}</span>
              <span v-if="scope.row.orgLinkphone==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100px"
            label="技术负责人"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.leaderTechnique!=null">{{scope.row.leaderTechnique}}</span>
              <span v-if="scope.row.leaderTechnique==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="检测资质证书编号"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.credentialsnumCheck!=null">{{scope.row.credentialsnumCheck}}</span>
              <span v-if="scope.row.credentialsnumCheck==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="计量认证证书编号"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.credentialsnumMeterage!=null">{{scope.row.credentialsnumMeterage}}</span>
              <span v-if="scope.row.credentialsnumMeterage==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100px"
            label="法定代表人"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.legalRepresentative!=null">{{scope.row.legalRepresentative}}</span>
              <span v-if="scope.row.legalRepresentative==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100px"
            label="机构类型"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type.name!=null">{{scope.row.type.name}}</span>
              <span v-if="scope.row.type.name==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="登记日期"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dateRegister!=null"> {{ scope.row.dateRegister | dateTimeFormat }}</span>
              <span v-if="scope.row.dateRegister==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="有效日期"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dateValid!=null">{{scope.row.dateValid| dateTimeFormat}}</span>
              <span v-if="scope.row.dateValid==null">/</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="300px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-info"
                @click="viewOrgan(scope.row)"
              >查看</el-button>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeOrgan(scope.row.orgUuid)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div class="pagination-container">
          <PageTool
            :paginationPage="pagination.page"
            :paginationPagesize="pagination.pageSize"
            :total="pagination.total"
            @pageChange="handleCurrentChange"
            @pageSizeChange="handleSizeChange"
          >
          </PageTool>
        </div>
        <!-- end -->
        <!-- 新增编辑标签弹层 -->
        <component
          @refreshList="getList"
          v-bind:is="OrganAdd"
          ref="editUser"
          :text='text'
          :pageTitle='pageTitle'
          :formBase='formData'
          :ruleInline='ruleInline'
          v-on:newDataes="handleLoadDataList"
          v-on:handleCloseModal="handleCloseModal"
        >
        </component>
        <!-- 新增查看标签弹层 -->
        <component
          @refreshList="getList"
          v-bind:is="OrganView"
          ref="viewUser"
          :text='text'
          :pageTitle='pageTitle'
          :formBase='formData'
        >
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
import { Institutes, remove } from "@/api/base/organ";
import { getToken } from "@/utils/auth";
import OrganAdd from "./../components/organAdd";
import OrganView from "./../components/organView";
import axios from "axios";
import { Message } from "element-ui";
export default {
  name: "base-organList",
  components: {
    PageTool,
    OrganAdd,
    OrganView
  },
  data() {
    return {
      OrganAdd: "organAdd",
      OrganView: "organView",
      pageTitle: "机构", // 页面标题
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
        orgUuid: "",
        orgCode: "",
        orgName: "",
        orgAddress: "",
        orgLinkman: "",
        orgLinkphone: "",
        leaderTechnique: "",
        credentialsnumCheck: "",
        credentialsnumMeterage: "",
        dateRegister: "",
        dateValid: "",
        type: {
          name: "",
          code: ""
        },
        typeCode:"",
        legalRepresentative: ""
      },
      ruleInline: {
        // 表单验证
        orgName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        dateRegister: [
          { required: true, message: "登记日期不能为空", trigger: "blur" }
        ],
        orgCode: [
          { required: true, message: "组织机构代码不能为空", trigger: "blur" }
        ],
        typeCode: [
          { required: true, message: "机构类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    // 获取列表数据
    getList(page = 1, limit = 10) {
      this.listLoading = true;
      this.pagination.currentPage = page;
      this.pagination.pageSize = limit;
      this.alertText = "";
      this.dataList = [];
      debugger;
      // list({page, limit})
      Institutes({ token: getToken() })
        .then(response => {
          debugger;
          this.dataList = response.data.data;
          this.pagination.total = response.data.data.length;
          this.alertText = `共 ${this.pagination.total} 条记录`;
          this.listLoading = false;
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "token失效！无法获取机构列表!"
          });
        });
    },
    //查看机构信息
    viewOrgan(params) {
      this.query();
      var _this = this;
      this.text = "查看";
      _this.hanldeEditForm(params);
      this.$refs.viewUser.dialogFormV();
    },
    //编辑机构信息
    handleUpdate(params) {
      this.query();
      var _this = this;
      this.text = "编辑";
      _this.hanldeEditForm(params);
      this.$refs.editUser.dialogFormV();
    },
    //加载详情
    hanldeEditForm(params) {
      debugger;
      this.formData.orgUuid = params.orgUuid;
      this.formData.orgCode = params.orgCode;
      this.formData.orgName = params.orgName;
      this.formData.orgAddress = params.orgAddress;
      this.formData.orgLinkman = params.orgLinkman;
      this.formData.orgLinkphone = params.orgLinkphone;
      this.formData.leaderTechnique = params.leaderTechnique;
      this.formData.credentialsnumCheck = params.credentialsnumCheck;
      this.formData.credentialsnumMeterage = params.credentialsnumMeterage;
      this.formData.dateRegister = params.dateRegister;
      this.formData.dateValid = params.dateValid;
      this.formData.legalRepresentative = params.legalRepresentative;
      this.formData.typeCode=params.type.name;
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
    // 新增后刷新列表
    handleLoadDataList() {
      this.getList();
    },
    // 搜索的项目
    query() {
      this.formData = {
        orgUuid: "default",
        orgCode: null,
        orgName: null,
        orgAddress: null,
        orgLinkman: null,
        orgLinkphone: null,
        leaderTechnique: null,
        credentialsnumCheck: null,
        credentialsnumMeterage: null,
        dateRegister: null,
        dateValid: null,
        type: {
          name: null,
          code: null
        },
        typeCode:"",
        legalRepresentative: null
      };
    },
    //添加机构
    toAddOrgan() {
      this.query();
      this.text = "创建";
      this.$refs.editUser.dialogFormV();
    },
    //删除机构
    removeOrgan(orgUuid) {
      this.$confirm("此操作将永久删除该机构, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          remove({ orgUuid, token: getToken() })
            .then(response => {
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              } else {
                this.$message({
                  type: "warning",
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
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editUser.dialogFormH();
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
