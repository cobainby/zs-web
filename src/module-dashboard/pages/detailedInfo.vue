<template>
  <div class="container">
    <div class="top">
      <div class="topleft">
        <a href="main.html" target="_parent"><img src="../../../static/images/logo.png" title="系统首页" /></a>
      </div>
      <ul class="nav">
        <li>
          <a target="rightFrame" class="selected"><img src="../../../static/images/icon01.png" title="项目信息" />
            <h2>项目信息</h2>
          </a>
        </li>
        <li>
          <a target="rightFrame"><img src="../../../static/images/icon02.png" title="监测方案" />
            <h2>监测方案</h2>
          </a>
        </li>
        <li>
          <a target="rightFrame"><img src="../../../static/images/icon03.png" title="监测平面图" />
            <h2>监测平面图</h2>
          </a>
        </li>
        <li>
          <a target="rightFrame"><img src="../../../static/images/icon14.png" title="监测工作量" />
            <h2>监测工作量</h2>
          </a>
        </li>
        <li>
          <a target="rightFrame"><img src="../../../static/images/icon05.png" title="日报导出" />
            <h2>日报导出</h2>
          </a>
        </li>
        <li>
          <a target="rightFrame"><img src="../../../static/images/icon07.png" title="周报导出" />
            <h2>周报导出</h2>
          </a>
        </li>
      </ul>

      <div class="topright">
        <ul>
          <li>
            <span><img src="../../../static/images/help.png" title="帮助" class="helpimg" /></span>
            <a href="#">帮助</a>
          </li>
          <li>
            <a href="#">关于</a>
          </li>
          <li>
            <a href="/" target="_parent">首页</a>
          </li>
        </ul>
        <div class="user">
          <span>admin</span>
          <i>消息</i>
          <b>5</b>
        </div>
      </div>
    </div>
    <div class="main">
      <form id="viewprojectForm" style="height:100%;overflow:auto;">
        <table id="tableHeader" cellpadding="0" cellspacing="0">
          <tr>
            <th>
              详细信息
            </th>
          </tr>
        </table>
        <table class="tableEditDetail" style="height:50%;" id="projectInfo" cellpadding="0" cellspacing="1">
          <tr>
            <th style="width: 15%;">
              工程编号
            </th>
            <td style="width: 35%">
              <label name="viewcode" id="viewcode"></label>
            </td>
            <th style="width: 15%">
              监督编号
            </th>
            <td>
              <label id="viewsuperviseCode"></label>
            </td>
          </tr>
          <tr>
            <th style="width: 15%">
              工程名称
            </th>
            <td>
              <label id="viewprojectName"></label>
            </td>
            <th>
              工程地址
            </th>
            <td>
              <label id="viewaddress"></label>
            </td>
          </tr>
          <tr>
            <th>
              工程类别
            </th>
            <td>
              <label id="viewprojectType" style="height:20px;"></label>
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <th>
              支护形式
            </th>
            <td>
              <label id="viewstructure"></label>
            </td>
            <th>
              安全等级
            </th>
            <td>
              <label id="viewsafeLevel" style="height:20px;"></label>
            </td>
          </tr>
          <tr>
            <th>
              基坑设计深度
            </th>
            <td>
              <label id="viewdeep"></label>
            </td>
            <th>
              基坑周长:
            </th>
            <td>
              <label id="viewperimeter"></label>
            </td>
          </tr>
          <tr>
            <th>
              监测负责人
            </th>
            <td colspan="1">
              <label id="viewmonitorLeader"></label>
            </td>
            <th>
              监测人员
            </th>
            <td colspan="1">
              <label id="viewmonitorWorker"></label>
            </td>
          </tr>
          <tr>
            <th>
              安全监督单位
            </th>
            <td colspan="1">
              <label id="viewsuperviseCompany" style="height:20px;width:98%;"></label>
            </td>
            <th>
              监督人员
            </th>
            <td colspan="1">
              <label id="viewsuperviseWorker"></label>
            </td>
          </tr>
        </table>
        <table class="tableEditDetail" id="projectInfo1" cellpadding="0" cellspacing="1" style="margin-top: -1px;height:50%;">
          <tr>
            <th style="width: 15%">
              建设单位
            </th>
            <td style="width: 35%">
              <label id="viewbuildCompany" style="height:80px;width:90%;"></label>
            </td>
            <td style="width: 50%">
              <table class="tableEditDetail" cellpadding="0" cellspacing="1">
                <tr>
                  <th style="width: 35%; background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 65%">
                    <label id="viewbuildContactName" style="width:80%;"></label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th style="width: 15%">
              设计单位
            </th>
            <td style="width: 35%">
              <label name="viewdesignCompany" id="viewdesignCompany" style="height:60px;width:80%;"></label>
            </td>
            <td style="width: 50%">
              <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                <tr>
                  <th style="width: 35%; background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 65%">
                    <label id="viewdesignContactName" style="width:80%;"></label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th style="width: 15%">
              施工单位
            </th>
            <td style="width: 35%">
              <label id="viewconstructCompany" style="height:60px;width:80%;"></label>
            </td>
            <td style="width:50%">
              <table class="tableEditDetail" cellpadding="0" cellspacing="1">
                <tr>
                  <th style="width: 35%; background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 65%">
                    <label id="viewconstructContactName" style="width:80%;"></label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th style="width: 15%">
              监理单位
            </th>
            <td style="width: 35%">
              <label id="viewsupervisorCompany" style="height:60px;width:80%;"></label>
            </td>
            <td style="width: 50%">
              <table class="tableEditDetail" cellpadding="0" cellspacing="1">
                <tr>
                  <th style="width: 35%;background-color: #fff2ec;">
                    联系人
                  </th>
                  <td style="width: 65%">
                    <label id="viewsupervisorContactName" style="width:80%;"></label>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
