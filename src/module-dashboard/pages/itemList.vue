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
            <el-table :key='tableKey' :data="dataList" :row-class-name="rowClassStatus" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
              <el-table-column align="center" label="工程ID" width="50px">
                <template slot-scope="scope">
                  <span >{{scope.row.projectUuid}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="经度">
                <template slot-scope="scope">
                  <span>{{scope.row.lon}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="维度">
                <template slot-scope="scope">
                  <span>{{scope.row.lat}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="工程名称" width="180px">
                <template slot-scope="scope">
                  <span>{{scope.row.projectName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="工程地址" width="120px">
                <template slot-scope="scope">
                  <span>工程地址</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="工程类别">
                <template slot-scope="scope">
                  <span>基坑</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="建设单位">
                <template slot-scope="scope">
                  <span>建设管理服务中心</span>
                </template>
              </el-table-column>
              <!-- 头像 -->
              <el-table-column align="center" label="监测平面图">
                <template slot-scope="scope">
                  <img :src="scope.row.avatar" style="width:50px;height:50px;">
                </template>
              </el-table-column> -->
              <el-table-column align="center" width="250px" label="监督机构">
                <template slot-scope="scope">
                  <span>监督站</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('table.actions')" width="150px" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.is_deleted===1" type="primary" size="mini" @click="handleUpdate(scope.row.id)">修改</el-button>
                  <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger" @click="removeUser(scope.row.id)">{{$t('table.delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!-- end -->
          <el-col :span="6">
            <el-table fit highlight-current-row style="width: 100%" border>
              <el-table-column align="center" label="监测项目">
                <template slot-scope="scope">
                  <span>监测项目</span>
                </template>
              </el-table-column>
              <el-table-column label="安全状态">
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
        <component v-bind:is="UserAdd" ref="editUser" :formData.sync='requestParameters' :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline' :PermissionGroupsList='PermissionGroupsList' v-on:newDataes="handleLoadDataList" v-on:handleCloseModal="handleCloseModal">
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
import { list, remove, detail, update, add } from "@/api/base/users";
import PageTool from "./../components/pageTool";
import UserAdd from "./../components/userAdd";
import axios from "axios"
export default {
  name: "base-itemList",
  components: {
    UserAdd,
    PageTool
  },
  data() {
    return {
      UserAdd: "userAdd",
      pageTitle: "工程", // 页面标题
      text: "", // 新增、编辑文本
      tableKey: 0,
      deletedDate: false,
      showDate: true,
      dataList: [],
      PermissionGroupsList: [], // 权限组加载
      total: null,
      listLoading: true,
      dialogStatus: "",
      alertText: "",
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
    // 获取列表数据
    getList(params) {
      this.listLoading = true;
      debugger
      // list(this.requestParameters)
      axios.get("http://192.168.1.13:8181/static/projectList.json")
        .then(data => {
          this.dataList = data.data.rows;
          this.total = data.data.total;
          this.alertText = `共 ${this.total} 条记录`;
          this.listLoading = false;
        })
        .catch(e => {
          // this.$message.e("错了哦，这是一条错误消息");
        });
    },
    // 权限列表
    setupData() {
      // simple().then(data => {
      //   this.PermissionGroupsList = data.data;
      // });原来代码
      axios
        .get("http://192.168.1.13:8181/static/permissions.json")
        .then(data => {
          this.PermissionGroupsList = data.data.list
        })
    },
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
      this.query();
      this.text = "创建";
      this.$refs.editUser.dialogFormV();
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
    handleUpdate(objeditId) {
      // this.query()
      // var _this = this
      // this.text = '编辑'
      // this.$refs.editUser.dialogFormV()
      // _this.hanldeEditForm(objeditId)
      //传递当前项目id
      this.$router.push({
        path: "/projectChange",
        name:'projectChange',
        params: { projectId: objeditId }
      });
    },
    // 删除
    removeUser(user) {
      this.$confirm("此操作将永久删除用户 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          remove({ id: user })
            .then(response => {
              this.$message.success("成功删除了用户" + "!");
              this.dataList.splice(user, 1);
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
    this.setupData();
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
