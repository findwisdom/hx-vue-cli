import {
    LOGIN,
    LOGIN_CALLBACK,
    LOGOUT,
    LOGIN_FAILED
}
from './../../mutation-types.js'

import * as actions from './identityActions.js'
import * as getters from './identityGetters.js'
import { STORAGEIDENTITY } from '../../../../static/js/config/login-consfig'

const state = {
    user: JSON.parse(localStorage.getItem(STORAGEIDENTITY)) || {},
    error: null
}

const mutations = {
    [LOGIN] (state) {
    },
    [LOGIN_CALLBACK] (state, user) {
        state.user = user
        localStorage.setItem(STORAGEIDENTITY, JSON.stringify(user))
    },
    [LOGOUT] (state) {
        state.user = {}
        localStorage.removeItem(STORAGEIDENTITY)
    },
    [LOGIN_FAILED] (state, error) {
        state.error = error
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
