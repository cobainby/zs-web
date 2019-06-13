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
        >
          <el-form-item label="日报大标题">
            <el-input v-model="form.dailyTitle"></el-input>
          </el-form-item>
          <el-form-item label="隶属标段">
            <el-input v-model="form.superviseCode"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="日报名称">
            <el-input v-model="form.dailyName"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="日报期数">
            <el-input v-model="form.dailyPeriods"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="施工进度">
            <el-input
              type="textarea"
              v-model="form.constructionProgress"
            ></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="巡视情况">
            <el-input
              type="textarea"
              v-model="form.patrolSituation"
            ></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="监测点情况">
            <el-input
              type="textarea"
              v-model="form.pointsSituation"
            ></el-input>
          </el-form-item>
          <el-form-item label="监测结论">
            <el-input
              type="textarea"
              v-model="form.monitorConclusion"
            ></el-input>
          </el-form-item>
          <el-form-item label="监测建议">
            <el-input
              type="textarea"
              v-model="form.monitorAdvice"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="exportDaily"
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
    exportDaily() {
      var dailyParams = new Object();
      var dailyData=new Object();
      dailyData=this.form;
      dailyParams.token = this.token;
      dailyParams.projectUuid = this.$route.query.id;
      dailyParams.data = dailyData;
      debugger;
      dailyExport(dailyParams).then(response => {
        if (response.data.result == 1) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getFdSetList();
        } else {
          this.$message({
            type: "warning",
            message: response.data.message
          });
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