let tabToggle = (winH = $(window).height()) => {
  $(".main").css({
    height: winH - 100,
    width: $(window).width()
  });
  $(".top .nav li a").click(function() {
    $(".nav li a.selected").removeClass("selected");
    $(this).addClass("selected");
  });
};

export default {
  data() {
    return {};
  },
  mounted: function() {
    tabToggle();
    $(window).resize(() => tabToggle());
  }
  // 创建完毕状态
};
</script>

<style scoped>
@charset "utf-8";
* {
  font-size: 9pt;
  border: 0;
  margin: 0;
  padding: 0;
}
ul {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
}
img {
  border: 0;
}
dl,
dt,
dd,
span {
  margin: 0;
  padding: 0;
  display: block;
}
a,
a:focus {
  text-decoration: none;
  color: #000;
  outline: none;
  blr: expression(this.onFocus=this.blur());
}
a:hover {
  color: #eb5409;
  text-decoration: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
cite {
  font-style: normal;
}
h2 {
  font-weight: normal;

}
/*top.html*/
.header {
  height: 88px;
}
.top {
  font-family: "微软雅黑";
  margin: 0 auto;
  min-width: 980px;
  background: url(../../../static/images/topbg.gif) repeat-x;
  height: 88px;
}
.topleft {
  height: 88px;
  background: url(../../../static/images/topleft.jpg) no-repeat;
  float: left;
  width: 320px;
}
.topleft img {
  margin-top: 12px;
  margin-left: 10px;
}
.topright {
  height: 88px;
  background: url(../../../static/images/topright.jpg) no-repeat right;
  float: right;
}
.nav {
  float: left;
  position: absolute;
  left: 320px;
}
.nav li {
  float: left;
  width: 87px;
  height: 88px;
  text-align: center;
}
.nav li a {
  display: block;
  width: 87px;
  height: 88px;
  -moz-transition: none;
  transition: background-color 0.3s linear;
  -moz-transition: background-color 0.3s linear;
  -webkit-transition: background-color 0.3s linear;
  -o-transition: background-color 0.3s linear;
}
.nav li a.selected {
  background: url(../../../static/images/navbg.png) no-repeat;
}
.selected {
  background: url(../../../static/images/navbg.png) no-repeat;
}
.nav li a:hover {
  display: block;
  background: #000;
  color: #fff;
  background: none repeat scroll 0% 0% rgb(235, 84, 9);
}
.nav li img {
  margin-top: 10px;
}
.nav li a {
  display: block;
}
.nav a h2 {
  font-size: 14px;
  color: #fff;
}
.nav a:hover h2 {
  color: #fff;
}
.topright ul {
  padding-top: 15px;
  float: right;
  padding-right: 12px;
}
.topright ul li {
  float: left;
  padding-left: 9px;
  padding-right: 9px;
  background: url(../../../static/images/line.gif) no-repeat right;
}
.topright ul li:last-child {
  background: none;
}
.topright ul li a {
  font-size: 13px;
  color: #ffd6af;
}
.topright ul li a:hover {
  color: #fff;
}
.topright ul li span {
  margin-top: 2px;
  float: left;
  padding-right: 3px;
}
.user {
  height: 30px;
  background: url(../../../static/images/ub1.png) repeat-x;
  clear: both;
  margin-top: 10px;
  float: right;
  margin-right: 12px;
  border-radius: 30px;
  white-space: nowrap;
  position: relative;
}
.user span {
  display: inline-block;
  padding-right: 10px;
  background: url(../../../static/images/user.png) no-repeat 15px 10px;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  padding-left: 20px;
  padding-left: 35px;
}
.user b {
  display: inline-block;
  width: 20px;
  height: 18px;
  background: url(../../../static/images/msg.png);
  text-align: center;
  font-weight: normal;
  color: #fff;
  font-size: 14px;
  margin-right: 13px;
  margin-top: 7px;
  line-height: 18px;
}
.user i {
  display: inline-block;
  margin-right: 5px;
  font-style: normal;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
}
/* 解决百度地图label样式冲突导致边框不能正常显示 */
#map label {
  max-width: none;
}

