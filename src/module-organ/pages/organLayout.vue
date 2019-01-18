<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.closed}">
		<layout-sidebar class="sidebar-container"></layout-sidebar>
		<div class="main-container">
			<layout-navbar></layout-navbar>
			<layout-app-main></layout-app-main>
		</div>
	</div>
</template>

<script>
import layoutNavbar from '@/module-organ/components/organLayoutNavbar'
import layoutSidebar from '@/module-organ/components/organLayoutSidebar'
import layoutAppMain from '@/module-organ/components/organLayoutAppMain'

export default {
  name: 'layout',
  components: {
    layoutNavbar,
    layoutSidebar,
    layoutAppMain
  },
  computed: {
    sidebar() {
      debugger
      return this.$store.state.app.sidebar
    }
  }
}   


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}
.bottom {
  p {
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 14px;
  }
}
</style>
