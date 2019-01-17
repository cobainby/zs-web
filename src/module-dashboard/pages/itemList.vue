<template>
  <div class="dashboard-container users">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 搜索 -->
        <el-form :model="requestParameters" ref="requestParameters">
          <div class="filter-container">
            <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="getBack" type="primary" icon="el-icon-back">返回首页</el-button>
            <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增项目</el-button>
          </div>
        </el-form>
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- end -->
        <el-row :gutter="10">
          <!-- 数据 -->
          <el-col :span="18">
            <el-table :key='tableKey' :row-style="tableRowStyle" :header-cell-style="tableHeaderStyle" @row-click="getData" :data="dataList" :row-class-name="rowClassStatus" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
              <el-table-column align="center" label="工程名称" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="工程地址" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.projectLocation}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="80px" label="支护形式" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.supportingStructure}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="建设单位" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.proprietorOrg}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  width="100px" label="监督机构" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span>{{scope.row.supervisorOrg}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="80px"  label="预警状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.warningGrade==0">正常</span>
                  <span v-if="scope.row.warningGrade==1">预警</span>
                  <span v-if="scope.row.warningGrade==2">报警</span>
                  <span v-if="scope.row.warningGrade==3">超限</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  width="230px" :label="$t('table.actions')" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.is_deleted===1" type="success" size="mini" icon="el-icon-picture-outline" @click="viewData(scope.row.projectUuid)">图表</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" type="danger" size="mini" icon="el-icon-delete"  @click="removeUser(scope.row.projectUuid)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!-- end -->
          <el-col :span="6">
            <table align="center">
              <tr>
                <td>
                  <div>
                    <div style="float: left; width: 15px;">
                      <img src="@/assets/green.png" /></div>
                    <div style="float: left; width: 65px; height: 20px; line-height: 20px;">
                      正常</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div style="float: left; width: 15px;">
                      <img src="@/assets/yellow.gif" /></div>
                    <div style="float: left; width: 100px; height: 20px; line-height: 20px;">
                      超报警值</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div style="float: left; width: 15px;">
                      <img src="@/assets/red.gif" /></div>
                    <div style="float: left; width: 100px; height: 20px; line-height: 20px;">
                      超控制值
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <el-table fit highlight-current-row style="width: 100%" border>
              <el-table-column align="center" label="监测项目">
                <template slot-scope="scope">
                  <span>监测项目</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  label="安全状态">
                <template slot-scope="scope">
                  <span>安全状态</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 分页 -->
        <div class="pagination">
          <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
          </PageTool>
        </div>
        <!-- end -->
        <!-- 新增标签弹层 -->
        <component v-bind:is="UserAdd" ref="editUser" :formData.sync='requestParameters' :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline'  v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
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
import { simple } from "@/api/base/permissions";
import { projectList,projectAdd,projectUpdate,projectRemove} from "@/api/base/project";
import PageTool from "./../components/pageTool";
import UserAdd from "./../components/userAdd";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "base-itemList",
  components: {
    UserAdd,
    PageTool,
  },
  data() {
    return {
      editType:null,
      UserAdd: "userAdd",
      pageTitle: "工程", // 页面标题
      text: "", // 新增、编辑文本
      tableKey: 0,
      deletedDate: false,
      showDate: true,
      dataList: [],
      total: null,
      listLoading: true,
      dialogStatus: "",
      alertText: "",
      token:getToken(),
      requestParameters: {
        page: 1,
        pagesize: 10,
        username: this.username
      },
      formData: {
        email: "",
        phone: "",
        username: "",
        password: "",
        permission_group_id: "",
        permission_group_title: "",
        avatar: "",
        introduction: ""
      },
      ruleInline: {
        // 表单验证
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        // password: [
        //   { required: true, message: '密码不能为空', trigger: 'blur' }
        // ],
        permission_group_id: [
          {
            type: "number",
            required: true,
            message: "权限组名称不能为空",
            trigger: "blur"
          }
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
    // 获取列表数据/
    getList(params) {
      this.listLoading = true;
      debugger;
      // list(this.requestParameters)
      projectList({token:this.token})
        .then(res => {
          this.dataList = res.data;
          this.total = this.dataList.length;
          this.alertText = `共 ${this.total} 条记录`;
          this.listLoading = false;
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "token失效！无法获取工程列表!"
          });
        });
    },
    getData(row, event, column) {},
    // 重置
    resetForm() {
      this.$refs["requestParameters"].resetFields();
    },
    // 搜索信息
    handleFilter() {
      this.requestParameters.page = 1;
      this.getList(this.requestParameters);
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.requestParameters.pagesize = val;
      if (this.requestParameters.page === 1) {
        this.getList(this.requestParameters);
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val;
      this.getList();
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.getList();
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
    // 搜索的项目
    query() {
      this.formData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        permission_group_id: "",
        avatar: "",
        introduction: ""
      };
    },
    // 新增用户
    handleCreate() {
      this.editType="新增";
      this.$router.push({
        path: "/projectAdd",
        name: "projectAdd",
        params:{editType:this.editType}
      });
    },
    // 窗口操作**********************************
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editUser.dialogFormH();
    },
    // 编辑
    // 表单详情数据加载
    hanldeEditForm(objeditId) {
      this.formData.id = objeditId;
      detail({ id: objeditId }).then((data, err) => {
        var datalist = data.data;
        if (err) {
          return err;
        }
        this.formData.id = datalist.id;
        this.formData.email = datalist.email;
        this.formData.phone = datalist.phone;
        this.formData.username = datalist.username;
        this.formData.password = "";
        this.formData.avatar = datalist.avatar;
        this.formData.introduction = datalist.introduction;
        this.formData.permission_group_id = datalist.permission_group_id;
        this.formData.permission_group_title = datalist.permission_group_title;
      });
    },
    //查看
    viewData(objectId){
      this.$router.push({ path: "/dataInfo",query:{id:objectId} });
    },
    handleUpdate(object) {
      this.editType="修改";
      this.$router.push({
        path: "/projectAdd",
        name: "projectAdd",
        params: { projectInfo: object,editType:this.editType }
      });
    },
    // 删除
    removeUser(projectUuid) {
      this.$confirm("此操作将永久删除该工程 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          debugger
          projectRemove({projectUuid,token:this.token })
            .then(response => {
              this.$message.success("成功删除了工程" + "!");
              this.getList(this.requestParameters);
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
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.getList();
    // 键盘enter操作
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key === 13) {
        lett.handleFilter(this.requestParameters);
      }
    };
  },
  // 组件更新
  updated: function() {}
};
</script>
