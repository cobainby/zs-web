import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/base',
    component: Layout,
    redirect: 'noredirect',
    name: 'base',
    meta: {
      title: 'manage',
      icon: 'component'
    },
    children: [
      {
        path: 'organ', 
        name: 'base-organ',
        component: _import('dashboard/pages/organ'),
        meta: {title: 'organ'}
      },
      {
        path: 'worker',
        name: 'base-worker',
        component: _import('dashboard/pages/worker'),
        meta: {
          title: 'worker',
          noCache: true
        }
      },
      {
        path: 'permissions',
        name: 'base-permissions',
        component: _import('dashboard/pages/permissions'),
        meta: {title: 'permissions'}
      }
    ]
  }
]
