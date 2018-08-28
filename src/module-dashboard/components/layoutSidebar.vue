<template>
  <scroll-bar>
    <el-menu mode="vertical" 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      background-color="#DE7B1D" 
      text-color="#bfcbd9" 
      active-text-color="#fff"
      >
      <router-link to="/">
        <div class="sidebar-logo"><img src="../assets/zs-logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="../assets/zs-logo-mini.png" /></div>
      </router-link>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>
<script>
import {mapGetters} from 'vuex'
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'layoutSidebar',
  components: {SidebarItem, ScrollBar},
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
