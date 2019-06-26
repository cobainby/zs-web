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
          :data="selectDatas"
          border
          :row-style="tableRowStyle"
          :default-sort="{prop:'surveyTime', order: 'descending'}"
          :header-cell-style="tableHeaderStyle"
          style="width: 100%;"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            label="所属项目"
            prop="pointCode"
            :show-overflow-tooltip="true"
            sortable
          >
          </el-table-column>
          <!-- <el-table-column
                align="center"
                label="支撑类型"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.forceType==0">锚索内力</span>
                  <span v-if="scope.row.forceType==1">钢支撑内力</span>
                  <span v-if="scope.row.forceType==2">硂支撑内力</span>
                </template>
              </el-table-column> -->
          <el-table-column
            align="center"
            label="巡视时间"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.calValue}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="报警状态"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.moduleData}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="审核状态"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.lastVary}}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="巡视内容"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.rateVary}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="巡视人"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.accumVary}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="工程进度说明"
            prop="surveyTime"
            :show-overflow-tooltip="true"
            sortable
          >
            <template slot-scope="scope">
              <span v-if="scope.row.surveyTime!=null">{{scope.row.surveyTime|dateTimeFormat}}</span>
              <span v-if="scope.row.surveyTime==null"></span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { dailyExport } from "@/api/base/chartData";

export default {
  data() {
    return {
      projectUuid: "",
      token: getToken(),
      form: {
        dailyTitle: "",
        superviseCode: "",
        dailyName: "",
        dailyPeriods: "",
        constructionProgress: "",
        patrolSituation: [],
        monitorConclusion: "",
        monitorAdvice: ""
      },
      ruleInline: {
        // 表单验证
        dailyTitle: [
          { required: true, message: "日报大标题不能为空", trigger: "blur" }
        ],
        superviseCode: [
          { required: true, message: "隶属标段不能为空", trigger: "blur" }
        ],
        dailyName: [
          { required: true, message: "日报名称不能为空", trigger: "blur" }
        ],
        dailyPeriods: [
          { required: true, message: "日报期数不能为空", trigger: "blur" }
        ],
        constructionProgress: [
          { required: true, message: "施工进度不能为空", trigger: "blur" }
        ],
        patrolSituation: [
          { required: true, message: "巡视情况不能为空", trigger: "blur" }
        ],
        pointsSituation: [
          { required: true, message: "监测点情况不能为空", trigger: "blur" }
        ],
        monitorConclusion: [
          { required: true, message: "监测结论不能为空", trigger: "blur" }
        ],
        monitorAdvice: [
          { required: true, message: "监测建议不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //修改table header的背景色和居中显示
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background-color:#FFDCA9;color: #000000;text-align:center;";
      }
    },
    init() {},
    //导出报表
    exportDaily(form) {
      debugger;
      this.$refs[form].validate(valid => {
        if (valid) {
          var dailyParams = new Object();
          var dailyData = new Object();
          let data = {
            ...this.form
          };
          dailyParams.token = this.token;
          dailyParams.projectUuid = this.$route.query.id;
          dailyParams.data = data;
          dailyExport(dailyParams).then(res => {
            if (res.data.result == 1) {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "打开报表？",
                type: "success",
                callback: action => {
                  window.open(res.data.data);
                }
              }).catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消"
                });
              });
            } else {
              this.$message({
                type: "danger",
                message: "res.data.message"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
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
