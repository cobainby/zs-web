<template>
  <scroll-bar>
    <el-menu router mode="vertical" :default-active="activeIndex" :collapse="isCollapse" background-color="#DE7B1D" text-color="#ffffff" active-text-color="#fff">
      <router-link to="/">
        <div class="sidebar-logo"><img src="@/module-dashboard/assets/zs-logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="@/module-dashboard/assets/zs-logo-mini.png" /></div>
      </router-link>
      <el-menu-item :index="'/'">
        <i class="el-icon-back"></i>
        <span class="index" slot="title">平台首页</span>
      </el-menu-item>
      <el-menu-item :index="'organ'">
        <i class="el-icon-news"></i>
        <span class="organ" slot="title">机构信息</span>
      </el-menu-item>
      <el-menu-item :index="'organList'">
        <i class="el-icon-date"></i>
        <span class="organList" slot="title">机构列表</span>
      </el-menu-item>
      <el-menu-item :index="'worker'">
        <i class="el-icon-service"></i>
        <span class="worker" slot="title">人员列表</span>
      </el-menu-item>
      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
    </el-menu>
  </scroll-bar>
</template>
<style rel="stylesheet/css" scoped>
@media (min-width: 640px) and (max-width: 1399px) {
  .organ,.organList,.worker,.index{
    font-size: 10px;
    margin-left:-5px;
  }
  .el-icon-news,.el-icon-date,.el-icon-service,.el-icon-back{
    margin-left:-5px;
  }
}
</style>
<script>
import { mapGetters } from "vuex";
import ScrollBar from "@/components/ScrollBar";
import { getFdSet } from "@/api/base/project";
import { getToken } from "@/utils/auth";

export default {
  name: "layoutSidebar",
  data() {
    return {
      activeIndex: "dataInfo",
      token: getToken(),
      monitorMenu: [],
      projectUuid: ""
    };
  },
  components: { ScrollBar },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.closed;
    }
  },
  // 创建完毕状态
  created() {
    this.projectUuid = this.$route.query.id;
  }
};
</script>

