<template>
  <scroll-bar>
    <el-menu router mode="vertical" :default-active="activeIndex" :collapse="isCollapse" background-color="#DE7B1D" text-color="#ffffff" active-text-color="#fff">
      <router-link to="/itemList">
        <div class="sidebar-logo"><img src="@/module-dashboard/assets/zs-logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="@/module-dashboard/assets/zs-logo-mini.png" /></div>
      </router-link>
      <el-menu-item :index="'dataInfo?id='+this.projectUuid">
        <i class="el-icon-info"></i>
        <span class="projectInfo" slot="title">项目信息</span>
      </el-menu-item>
      <el-menu-item :index="'monitorTotal?id='+this.projectUuid">
        <i class="el-icon-remove"></i>
        <span class="monitorTotal" slot="title">数据统计</span>
      </el-menu-item>
      <el-menu-item :index="'dailyReport?id='+this.projectUuid">
        <i class="el-icon-download"></i>
        <span class="dailReport" slot="title">日报导出</span>
      </el-menu-item>
      <el-menu-item :index="'xs?id='+this.projectUuid">
        <i class="el-icon-picture-outline"></i>
        <span class="xs" slot="title">巡视内容</span>
      </el-menu-item>
      <el-menu-item v-for="item in monitorMenu" :index="item.src" :key="item.src">
        <i id="monitorIcon" :class="item.icon"></i>
        <span class="monitorItem" slot="title">{{item.title}}</span>
      </el-menu-item>
      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
    </el-menu>
  </scroll-bar>
</template>
<style rel="stylesheet/css" scoped>
@media (min-width: 640px) and (max-width: 1399px) {
  .projectInfo,.monitorItem{
    font-size: 10px;
    margin-left:-5px;
  }
  .el-icon-info,.el-icon-view,#monitorIcon{
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
    getFdSet({ projectUuid: this.projectUuid, token: this.token }).then(res => {
      debugger
      for (var i = 0; i < res.data.data.length; i++) {
        var menu = new Object();
        menu["itemName"] = res.data.data[i].mItemName;
        menu["title"] =res.data.data[i].mItemEname;
        if (res.data.data[i].mItemName == "水平位移") {
          debugger
          menu["src"] = "wys?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-minus";
        } else if (res.data.data[i].mItemName == "竖向位移") {
          menu["src"] = "wyd?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-sort-down";
        } else if (res.data.data[i].mItemName == "深层水平位移") {
          menu["src"] = "cx?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-more";
        } else if (res.data.data[i].mItemName == "砼支撑轴力") {
          menu["src"] = "tzc?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-upload2";
        } else if (res.data.data[i].mItemName == "地下水位") {
          menu["src"] = "sw?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-mobile-phone";
        } else if (res.data.data[i].mItemName == "钢支撑轴力") {
          menu["src"] = "gzc?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-download";
        } else if (res.data.data[i].mItemName == "锚索") {
          menu["src"] = "ms?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-view";
        } else if (res.data.data[i].mItemName == "倾斜") {
          menu["src"] = "qx?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-message";
        }
        else if (res.data.data[i].mItemName == "裂缝") {
          menu["src"] = "lf?id="+this.projectUuid+"&monitorItemUuid="+res.data.data[i].monitorItemUuid;
          menu["icon"] = "el-icon-bell";
        }
        this.monitorMenu.push(menu);
      }
    });
  }
};
</script>

