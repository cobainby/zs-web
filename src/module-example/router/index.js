/*
 * @Author: coderbaiyang <619148077@qq.com> 
 * @Description: 项目详细信息 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: baiyang
 * @Last Modified time: 2018-05-22 17:04:36
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/proinfo',
    component: Layout,
    redirect: 'noredirect',
    name: 'proinfo',
    meta: {
      title: 'proinfo管理',
      icon: 'component'
    },
    children: [
      {
        path: 'table',
        component: _import('proinfo/pages/index'),
        name: 'proinfo-table',
        meta: {title: '列表模块'}
      }
    ]
  }
]
