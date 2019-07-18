<template>
  <div class="dashboard-container users">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 搜索 -->
        <el-form
          :model="requestParameters"
          ref="requestParameters"
        >
          <div class="filter-container">
            <el-button
              class="filter-item fr"
              size="small"
              style="margin-left: 10px;"
              @click="getBack"
              type="primary"
              icon="el-icon-back"
            >返回首页</el-button>
            <el-button
              class="filter-item fr"
              size="small"
              style="margin-left: 10px;"
              @click="handleCreate"
              type="primary"
              icon="el-icon-edit"
            >新增项目</el-button>
            <el-button
              class="filter-item fr"
              size="small"
              style="margin-left: 10px;"
              @click="selectLonlat"
              type="primary"
              icon="el-icon-star-on"
            >路段划分</el-button>
          </div>
        </el-form>
        <el-alert
          v-if="alertText !== ''"
          :title="alertText"
          type="info"
          class="alert"
          :closable='false'
          show-icon
        ></el-alert>
        <!-- end -->
        <el-row :gutter="10">
          <!-- 数据 -->
          <el-col :span="18">
            <el-table
              :key='tableKey'
              :row-style="tableRowStyle"
              :default-sort="{prop:'projectName'}"
              :header-cell-style="tableHeaderStyle"
              @row-click="getData"
              :data="dataList"
              :row-class-name="rowClassStatus"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              fit
              highlight-current-row
              style="width: 100%"
              border
            >
              <el-table-column
                align="center"
                label="工程名称"
                prop="projectName"
                :show-overflow-tooltip="true"
                sortable
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="工程地址"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.projectLocation}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="80px"
                label="支护形式"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.supportingStructure}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="建设单位"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.proprietorOrg}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="100px"
                label="监督机构"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.supervisorOrg}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="80px"
                label="预警状态"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.warningGrade==0">正常</span>
                  <span v-if="scope.row.warningGrade==1">预警</span>
                  <span v-if="scope.row.warningGrade==2">报警</span>
                  <span v-if="scope.row.warningGrade==3">超限</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="230px"
                :label="$t('table.actions')"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    :disabled="scope.row.is_deleted===1"
                    type="success"
                    size="mini"
                    icon="el-icon-picture-outline"
                    @click="viewData(scope.row.projectUuid)"
                  >图表</el-button>
                  <el-button
                    :disabled="scope.row.is_deleted===1"
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    @click="handleUpdate(scope.row)"
                  >修改</el-button>
                  <el-button
                    :disabled="scope.row.is_deleted===1"
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="removeUser(scope.row.projectUuid)"
                  >删除</el-button>
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
            <el-table
              fit
              highlight-current-row
              style="width: 100%"
              border
            >
              <el-table-column
                align="center"
                label="监测项目"
              >
                <template slot-scope="scope">
                  <span>监测项目</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="安全状态"
              >
                <template slot-scope="scope">
                  <span>安全状态</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 分页 -->
        <div class="pagination">
          <PageTool
            :paginationPage="requestParameters.page"
            :paginationPagesize="requestParameters.pagesize"
            :total="total"
            @pageChange="handleCurrentChange"
            @pageSizeChange="handleSizeChange"
          >
          </PageTool>
        </div>
        <!-- end -->
        <!-- 新增标签弹层 -->
        <mu-dialog
          :open="dialogAdd"
          dialogClass="location-add-dialog"
          @close="closeAddLocation"
          @show="initMap"
        >
          <div class="dialog-title">
            标注经纬度
            <i
              class="material-icons close-icon"
              @click="closeAddLocation"
            >X</i>
          </div>
          <div class="dialog-content">
            <div class="clearfix">
              <div class="left-form">
                <div
                  class="form-group"
                  style="display:none"
                >
                  <label class="control-label">工程地址</label>
                  <input
                    type="text"
                    id="tipinput"
                    class="form-control"
                    v-model="addData.rtmp"
                    placeholder="工程地址"
                    autocomplete="off"
                  >
                </div>
                <div class="form-group">
                  <label
                    id="mapTips"
                    class="control-label"
                  >地图加载中.....</label>
                  <el-button
                    size="small"
                    @click="drawCheck"
                    type="success"
                    icon="el-icon-success"
                  >确定</el-button>
                  <!-- <el-button
                    size="small"
                    @click="drawBack"
                    type="primary"
                    icon="el-icon-edit"
                  >重绘</el-button> -->
                </div>
              </div>
              <div class="right-map">
                <div class="map-parent">
                  <div id="map"></div>
                </div>
                <div>注：选中项目，鼠标先选中项目，然后根据顺序进行连接,点击确定后选择的工程为同一线路</div>
              </div>
            </div>
          </div>
        </mu-dialog>
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
import {
  projectList,
  projectAdd,
  projectUpdate,
  projectRemove,
  addProjectOrder,
  getProjectOrder
} from "@/api/base/project";
import { detail } from "@/api/base/organ";
import PageTool from "./../components/pageTool";
import { getToken } from "@/utils/auth";
import axios from "axios";
/* eslint-disable no-undef */
const mapConfig = {
  center: [113.310846, 22.961402],
  zoom: 12,
  zooms: [3, 18]
};
export default {
  name: "base-itemList",
  components: {
    PageTool
  },
  data() {
    return {
      editType: null,
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
      token: getToken(),
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
      },
      iconUrl: "./../static/images/map/",
      size: new AMap.Size(17, 23),
      offset: new AMap.Pixel(-8, -23),
      options: {
        center: new AMap.LngLat(mapConfig.center[0], mapConfig.center[1]),
        zoom: mapConfig.zoom,
        zooms: mapConfig.zooms,
        animateEnable: true
      },
      dialogAdd: false,
      addData: {
        location_id: "", // 以萨卡口编号
        loc_id: "", // 厂商卡口编号
        text: "", // 点位名称
        lng: "", // 经度
        lat: "", // 纬度
        rtmp: "" // rtmp地址或rtsp地址
      },
      drawLineData: [], //画线的过程中实时存入的起始点和终止点数据，即一条路段的数据
      lineData: [], //每个路段的起始终止点
      proLineData: [], //所画的不同路段所有数据
      getLinePoint:[],//服务器拿到的线段数据
      accumUuid: "", //当前登录人的uuid
      markers: new Map() // 存储所有Marker点位的Map集合
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
    initMap() {
      let _this = this;
      let marker = null;
      _this.map = new AMap.Map("map", _this.options);
      _this.map.on("complete", function() {
        document.getElementById("mapTips").innerHTML = "地图图块加载完毕！";
      });
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
        _this.map.addControl(new AMap.ToolBar());
        _this.map.addControl(new AMap.Scale());
      });
      this.map.setFeatures(["bg", "building", "road", "point"]); // 多个种类要素显示
      _this.warningMarkerIds = [];
      let dataIdArr = [];
      let list = [];
      let data = this.dataList;
      list = data;
      data.forEach(function(item) {
        dataIdArr.push(item.projectUuid);
        _this.addMarker(item);
        _this.warningMarkerIds.push(item.projectUuid);
      });
      getProjectOrder({ token: this.token }).then(res => {
        var startPoint = "",
          endPoint = "";
        for (var i = 0; i < res.data.length; i++) {
          startPoint = res.data[i].startPoint;
          endPoint = res.data[i].endPoint;
          this.getLinePoint = [];
          this.getLinePoint.push(startPoint, endPoint);
          var polyline = new AMap.Polyline({
            path: this.getLinePoint, // 设置线覆盖物路径
            showDir: true,
            strokeColor: "#3366bb", // 线颜色
            strokeWeight: 6 // 线宽
          });
          this.map.add(polyline);
        }
      });
      this.map.setFitView();
    },
    closeAddLocation() {
      this.dialogAdd = false;
      //每次关闭弹窗时就销毁地图
      this.map.destroy();
    },
    addMarker(item) {
      if (item.projectLatLon != null) {
        let _this = this;
        let opts = {};
        let lon = item.projectLatLon.split(",")[0]; //经度
        let lat = item.projectLatLon.split(",")[1]; //维度
        opts.map = this.map;
        opts.icon = new AMap.Icon({
          image: this.iconUrl + "stop-markerh.png",
          size: new AMap.Size(30, 30)
        });
        opts.offset = new AMap.Pixel(-15, -15);
        let lnglat = new AMap.LngLat(parseFloat(lon), parseFloat(lat));
        if (lnglat) {
          opts.position = lnglat;
          opts.title = item.projectName;
          let marker = new AMap.Marker(opts);
          marker.projectUuid = item.projectUuid;
          marker.projectName = item.projectName;
          marker.warningGrade = item.warningGrade;
          this.markers.set(item.projectUuid, marker);
          marker.on(
            "click",
            function(e) {
              let _marker = e.target;
              var myIcon = new AMap.Icon();
              _marker.setIcon(myIcon);
              debugger;
              _this.drawLineData.push([lon, lat]);
              _this.lineData.push([lon, lat]);
              //把每个线段的起始终止点存为一个数组
              if (_this.lineData.length > 1) {
                for (var i = 0, len = _this.lineData.length; i < len; i += 1) {
                  _this.proLineData.push(_this.lineData.slice(i, i + 2));
                }
                console.log(_this.proLineData);
              }
              var polyline = new AMap.Polyline({
                path: _this.drawLineData, // 设置线覆盖物路径
                showDir: true,
                strokeColor: "#3366bb", // 线颜色
                strokeWeight: 5 // 线宽
              });
              _this.map.add(polyline);
            },
            marker
          );
        }
      }
    },
    drawCheck() {
      debugger;
      var projectParams = new Object();
      projectParams.token = this.token;
      projectParams.accumUuid = this.accumUuid;
      projectParams.data = this.proLineData;
      addProjectOrder(projectParams).then(res => {
        this.$message({
          type: "success",
          message: "绘制成功!"
        });
      });
    },
    drawBack() {
      this.drawLineData = [];
      this.map.remove();
    },
    // 获取列表数据/
    getList(params) {
      this.listLoading = true;
      debugger;
      // list(this.requestParameters)
      projectList({ token: this.token })
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
      this.editType = "新增";
      this.$router.push({
        path: "/projectAdd",
        name: "projectAdd",
        params: { editType: this.editType }
      });
    },
    //选择当前项目所属路段
    selectLonlat() {
      this.dialogAdd = true;
    },
    // 窗口操作**********************************
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editUser.dialogFormH();
    },
    //查看
    viewData(objectId) {
       // 先清空一次状态管理里的值
      this.$store.commit("SET_CXDATA",[]);
      this.$store.commit("SET_GZCDATA",[]);
      this.$store.commit("SET_LFDATA",[]);
      this.$store.commit("SET_MSDATA",[]);
      this.$store.commit("SET_QXDATA",[]);
      this.$store.commit("SET_SWDATA",[]);
      this.$store.commit("SET_TZCDATA",[]);
      this.$store.commit("SET_WYDDATA",[]);
      this.$store.commit("SET_WYSDATA",[]);
      this.$router.push({ path: "/dataInfo", query: { id: objectId } });
    },
    handleUpdate(object) {
      this.editType = "修改";
      this.$router.push({
        path: "/projectAdd",
        name: "projectAdd",
        params: { projectInfo: object, editType: this.editType }
      });
    },
    // 删除
    removeUser(projectUuid) {
      this.$confirm("此操作将永久删除该工程 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          debugger;
          projectRemove({ projectUuid, token: this.token })
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
  mounted: function() {
    detail({ token: this.token }).then(res => {
      this.accumUuid = res.data.userUuid;
    });
  },
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
