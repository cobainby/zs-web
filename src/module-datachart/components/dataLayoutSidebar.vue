<template>
  <scroll-bar>
    <el-menu router mode="vertical" :default-active="activeIndex" :collapse="isCollapse" background-color="#DE7B1D" text-color="#ffffff" active-text-color="#fff">
      <router-link to="/">
        <div class="sidebar-logo"><img src="@/module-dashboard/assets/zs-logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="@/module-dashboard/assets/zs-logo-mini.png" /></div>
      </router-link>
      <el-menu-item :index="'dataInfo?id='+this.projectUuid">
        <i class="el-icon-info"></i>
        <span slot="title">项目信息</span>
      </el-menu-item>
      <el-menu-item :index="'dailyCheck?id='+this.projectUuid">
        <i class="el-icon-view"></i>
        <span slot="title">日常巡查</span>
      </el-menu-item>
      <el-menu-item :index="'wys?id='+this.projectUuid">
        <i class="el-icon-minus"></i>
        <span slot="title">围护墙顶部水平位移</span>
      </el-menu-item>
      <el-menu-item :index="'wyd?id='+this.projectUuid">
        <i class="el-icon-sort-down"></i>
        <span slot="title">围护墙顶部竖向位移</span>
      </el-menu-item>
      <el-menu-item :index="'cx?id='+this.projectUuid">
        <i class="el-icon-more"></i>
        <span slot="title">围护墙深层水平位移</span>
      </el-menu-item>
      <el-menu-item :index="'zc?id='+this.projectUuid">
        <i class="el-icon-upload2"></i>
        <span slot="title">支撑内力</span>
      </el-menu-item>
      <el-menu-item :index="'sw?id='+this.projectUuid">
        <i class="el-icon-mobile-phone"></i>
        <span slot="title">地下水位变化</span>
      </el-menu-item>
      <el-menu-item :index="'db?id='+this.projectUuid">
        <i class="el-icon-download"></i>
        <span slot="title">周边地表竖向位移</span>
      </el-menu-item>
      <el-menu-item :index="'sm?id='+this.projectUuid">
        <i class="el-icon-view"></i>
        <span slot="title">周边建筑物竖向位移</span>
      </el-menu-item>
      <el-menu-item :index="'zgd?id='+this.projectUuid">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">周边管线竖向位移</span>
      </el-menu-item>
      <el-menu-item :index="'qx?id='+this.projectUuid">
        <i class="el-icon-message"></i>
        <span slot="title">倾斜</span>
      </el-menu-item>
      <el-menu-item :index="'lf?id='+this.projectUuid">
        <i class="el-icon-bell"></i>
        <span slot="title">裂缝</span>
      </el-menu-item>
      <el-menu-item v-for="item in monitorMenu" :index="item.src" :key="item.src">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </el-menu-item>
      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
    </el-menu>
  </scroll-bar>
</template>
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
      return !this.sidebar.opened;
    }
  },
  // 创建完毕状态
  created() {
    this.projectUuid = this.$route.query.id;
    getFdSet({ projectUuid: this.projectUuid, token: this.token }).then(res => {
      for (var i = 0; i < res.data.data.length; i++) {
        var menu = new Object();
        menu["itemName"] = res.data.data[i].mItemName;
        if (res.data.data[i].mItemName == "") {


        }else if (res.data.data[i].mItemName == "") {

        }else if (res.data.data[i].mItemName == "") {
          
        }else if (res.data.data[i].mItemName == "") {
          
        }else if (res.data.data[i].mItemName == "") {
          
        }else if (res.data.data[i].mItemName == "") {
          
        }else if (res.data.data[i].mItemName == "") {
          
        }else if (res.data.data[i].mItemName == "") {
          
        }else if (res.data.data[i].mItemName == "") {
          
        }
        this.monitorMenu.push(menu);
      }
    });
  }
};
</script>

