/*
 * @Author: baiyang 
 * @Description: 数据展示分图 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-05-22 17:04:36
 */

import dataLayout from '@/module-datachart/pages/dataLayout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  { 
    path: '/database',
    component:dataLayout,
    redirect: 'noredirect',
    name: 'database',
    meta: {
      title: 'datachart管理',
      icon: 'component'
    },
    children: [
      {
        path: 'table',
        component: _import('datachart/pages/index'),
        name: 'database-table',
        meta: {title: '列表模块'}
      }
    ]
  }
]
