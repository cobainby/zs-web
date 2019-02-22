/*
 * @Author: coderbaiyang <619148077@qq.com> 
 * @Description: 项目详细信息 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: baiyang
 * @Last Modified time: 2018-04-13 16:15:04
 */

// vue-router
import {asyncRouterMap} from '@/router'
import routerMaps from './router'
// vuex
import app from './store/app'

export default {
  install(module, store) {
    // 注册路由
    asyncRouterMap.push(routerMaps[0])
    // 注册状态管理
    if (store !== undefined) {
      // store.registerModule('app', app)
    }
  }
}
