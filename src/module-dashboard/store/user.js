import { login, getKey, logout, profile } from "@/api/base/frame";
import { getToken, setToken, removeToken } from "@/utils/auth";
import axios from 'axios'

const user = {
  state: {
    user: "",
    status: "",
    code: "",
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar =
        avatar || "http://or45inefq.bkt.clouddn.com/itheima-avatar.png";
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        getKey().then(response => {
          const publicKey = response.data;
          const encryptor = new JSEncrypt();
          encryptor.setPublicKey(publicKey);
          const rsaPassWord = encryptor.encrypt(userInfo.password);
          console.log(rsaPassWord);
          debugger;
          login({
            userid: username,
            password: rsaPassWord.replace(/\+/g, "%2B"),
            loginMode: "0",
            loginMac: "192.168.1.25"
          })
            .then(response => {
              const data = response.data;
              commit("SET_TOKEN", data.token);
              setToken(response.data.token);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // profile()
        //   .then(response => {
        //     const data = response.data;
        //     commit("SET_ROLES", data.roles);
        //     commit("SET_NAME", data.name);
        //     commit("SET_AVATAR", data.avatar);
        //     commit("SET_INTRODUCTION", data.introduction);
        //     resolve(response);
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
        debugger
        axios
          .get("http://192.168.1.13:8181/static/profile.json")
          .then(res => {
            const data = res.data;
            commit("SET_ROLES", data.roles);
            commit("SET_NAME", data.name);
            commit("SET_AVATAR", data.avatar);
            commit("SET_INTRODUCTION", data.introduction);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout()
        //   .then(() => {
        //     commit("SET_TOKEN", "");
        //     commit("SET_ROLES", []);
        //     removeToken();
        //     resolve();
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
