import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
import { Message, Loading } from "element-ui";
import NProgress from "nprogress";
import Layout from "@/module-dashboard/pages/layout";
import { getToken } from "@/utils/auth";
import { hasPermissionPoint, hasPermission } from "@/utils/permission";

// 定义
const _import = require("./import_" + process.env.NODE_ENV); // 懒加载 导包
const whiteList = ["/login", "/authredirect"]; // 白名单 无需跳转

// 配置
Vue.use(Router);
NProgress.configure({ showSpinner: false }); // NProgress Configuration

/**
 * 基础路由
 * 
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: _import("dashboard/pages/login"),
    hidden: true
  },
  {
    path: "/authredirect",
    component: _import("dashboard/pages/authredirect"),
    hidden: true
  },
  { path: "/404", component: _import("dashboard/pages/404"), hidden: true },
  { path: "/401", component: _import("dashboard/pages/401"), hidden: true },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: _import("dashboard/pages/dashboard"),
        name: "dashboard",
        meta: { title: "dashboard", icon: "dashboard", noCache: true }
      }
    ]
  },
  {
    path: "/itemList",
    component: _import("dashboard/pages/itemList")
  },
  {
    path: "/projectChange",
    name: "projectChange",
    component: _import("dashboard/pages/projectChange")
  },
  {
    path: "/equipment",
    component: _import("dashboard/pages/equipment")
  },
  {
    path: "/detailInfo",
    component: _import("dashboard/pages/detailedInfo")
  },
  {
    path: "/datachart",
    component: Layout,
    redirect: "datachart",
    children: [
      {
        path: "datachart",
        component: _import("datachart/pages/dataMenu"),
        name: "datachart",
        meta: { title: "chartInfo", icon: "component", noCache: true }
      }
    ]
  },
  {
    path: "/basicList",
    component: _import("list/pages/basicList")
  },
  {
    path: "/cardList",
    component: _import("list/pages/cardList")
  },
  {
    path: "/tableList",
    component: _import("list/pages/tableList")
  },
  {
    path: "/dataList",
    component: _import("datachart/pages/dataMenu")
  }
];
/**
 * 配置路由
 **/
let router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // 进度条加载
  if (getToken()) {
    /* 是否有 token */
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done(); // 如果当前页是首页将不会触发后，所以手动处理它
    } else {
      debugger
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetUserInfo")
          .then(res => {
            // 拉取user_info
            const roles = res.data.worker.roles; // note: roles must be a array! such as: ['editor','develop']
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
          })
          .catch(() => {
            store.dispatch("FedLogOut").then(() => {
              Message.error("验证失败, 请重新登录");
              next({ path: "/login" });
            });
          });
      } else {
        next();
      }
    }
  } else {
    /* 如果token不存在 */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login"); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

/**
 * 导出 基础路由
 **/
export default router;

/**
 * 导出 业务路由
 **/
export let asyncRouterMap = [{ path: "*", redirect: "/404", hidden: true }];
