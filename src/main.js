import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; // global css
import App from "./App";
import router from "./router";
import store from "./store";
import i18n from "./lang"; // Internationalization
import "./icons"; // icon
import "./errorLog"; // error log
import * as filters from "./filters"; // global filters
import "./mock"; // simulation data
// font-awesome
import "font-awesome/css/font-awesome.css";
import $ from "jquery"; // 全局引入jquery
import MuseUI from "muse-ui"; //引入museUI
import "muse-ui/dist/muse-ui.css";
import "@/styles/dialog.scss"; //和museUI配套的dialog样式表
import JsEncrypt from "jsencrypt"; //引入jsencrypt加密
import loading from 'vue-nice-loading'

Vue.use(MuseUI);
Vue.use(loading);
/*
* 注册 - 业务模块
*/
import dashboard from "@/module-dashboard/"; // 面板
import organ from "@/module-organ/"; // 列表页
import datachart from "@/module-datachart/"; // 各种数据展示图表
Vue.use(dashboard, store);
Vue.use(organ, store);
Vue.use(datachart, store);
/*
* 注册 - 组件
*/

// 饿了么
Vue.use(Element, {
  size: "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
// 过滤器过滤json时间格式
Vue.filter("dateTimeFormat", value => {
  var d = new Date(value);
  var times =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getDate();
  return times;
});
/* eslint-disable */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  JsEncrypt,
  template: "<App/>",
  components: { App }
});
