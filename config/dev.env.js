'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"api"' //加上api本地代理访问API服务，避免跨域/这里的API就是config里的index指向的代理后台地址
})