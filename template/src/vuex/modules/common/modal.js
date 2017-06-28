import {
    MODAL_SHOW,
    MODAL_HIDE,
    MODAL_QUERY_API_ERROR,
    MODAL_QUERY_API_SUCCESS,
    MODAL_CHANGE_EVENT
}
from './../../mutation-types.js'

import * as actions from './modalActions.js'
import * as getters from './modalGetters.js'

const state = {
    modal: {
        isShow: false,
        title: '标题',
        message: '',
        type: 'modal-default',
        event: []
    },
    error: null
}

const mutations = {
    [MODAL_SHOW] (state, {
        title,
        message,
        type
    }) {
        state.modal.title = title
        state.modal.message = message
        state.modal.type = type
        state.modal.isShow = true
    },
    [MODAL_HIDE] (state) {
        state.modal.isShow = false
    },
    [MODAL_QUERY_API_ERROR] (state, {error, eventKey}) {
        state.modal.title = '请求错误'

        // 清空
        state.modal.message = ''

        if (error.message) {
            state.modal.message = error.message
        }

        if (error.Message) {
            state.modal.message = error.Message
        }

        if (error.ExceptionMessage) {
            state.modal.message += '\n' + error.ExceptionMessage
        } else if (error.ErrorMessage) {
            state.modal.message += '\n' + error.ErrorMessage
        }

        state.modal.type = 'modal-danger'
        state.modal.isShow = true

        state.error = error
        // 处理事件
        handelEvent(state, eventKey)
    },
    [MODAL_QUERY_API_SUCCESS] (state, { message, eventKey }) {
        state.modal.title = '成功'
        state.modal.message = message
        state.modal.type = 'modal-success'
        state.modal.isShow = true

        // 处理事件
        handelEvent(state, eventKey)
    },
    [MODAL_CHANGE_EVENT] (state, {eventKey, value}) {
        for (var i in state.modal.event) {
            var current = state.modal.event[i]
            if (current.key === eventKey) {
                if (value === true) {
                    current.value = value
                } else {
                    state.modal.event.splice(i, 1)
                }

                break
            }
        }
    }
}

function handelEvent (state, eventKey) {
    if (!eventKey) {
        return
    }

    // 处理事件
    var hasEvent = false
    for (var i in state.modal.event) {
        var current = state.modal.event[i]
        if (current.key === eventKey) {
            current.value = true
            hasEvent = true
            break
        }
    }

    // 无事件的话新增
    if (!hasEvent) {
        state.modal.event.push({
            key: eventKey,
            value: true
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
