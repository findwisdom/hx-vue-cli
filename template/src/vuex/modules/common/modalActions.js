import * as Types from './../../mutation-types.js'

// *** 显示模态窗口 ***
const showModal = ({ commit }, title, message, type) => {
    commit(Types.MODAL_SHOW, {title: title, message: message, type: type})
}

export const showDangerModal = ({ commit }, message) => {
    var title = '错误'

    showModal({commit}, title, message, 'modal-danger')
}

export const showSuccessModal = ({ commit }, message) => {
    var title = '成功'

    showModal({commit}, title, message, 'modal-success')
}

export const showInfoModal = ({ commit }, message) => {
    var title = '消息'

    showModal({commit}, title, message, 'modal-info')
}

export const showWarningModal = ({ commit }, message) => {
    var title = '警告'

    showModal({commit}, title, message, 'modal-warning')
}

export const hideModal = ({ commit }) => {
    commit(Types.MODAL_HIDE)
}

// payload -- eventKey, value
export const changeModalEvent = ({ commit }, payload) => {
    commit(Types.MODAL_CHANGE_EVENT, {
        eventKey: payload.eventKey,
        value: payload.value
    })
}

export const closeModalEvent = ({ commit }, eventKey) => {
    changeModalEvent({commit}, {eventKey: eventKey, value: false})
}

export const showError = ({ commit }, error) => {
    commit(Types.MODAL_QUERY_API_ERROR, {error: error})
}

// payload -- event, key
export const showErrorToEvent = ({ commit }, payload) => {
    commit(Types.MODAL_QUERY_API_ERROR, {error: payload.error, eventKey: payload.eventKey})
}

export const showSuccess = ({ commit }, message) => {
    commit(Types.MODAL_QUERY_API_SUCCESS, {message: message})
}

export const showSuccessToEvent = ({ commit }, { message, eventKey }) => {
    commit(Types.MODAL_QUERY_API_SUCCESS, {message: message, eventKey: eventKey})
}
