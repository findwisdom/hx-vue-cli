/**
 *   这个页面存放林琳碎碎 的一些data
 */
import {
  SET_CLIENT_MSG,
  SET_UPLOAD_ID,
  SET_SHOW
} from './../../mutation-types.js'

const state = {
  clientMsg: null,
  show: false,
  upLoadId: null,
  showList: {
    layer1: false,
    layer2: false,
    layer3: false,
    ExluploadShow: false,
    uploadShow: false
  }
}

const getters = {}

const mutations = {
  [SET_CLIENT_MSG] (state, data) {
    state.clientMsg = data
  },
  [SET_UPLOAD_ID] (state, id) {
    state.upLoadId = id
  },
  [SET_SHOW] (state, data) {
    // state.show = !state.show
    Object.assign(state.showList, data)
  }
}

const actions = {
  setUploadId ({commit, state}, data) {
    commit(SET_UPLOAD_ID, data)
  },
  setClientMsg ({commit, state}, data) {
    commit(SET_CLIENT_MSG, data)
  },
  setShow ({commit, state}, data) {
    commit(SET_SHOW, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
