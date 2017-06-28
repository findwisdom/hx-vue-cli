import {
    QUERY_API_ERROR
}
from './../../mutation-types.js'

const state = {
    error: null
}

const mutations = {
    [QUERY_API_ERROR] (state, error) {
        state.error = error
    }
}

export
default {
    state,
    mutations
}
