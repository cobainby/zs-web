var YISACONF = {
  sysName: '雾气监测系统',
  apiHost: 'http://localhost:2000/',
  fogSocketUrl: 'ws://localhost:8088/fog',
  homeNav: [
    {path: 'realtime', text: '实时目标分析'},
    {path: 'history', text: '历史视频分析'},
    {path: 'offline', text: '离线视频分析'},
    {path: 'smart-hub', text: '视频智能应用'}
  ],
  // 将标准路由替换成各地定制路由，格式—— 标准路由的name: '定制路由的name'
  routes: {
    // plate: 'person'
  },
  staticDataCache: '929392932',
  exportDataUrl: 'http://localhost:8080/#/result/person',
  map: {
    center: [121.393075, 37.543445],
    zoom: 11,
    zooms: [3, 18]
  }
}
