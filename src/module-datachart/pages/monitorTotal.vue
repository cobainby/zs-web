<template>
  <div class="app-container">
    <header>监测情况统计表</header>
    <el-card
      class="box-card"
      shadow="hover"
      v-loading="loading"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>本次最大变化值</span>
      </div>
      <section>
        <el-table
          :data="singleMaxDatas"
          :row-style="tableRowStyle1"
          border
          :header-cell-style="tableHeaderStyle"
          style="width: 100%;"
        >
          <el-table-column
            align="center"
            label="监测项目"
            prop="monitorItemName"
            :show-overflow-tooltip="true"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="监测点编号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.pointName1==null">/</span>
              <span v-if="scope.row.pointName1!==null">{{scope.row.pointName1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="本次变化量"
            prop="singleChange"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="累计变化量"
            prop="totalChange"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="本次变形速率"
            prop="changeRate"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="控制值"
            prop="singleControl"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="是否预警"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.singleConclusion=='正常'">
                <img src="@/assets/green.png" /> 正常
              </span>
              <span v-if="scope.row.singleConclusion=='红色预警'">
                <img src="@/assets/red.gif" /> 红色预警
              </span>
              <span v-if="scope.row.singleConclusion=='橙色预警'">
                <img src="@/assets/purple.gif" /> 橙色预警
              </span>
              <span v-if="scope.row.singleConclusion=='黄色预警'">
                <img src="@/assets/yellow.gif" /> 黄色预警
              </span>
              <span v-if="scope.row.singleConclusion==null">
                /
              </span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
    <el-card
      class="box-card"
      shadow="hover"
      v-loading="loading"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>累计最大变化值</span>
      </div>
      <section>
        <el-table
          :data="totalMaxDatas"
          :row-style="tableRowStyle2"
          border
          :header-cell-style="tableHeaderStyle"
          style="width: 100%;"
        >
          <el-table-column
            align="center"
            label="监测项目"
            prop="monitorItemName"
            :show-overflow-tooltip="true"
            sortable
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="监测点编号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.pointName2==null">/</span>
              <span v-if="scope.row.pointName2!==null">{{scope.row.pointName2}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="本次变化量"
            prop="singleChange"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="累计变化量"
            prop="totalChange"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="本次变形速率"
            prop="changeRate"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="控制值"
            prop="totalControl"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="是否预警"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.totalConclusion=='正常'">
                <img src="@/assets/green.png" /> 正常
              </span>
              <span v-if="scope.row.totalConclusion=='红色预警'">
                <img src="@/assets/red.gif" /> 红色预警
              </span>
              <span v-if="scope.row.totalConclusion=='橙色预警'">
                <img src="@/assets/purple.gif" /> 橙色预警
              </span>
              <span v-if="scope.row.totalConclusion=='黄色预警'">
                <img src="@/assets/yellow.gif" /> 黄色预警
              </span>
              <span v-if="scope.row.totalConclusion==null">
                /
              </span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </div>
</template>
<script>
import { getMonitorTotal } from "@/api/base/chartData";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      projectUuid: "",
      token: getToken(),
      singleMaxDatas: [],
      totalMaxDatas: [],
      loading: true
    };
  },
  methods: {
    //修改table header的背景色和居中显示
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background-color:#FDA430;color: #ffffff;text-align:center;";
      }
    },
    init() {
      this.projectUuid = this.$route.query.id;
      debugger;
      getMonitorTotal({
        projectUuid: this.$route.query.id,
        token: this.token
      }).then(res => {
        this.singleMaxDatas = res.data.data[0];
        this.totalMaxDatas = res.data.data[1];
        this.loading = false;
      });
    },
    //表格table tr行的背景色
    tableRowStyle1({ row, rowIndex }) {
      if (row.singleConclusion == "红色预警") {
        return "background-color:#FF0000;opacity:0.8;";
      } else if (row.singleConclusion == "橙色预警") {
        return "background-color:#FF9900;opacity:0.8;";
      } else if (row.singleConclusion == "黄色预警") {
        return "background-color:#FFDD32;opacity:0.8;";
      }
    },
    tableRowStyle2({ row, rowIndex }) {
      if (row.totalConclusion == "红色预警") {
        return "background-color:#FF0000;opacity:0.8;";
      } else if (row.totalConclusion == "橙色预警") {
        return "background-color:#FF9900;opacity:0.8;";
      } else if (row.totalConclusion == "黄色预警") {
        return "background-color:#FFDD32;opacity:0.8;";
      }
    }
  },
  created() {},
  // 挂载结束
  mounted: function() {
    this.init();
  },
  watch: {
    $route: function(to, from) {
      // 通过监听跳转来重新刷新数据
      this.init();
    }
  }
};
</script>

<style type="text/css" scoped>
header {
  height: 40px;
  line-height: 40px;
  background-color: #fda430;
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: large;
  border-radius: 40px 40px 0 0;
}
.clearfix {
  text-align: center;
  font-weight: bold;
  margin: -10px 0;
}
</style>