.tableEditDetail {
  border-collapse: separate;
  border-spacing: 1px;
}

.tableEditDetail input {
  margin: 5px 0px 5px 0px !important;
  padding: 0 !important;
}

.tableEditDetail input:focus,
textarea:focus {
  border-color: #03a9f4;
  box-shadow: 0 0 15px #03a9f4;
  -webkit-box-shadow: 0 0 15px #03a9f4;
  -moz-box-shadow: 0 0 15px #03a9f4;
}

input {
  width: 60%;
  height: 20px;
  font-size: 12px;
  border: 1px solid #7f9db9;
  line-height: 20px;
}

/*按钮样式*/
.btton133 {
  width: 133px;
  height: 29px;
  font-size: 12px;
  line-height: 29px;
  border-style: none;
  border-color: inherit;
  border-width: medium;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 3px;
}

.btton85 {
  width: 85px;
  height: 22px;
  font-size: 12px;
  line-height: 22px;
  border-style: none;
  border-color: inherit;
  border-width: medium;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 3px;
}

/*头部提示地址表格样式*/
#tableHeader {
  width: 100%;
  height: 43px;
  margin: 0 auto;
  border: 0px;
  font-size: 12px;
  background-image: url(../../../static/images/normal_05.gif);
}

#tableHeader th {
  width: 573px;
  height: 43px;
  color: #237fd2;
  text-align: left;
  font-weight: normal;
  padding-left: 35px;
  background-image: url(../../../static/images/normal_03.gif);
  background-repeat: no-repeat;
}

#tableHeader td {
  font-size: 12px;
  text-align: right;
  margin-right: 10px;
}

.topTool {
  border: 1px solid #d0e2f8;
}

/*编辑详情表格样式*/
.tableEditDetail {
  width: 99%;
  margin: 0 auto;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  table-layout: fixed;
  background-color: #cad8e6;
}

.tableEditDetail th {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: normal;
  background-color: #f0faff;
}

.tableEditDetail td {
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 5px;
  word-wrap: break-word;
  background-color: #fafafa;
}

.tableEditDetail td .span {
  color: Red;
}
</style>

