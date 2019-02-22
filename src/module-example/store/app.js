/*
 * @Author: coderbaiyang <619148077@qq.com> 
 * @Description: 项目详细信息 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: baiyang
 * @Last Modified time: 2018-04-13 16:15:33
 */

const app = {
  state: {
    name: ''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    setName({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        commit('SET_NAME', username)
        resolve()
      })
    }
  }
}

export default app
