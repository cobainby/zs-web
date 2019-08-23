<template>
  <div class="app-container">
    <header>巡视列表</header>
    <el-card
      class="box-card"
      shadow="hover"
    >
      <div
        slot="header"
        class="clearfix"
      >
      </div>
      <section>
        <el-table
          :data="xsDatas"
          border
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderStyle"
          style="width: 100%;"
          :height="tableHeight"
        >
          <el-table-column
            align="center"
            label="巡视时间"
            :show-overflow-tooltip="false"
          >
            <template slot-scope="scope">
              <span>{{scope.row.patrolDate| dateTimeFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="报警状态"
            :show-overflow-tooltip="false"
            width="80px"
          >
            <template slot-scope="scope">
              <span>{{scope.row.warningStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="审核状态"
            :show-overflow-tooltip="false"
            width="80px"
          >
            <template slot-scope="scope">
              <span>{{scope.row.verifyStatus}}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="巡视内容"
            :show-overflow-tooltip="false"
          >
            <template slot-scope="scope">
              <span>{{scope.row.riskEvaluation}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="巡视人"
            :show-overflow-tooltip="false"
          >
            <template slot-scope="scope">
              <span>{{scope.row.patrolMan}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="坐标"
            :show-overflow-tooltip="false"
          >
            <template slot-scope="scope">
              <span>{{scope.row.locationGps}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="巡视图片"
            prop="surveyTime"
            :show-overflow-tooltip="false"
            sortable
          >
            <template slot-scope="scope">
              <img :src="scope.row.pictureUrl"  min-width="150" height="150" />
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { fdPatrolList } from "@/api/base/chartData";

export default {
  data() {
    return {
      projectUuid: "",
      token: getToken(),
      xsDatas:[]
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
      debugger;
      fdPatrolList({
        projectUuid: this.$route.query.id,
        token: this.token
      }).then(res => {
        if (res.data.result == 1) {
          this.xsDatas = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "res.data.message"
          });
        }
        this.listLoading = false;
      });
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
  background-color: #fff;
  color: #000;
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
