<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="6" :span="6">
        <el-card class="box-card">
          <div class="header">
            <span>基坑项目数量</span>
            <el-tooltip class="item" effect="dark" content="项目说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="total">
            6560
          </div>
          <div class="trends">
            <span>一级基坑 121
              <i class="el-icon-caret-top"></i>
            </span>
            <span>二级基坑 111
              <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>在建基坑</span>
            <span>383</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6" :span="6">
        <el-card class="box-card">
          <div class="header">
            <span>报警统计</span>
            <el-tooltip class="item" effect="dark" content="报警说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <pie-chart></pie-chart>
          </div>
          <!-- <div class="hr"></div>
          <div class="footer">
            <span>总数</span>
            <span>28</span>
          </div> -->
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6" :span="6">
        <el-card class="box-card">
          <div class="header">
            <span>待办事项</span>
            <el-tooltip class="item" effect="dark" content="待办事项说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <raddar-chart></raddar-chart>
          </div>
          <!-- <div class="hr"></div>
          <div class="footer">
            <span>办结率</span>
            <span>80%</span>
          </div> -->
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6" :span="6">
        <el-card class="box-card-right">
          <div class="header">
            <span>本人考勤次数</span>
            <el-tooltip class="item" effect="dark" content="本人考勤次数说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <bar-chart></bar-chart>
          </div>
          <!-- <div class="hr"></div>
          <div class="trends">
            <span>已考勤数 9
              <i class="el-icon-caret-top"></i>
            </span>
            <span>单位缺勤数 33
              <i class="el-icon-caret-top"></i>
            </span>
            <span>单位未处理 12
              <i class="el-icon-caret-bottom"></i>
            </span>
          </div> -->
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-card class="hots">
      <div class="chart">
        <Map></Map>
      </div>
    </el-card>
  </div>
</template>

<script>
import { hasPermissionPoint } from "@/utils/permission";
import LineChart from "./../components/dashboardLineChart";
import RaddarChart from "./../components/dashboardRaddarChart";
import PieChart from "./../components/dashboardPieChart";
import BarChart from "./../components/dashboardBarChart";
import Map from "./../components/dashboardMap";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "dashboard",
  components: {
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    Map
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      activeName: "newVisitis",
      datePicker: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      salesTable: [],
      hotsTableData: [],
      radioArea: "全渠道"
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type.name];
    }
  },
  computed: {},
  created() {
    for (let i = 1; i < 9; i++) {
      this.salesTable.push({
        num: i,
        title: `工专路 ${i} 号店`,
        val: "323,234"
      });
      this.hotsTableData.push({
        num: i,
        title: `搜索关键词-${i}`,
        users: Math.round(Math.random() * 500 + 300),
        increase: `${Math.round(Math.random() * 50 + 40)}%`
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin: 5px;
}
@media (min-width: 640px) and (max-width: 1399px) {
  .box-card {
    min-height: 120px;
    margin-right:-15px;
    .header {
      margin:-15px -10px 0 -12px;
      height: 10px;
      span {
        color: #97a8be;
        font-size: 11px;
      }
      .item {
        color: #97a8be;
        float: right;
        padding: 3px 0;
      }
    }
    // 总销售额
    .total {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
    .trends {
      height: 30px;
      font-size: 12px;
      span {
        display: inline;
        i {
          color: red;
        }
      }
      span:last-child {
        margin-left: 20px;
        display: inline;
        i {
          color: green;
        }
      }
    }
    .chart {
      height: 110px;
      margin:5px;
    }
    .hr {
      border-top: 1px solid #e8e8e8;
      margin: 0px 0px 5px 0px;
    }
    .footer {
      span {
        font-size: 12px;
        line-height: 22px;
      }
      span:last-child {
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .box-card-right{
    min-height: 120px;
    .header {
      margin:-15px -10px 0 -12px;
      height: 10px;
      span {
        color: #97a8be;
        font-size: 11px;
      }
      .item {
        color: #97a8be;
        float: right;
        padding: 3px 0;
      }
    }
    // 总销售额
    .total {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
    .trends {
      height: 30px;
      font-size: 12px;
      span {
        display: inline;
        i {
          color: red;
        }
      }
      span:last-child {
        margin-left: 20px;
        display: inline;
        i {
          color: green;
        }
      }
    }
    .chart {
      height: 110px;
      margin:5px;
    }
    .hr {
      border-top: 1px solid #e8e8e8;
      margin: 0px 0px 5px 0px;
    }
    .footer {
      span {
        font-size: 12px;
        line-height: 22px;
      }
      span:last-child {
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  // 线上热门搜索
  .hots {
    position: relative;
    margin-top:-18px;
    .header {
      color: #97a8be;
      .ops {
        position: absolute;
        right: 20px;
      }
    }
  }
}
@media (min-width: 1400px) {
  .box-card {
    min-height: 200px;
    margin-right:-12px;
    .header {
      margin:-15px -10px 0 -12px;
      height: 25px;
      span {
        color: #97a8be;
        font-size: 14px;
      }
      .item {
        color: #97a8be;
        float: right;
        padding: 3px 0;
      }
    }
    .total {
      font-size: 30px;
      height: 105px;
      line-height: 100px;
    }
    .trends {
      height: 22px;
      font-size: 14px;
      span {
        display: inline;
        i {
          color: red;
        }
      }
      span:last-child {
        margin-left: 20px;
        display: inline;
        i {
          color: green;
        }
      }
    }
    .chart {
      height: 160px;
    }
    .hr {
      border-top: 1px solid #e8e8e8;
      margin: 0px 0px 10px 0px;
    }
    .footer {
      span {
        font-size: 14px;
        line-height: 22px;
      }
      span:last-child {
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .box-card-right{
    min-height: "230px";
    .header {
      margin:-15px -10px 0 -12px;
      height: 25px;
      span {
        color: #97a8be;
        font-size: 14px;
      }
      .item {
        color: #97a8be;
        float: right;
        padding: 3px 0;
      }
    }
    
    .total {
      font-size: 30px;
      height: 140px;
      line-height: 100px;
    }
    .trends {
      height: 22px;
      font-size: 14px;
      span {
        display: inline;
        i {
          color: red;
        }
      }
      span:last-child {
        margin-left: 20px;
        display: inline;
        i {
          color: green;
        }
      }
    }
    .chart {
      height: 160px;
    }
    .hr {
      border-top: 1px solid #e8e8e8;
      margin: 0px 0px 10px 0px;
    }
    .footer {
      span {
        font-size: 14px;
        line-height: 22px;
      }
      span:last-child {
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  // 线上热门搜索
  .hots {
    position: relative;
    margin-top: -15px;
    .header {
      color: #97a8be;
      .ops {
        position: absolute;
        right: 20px;
      }
    }
  }
}
</style>
