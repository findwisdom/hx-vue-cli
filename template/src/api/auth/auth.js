import store from './../../vuex/store.js'

// 检测是否过期
export function isExpired () {
    var user = store.state.identity.user

    // 用户不存在认为已过期
    if (!user) {
        return true
    }

    // 用户信息不存在认为已过期
    if (!user.profile) {
        return true
    }

    // 过期时间不存在认为已过期
    if (!user.expires_at) {
        return true
    }

    // 检测是否过期
    // 单位到秒
    var timestamp = (new Date()).getTime() / 1000
    return timestamp > user.expires_at
}

// 检测是否登录
export function loggedIn () {
    return !isExpired()
}

// 检测是否有权限
// role:权限关键字
export function inRole (roleKey) {
    // 超级管理员拥有所有权限
    if (isSuperAdmin()) {
        return true
    }

    if (roleKey === '*') {
        return true
    }

    if (!roleKey) {
        return false
    }

    var userRoles = store.state.identity.user.profile.role

    for (var i in userRoles) {
        if (userRoles[i].toLowerCase() === roleKey.toLowerCase()) {
            return true
        }
    }

    return false
}

export function isSuperAdmin () {
    if (!store.state || !store.state.identity || !store.state.identity.user.profile) {
        return false
    }

    var sAdminStr = store.state.identity.user.profile.SuperAdmin

    if (!sAdminStr) {
        return false
    }

    return sAdminStr.toLowerCase() === 'true'
}

