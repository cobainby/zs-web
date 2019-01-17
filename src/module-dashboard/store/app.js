import Cookies from 'js-cookie'
import { stat } from 'fs';

const app = {
  state: {
    sidebar: {
      //初次进来拿cookies状态时，opened拿到的值是false,点击toggle切换后就不为false
      opened: +Cookies.get('sidebarStatus'),
      closed:!+Cookies.get('dataSidebarStatus')
    },
    language: Cookies.get('language') || 'en'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_DATA_SIDEBAR:state=>{
      if (state.sidebar.closed) {
        Cookies.set('dataSidebarStatus', 1)
      } else {
        Cookies.set('dataSidebarStatus', 0)
      }
      state.sidebar.closed = !state.sidebar.closed
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    //首页的切换左侧菜单
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    //数据展示里切换左侧菜单
    toggleDataBar({commit}){
      commit('TOGGLE_DATA_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
