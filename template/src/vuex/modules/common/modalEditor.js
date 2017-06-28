import { MODAL_EDITOR_DISPLAY } from './../../mutation-types.js'

const state = {
    display: false
}

const mutations = {
    [MODAL_EDITOR_DISPLAY] (state, value) {
        state.display = value
    }
}

export default {
    state,
    mutations
}
