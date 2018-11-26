<template>
  <scroll-bar>
    <el-menu mode="vertical" 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      background-color="#DE7B1D" 
      text-color="#ffffff" 
      active-text-color="#fff"
      >
      <router-link to="/">
        <div class="sidebar-logo"><img src="@/module-dashboard/assets/zs-logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="@/module-dashboard/assets/zs-logo-mini.png" /></div>
      </router-link>
      <el-menu-item index="/login">
        <i class="el-icon-info"></i>
        <span slot="title">监测概况</span>
      </el-menu-item>
      <el-menu-item index="/pages/dataMenu">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">顶部水平位移</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">深层水平位移</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">顶部竖向位移</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">周边管线竖向位移</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">地下水位</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">锚杆内力</span>
      </el-menu-item>
      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
    </el-menu>
  </scroll-bar>
</template>
<script>
import {mapGetters} from 'vuex'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'layoutSidebar',
  components: {ScrollBar},
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

