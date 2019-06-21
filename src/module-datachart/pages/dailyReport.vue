<template>
  <div class="app-container">
    <header>日报配置</header>
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
            <el-input v-model="form.dailyPeriods"></el-input>
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
