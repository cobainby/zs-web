<template>
  <div class="app-container">
    <header>日报导出日志</header>
    <el-card
      class="box-card"
      shadow="hover"
    >
      <el-table
        :default-sort="{prop:'reportNo'}"
        :header-cell-style="tableHeaderStyle"
        :data="dailyData"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        style="width: 100%"
        border
      >
        <el-table-column
          align="center"
          label="报告期数"
          prop="reportNo"
          :show-overflow-tooltip="true"
          sortable
        >
          <template slot-scope="scope">
            <span>{{scope.row.reportNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报告日期"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.reportDate| dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报告文件地址"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <a
              :href="scope.row.reportPath"
              target="_blank"
              class="buttonText"
            >{{scope.row.reportPath}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报告生成人"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{scope.row.userId}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="width:100%;margin:5px 0;"
        round
      >日报导出</el-button>
      <section>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          :rules="ruleInline"
        >
          <el-form-item
            label="日报大标题"
            prop="dailyTitle"
          >
            <el-input v-model="form.dailyTitle"></el-input>
          </el-form-item>
          <el-form-item
            label="隶属标段"
            prop="superviseCode"
          >
            <el-input v-model="form.superviseCode"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item
            label="日报名称"
            prop="dailyName"
          >
            <el-input v-model="form.dailyName"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item
            label="日报期数"
            prop="dailyPeriods"
          >
            <el-input-number
              v-model="form.dailyPeriods"
              controls-position="right"
              :min="1"
              :max="1000"
            ></el-input-number>
          </el-form-item>
          </el-form-item>
          <el-form-item
            label="施工进度"
            prop="constructionProgress"
          >
            <el-input
              type="textarea"
              v-model="form.constructionProgress"
            ></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item
            label="巡视情况"
            prop="patrolSituation"
          >
            <el-input
              type="textarea"
              v-model="form.patrolSituation"
            ></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item
            label="监测点情况"
            prop="pointsSituation"
          >
            <el-input
              type="textarea"
              v-model="form.pointsSituation"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="监测结论"
            prop="monitorConclusion"
          >
            <el-input
              type="textarea"
              v-model="form.monitorConclusion"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="监测建议"
            prop="monitorAdvice"
          >
            <el-input
              type="textarea"
              v-model="form.monitorAdvice"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="exportDaily('form')"
            >配置完成并导出</el-button>
            <el-button @click="resetForm('form')">重置配置项</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-card>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { dailyExport, dailyList } from "@/api/base/chartData";
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { getFdSet } from "@/api/base/project";
import {
  getHorizontal,
  getVertical,
  getWater,
  getCliPointNumbers,
  getClinometer,
  getForce,
  getQx,
  getLf
} from "@/api/base/project";
export default {
  name: "dailyReport",
  data() {
    return {
      projectUuid: "",
      token: getToken(),
      timeSeries: [], //横轴的时间数据
      accumVarySeries: [], //曲线图累计变化量的数据
      dailyData: [],
      listLoading: true,
      form: {
        dailyTitle: "",
        superviseCode: "",
        dailyName: "",
        dailyPeriods: "",
        constructionProgress: "",
        patrolSituation: "",
        pointsSituation: "",
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
        return "background-color:#FDA430;color: #ffffff;text-align:center;";
      }
    },
    init() {
      debugger;
      dailyList({
        projectUuid: this.$route.query.id,
        token: this.token
      }).then(res => {
        if (res.data.result == 1) {
          this.dailyData = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: "res.data.message"
          });
        }
        this.listLoading = false;
      });
    },
    //导出报表
    exportDaily(form) {
      debugger;
      this.$refs[form].validate(valid => {
        if (valid) {
          var dailyParams = new Object();
          let data = {
            ...this.form
          };
          let gzcImgData = this.$store.getters.gzcImgData;
          let swImgData = this.$store.getters.swImgData;
          let tzcImgData = this.$store.getters.tzcImgData;
          let wydImgData = this.$store.getters.wydImgData;
          console.log(wydImgData);
          let msImgData = this.$store.getters.msImgData;
          dailyParams.token = this.token;
          dailyParams.projectUuid = this.$route.query.id;
          dailyParams.data = data;
          for (let i = 0; i < this.dailyData.length; i++) {
            if (data.dailyPeriods == this.dailyData[i].reportNo) {
              this.$confirm("该期日报已存在，是否覆盖?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  dailyExport(dailyParams).then(res => {
                    if (res.data.result == 1) {
                      this.init();
                      this.$confirm(res.data.message, "提示", {
                        confirmButtonText: "确定",
                        showCancelButton: false,
                        type: "success",
                        callback: action => {
                          window.open(res.data.data);
                        }
                      });
                    } else {
                      this.$message({
                        type: "error",
                        message: "res.data.message"
                      });
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消覆盖"
                  });
                });
              break;
            }
          }
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
