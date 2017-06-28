import identityApi from './../../../api/auth/identityApi.js'
import * as Types from './../../mutation-types.js'

// *** identity ***
// 登录
export const login = ({ commit }) => {
    identityApi.signIn().then(function () {
        commit(Types.LOGIN)
    }).catch(function (error) {
        commit(Types.LOGIN_FAILED, error)
    })
}

// 登录
export const siginInPopup = ({ commit }) => {
    identityApi.signinPopup().then(function (user) {
        updateUser({commit}, user)
    }).catch(function (error) {
        commit(Types.LOGIN_FAILED, error)
    })
}

// 登录回调
export const checkLoginCallback = ({ commit }) => {
    identityApi.signInCallback().then(function (user) {
        updateUser({commit}, user)
    }).catch(function (error) {
        commit(Types.LOGIN_FAILED, error)
    })
}

// 退出
export const logout = ({ commit }) => {
    commit(Types.LOGOUT)
    identityApi.logout()
}

export const updateUser = ({commit}, user) => {
    commit(Types.LOGIN_CALLBACK, user)
}

/* export const addToRouteRole = ({commit}, route) => {
    commit(Types.IDENTITY_ADD_TO_ROUTE_ROLE, route)
}
*/
