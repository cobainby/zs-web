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
        if (res.data.data[i].mItemName == "围护墙（边坡）顶部水平位移") {
          debugger
          menu["src"] = "wys?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-minus";
          menu["title"] = "围护墙顶部水平位移";
        } else if (res.data.data[i].mItemName == "围护墙（边坡）顶部竖向位移") {
          menu["src"] = "wyd?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-sort-down";
          menu["title"] = "围护墙顶部竖向位移";
        } else if (res.data.data[i].mItemName == "围护墙深层水平位移") {
          menu["src"] = "cx?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-more";
          menu["title"] = "围护墙深层水平位移";
        } else if (res.data.data[i].mItemName == "支撑内力") {
          menu["src"] = "zc?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-upload2";
          menu["title"] = "支撑内力";
        } else if (res.data.data[i].mItemName == "地下水位变化") {
          menu["src"] = "sw?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-mobile-phone";
          menu["title"] = "地下水位变化";
        } else if (res.data.data[i].mItemName == "周边地表竖向位移") {
          menu["src"] = "db?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-download";
          menu["title"] = "周边地表竖向位移";
        } else if (res.data.data[i].mItemName == "周边建筑物竖向位移") {
          menu["src"] = "sm?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-view";
          menu["title"] = "周边建筑物竖向位移";
        } else if (res.data.data[i].mItemName == "周边管线竖向位移") {
          menu["src"] = "zgd?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-picture-outline";
          menu["title"] = "周边管线竖向位移";
        } else if (res.data.data[i].mItemName == "倾斜") {
          menu["src"] = "qx?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-message";
          menu["title"] = "倾斜";
        }
        else if (res.data.data[i].mItemName == "裂缝") {
          menu["src"] = "lf?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-bell";
          menu["title"] = "裂缝";
        }
        this.monitorMenu.push(menu);
      }
    });
  }
};
</script>

