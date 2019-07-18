const errorLog = {
  state: {
    logs: [],
    cxImgData:[],
    gzcImgData:[],
    lfImgData:[],
    msImgData:[],
    qxImgData:[],
    swImgData:[],
    tzcImgData:[],
    wydImgData:[],
    wysImgData:[]
  },
  mutations: {
    SET_CXDATA(state,cxImgData) {
      state.cxImgData = cxImgData;
    },
    SET_GZCDATA(state, gzcImgData) {
      state.gzcImgData = gzcImgData;
    },
    SET_LFDATA(state, lfImgData) {
      state.lfImgData = lfImgData;
    },
    SET_MSDATA(state, msImgData) {
      state.msImgData = msImgData;
    },
    SET_QXDATA(state, qxImgData) {
      state.qxImgData = qxImgData;
    },
    SET_SWDATA(state,swImgData) {
      state.swImgData = swImgData;
    },
    SET_TZCDATA(state, tzcImgData) {
      state.tzcImgData = tzcImgData;
    },
    SET_WYDDATA(state, wydImgData) {
      state.wydImgData = wydImgData;
    },
    SET_WYSDATA(state, wysImgData) {
      state.wysImgData = wysImgData;
    },
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    }
  }
}

export default errorLog
