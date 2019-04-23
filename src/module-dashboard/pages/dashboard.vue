<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="6"
        :span="6"
      >
        <el-card class="box-card">
          <div class="header">
            <span>基坑项目数量</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="项目说明"
              placement="top"
            >
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="total">
            <span>{{proNumber}}</span>
          </div>
          <div class="trends">
            <span>一级基坑 {{proSafe1}}
              <i class="el-icon-caret-top"></i>
            </span>
            <span>二级基坑 {{proSafe2}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <span>三级基坑 {{proSafe3}}
              <i class="el-icon-caret-top"></i>
            </span>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>在建基坑 <i
                style="color:green;"
                class="el-icon-success"
              ></i>
              {{probuildNumber}}
            </span>
            <span>准备施工基坑 <i
                style="color:red;"
                class="el-icon-loading"
              ></i>
              {{unProbuildNumber}}
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="6"
        :span="6"
      >
        <el-card class="box-card">
          <div class="header">
            <span>报警统计</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="报警说明"
              placement="top"
            >
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
      <el-col
        :xs="24"
        :sm="6"
        :span="6"
      >
        <el-card class="box-card">
          <div class="header">
            <span>合同工作量</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="说明"
              placement="top"
            >
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
      <el-col
        :xs="24"
        :sm="6"
        :span="6"
      >
        <el-card class="box-card-right">
          <div class="marquee">
            <div class="marquee_title">
              <span>合同&#12288</span>
            </div>
            <div class="rightPic" />
            <div class="marquee_box">
              <ul
                class="marquee_list"
                :class="{marquee_top:animate}"
              >
                <li v-for="(item, index) in marqueeList">
                  <span>{{item.name}}</span>
                  <span class="red"> {{item.city}}</span>
                  <span>还剩</span>
                  <span class="red"> {{item.amount}}</span>
                  <span>天</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="marquee">
            <div class="marquee_title">
              <span>预警&#12288</span>
            </div>
            <div class="rightPic" />
            <div class="marquee_box">
              <ul
                class="marquee_list"
                :class="{marquee_middle:animate}"
              >
                <li v-for="(item, index) in warnList">
                  <span>{{item.name}}</span>
                  <span class="red"> {{item.city}}</span>
                  <span> {{item.amount}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="marquee">
            <div class="marquee_title">
              <span>工作量</span>
            </div>
            <div class="rightPic" />
            <div class="marquee_box">
              <ul
                class="marquee_list"
                :class="{marquee_bottom:animate}"
              >
                <li v-for="(item, index) in pointList">
                  <span>{{item.name}}</span>
                  <span class="red"> {{item.city}}</span>
                  <span class="red"> {{item.amount}}</span>
                </li>
              </ul>
            </div>
          </div>
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
import { projectList } from "@/api/base/project";
import { getToken } from "@/utils/auth";
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
      token: getToken(),
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
      radioArea: "全渠道",
      proNumber: "",
      probuildNumber: "", //在建基坑数量
      unProbuildNumber: "", //准备施工基坑数量
      proSafe1: "", //一级基坑安全个数
      proSafe2: "",
      proSafe3: "",
      animate: false,
      marqueeList: [
        {
          name: "距离",
          city: "合同终止日期",
          amount: ""
        }
      ],
      warnList: [
        {
          name: "暂无",
          city: "预警",
          amount: "情况"
        }
      ],
      pointList: [
        {
          name: "实测",
          city: "点数：",
          amount: ""
        }
      ]
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type.name];
    },
    getList(params) {
      debugger;
      var pro1 = [],
        pro2 = [],
        pro3 = [],
        buildPro = [],
        unbuildPro = [];
      projectList({ token: this.token }).then(res => {
        this.proNumber = res.data.length;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].constructionState != 0) {
            buildPro.push(res.data[i]);
          } else if (res.data[i].constructionState == 0) {
            unbuildPro.push(res.data[i]);
          }
          if (res.data[i].safetyClass == 1) {
            pro1.push(res.data[i]);
          } else if (res.data[i].safetyClass == 2) {
            pro2.push(res.data[i]);
          } else if (res.data[i].safetyClass == 3) {
            pro3.push(res.data[i]);
          }
        }
        this.probuildNumber = buildPro.length;
        this.unProbuildNumber = unbuildPro.length;
        this.proSafe1 = pro1.length;
        this.proSafe2 = pro2.length;
        this.proSafe3 = pro3.length;
      });
    },
    showMarquee: function() {
      this.animate = true;
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0]);
        this.marqueeList.shift();
        this.animate = false;
      }, 500);
    }
  },
  computed: {},
  created() {
    this.getList();
    setInterval(this.showMarquee, 2000);
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
    margin-right: -15px;
    .header {
      margin: -15px -10px 0 -12px;
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
      margin: 5px;
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
  .box-card-right {
    min-height: 120px;
    div,
    ul,
    li,
    span,
    img {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .marquee {
      width: 105%;
      height: 25px;
      margin: 8px 0 11px -5px;
      align-items: center;
      color: #3a3a3a;
      background-color: #23a0e8;
      display: flex;
      box-sizing: border-box;
      border-radius: 20px;
      border-top: 0.5px solid #d8d8d8;
      border-bottom: 0.5px solid #d8d8d8;
    }
    .marquee_title {
      padding: 0 10px;
      height: 25px;
      font-size: 12px;
      line-height: 25px;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      font-family: Calibri, Tahoma;
      align-items: center;
    }
    .rightPic {
      background: url("./../assets/images/right-flc-w.png") no-repeat right
        center;
      width: 20px;
      height: 25px;
      border-top: 0.5px solid #d8d8d8;
      border-bottom: 0.5px solid #d8d8d8;
    }

    .marquee_box {
      display: block;
      position: relative;
      width: 66%;
      height: 25px;
      overflow: hidden;
      border-top: 0.5px solid #d8d8d8;
      border-bottom: 0.5px solid #d8d8d8;
      background-color: #fff;
    }

    .marquee_list {
      width:100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
    .marquee_top {
      transition: all 0.5s;
      margin-top: -20px;
    }
    .marquee_middle {
      transition: all 0.5s;
      margin-top: -20px;
    }
    .marquee_bottom {
      transition: all 0.5s;
      margin-top: -20px;
    }
    .marquee_list li {
      height: 20px;
      line-height: 20px;
      font-size: 10px;
      padding-left: 5px;
    }

    .red {
      color: #ff0101;
    }
  }
  // 线上热门搜索
  .hots {
    position: relative;
    margin-top: -18px;
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
    margin-right: -12px;
    .header {
      margin: -15px -10px 0 -12px;
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
  .box-card-right {
    min-height: 210px;
    div,
    ul,
    li,
    span,
    img {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .marquee {
      width: 105%;
      height: 30px;
      margin: 10px 0 20px -10px;
      align-items: center;
      color: #3a3a3a;
      background-color: #23a0e8;
      display: flex;
      box-sizing: border-box;
      border-radius: 20px;
      border-top: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
    }
    .marquee_title {
      padding: 0 15px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      font-family: Calibri, Tahoma;
      align-items: center;
    }
    .rightPic {
      background: url("./../assets/images/right-flc-w.png") no-repeat right
        center;
      width: 20px;
      height: 30px;
      border-top: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
    }

    .marquee_box {
      display: block;
      position: relative;
      width: 70%;
      height: 30px;
      overflow: hidden;
      border-top: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
      background-color: #fff;
    }

    .marquee_list {
      width:100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
    .marquee_top {
      transition: all 0.5s;
      margin-top: -30px;
    }
    .marquee_middle {
      transition: all 0.5s;
      margin-top: -20px;
    }
    .marquee_bottom {
      transition: all 0.5s;
      margin-top: -20px;
    }
    .marquee_list li {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      padding-left: 10px;
    }
    .red {
      color: #ff0101;
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
