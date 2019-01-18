/*
 * @Author: taoshiwei <taoshiwei@itcast.cn> 
 * @Description: 列表页 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-07-04 13:27:02
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/list',
    component: Layout,
    redirect: 'noredirect',
    name: 'list',
    meta: {
      title: 'list',
      icon: 'table'
    },
    children: [
    ]
  }
]
