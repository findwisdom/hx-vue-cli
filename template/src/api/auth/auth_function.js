/**
 * Created by wisdom on 2017/3/3.
 */
import { loggedIn } from './auth'
import { mgr } from './identityApi.js'
import Vue from 'vue'

export function Auth (updateUser, signinSilent, userclear) {
    // 检测是否是登录状态没有则跳转登录
    noLogged(updateUser, userclear)

    // 检测用户载是否过期 过期则静默登录
    expiredCallback(signinSilent)

    // 检测用户载入事件 应对用户静默登录
    addUserLoad(signinSilent, updateUser)
}

// 未登录情况操作
function noLogged (updateUser, user) {
    if (!loggedIn()) {
        // 清除本地的用户信息
        updateUser(user)
        // 跳转到登录页面
        location.href = '../../../../login.html'
    }
}

// 应对过期进行的操作
function expiredCallback (signinSilent) {
    // 捕捉AccessToken过期事件 过期则静默登录
    mgr.events.addAccessTokenExpiring(function () {
        console.log('Token 正在过期1')
        signinSilent()
    })
    // mgr.events.addAccessTokenExpired(function () {
    //     console.log('Token 已过期')
    // })
}

// 检测用户载入事件 应对用户静默登录
function addUserLoad (signinSilent, updateUser) {
    mgr.events.addUserLoaded(function (user) {
        if (!user || user.expired) {
            signinSilent()
        }
        // 设置wepapi访问使用的access_token
        Vue.http.headers.common['Authorization'] = 'Bearer ' + user.access_token

        // 更新User
        updateUser(user)
    })
}

// 静默登录函数封装
export function signinAuth (updateUser, siginInPopup, user) {
    mgr.signinSilent().then(function () {
        // Session state changed but we managed to silently get a new identity token, everything's fine
        console.log('静默刷新Token成功')
    }).catch(function (err) {
        // Here we couldn't get a new identity token, we have to ask the user to log in again
        console.log('静默刷新Token失败', err.message)

        // 请求认证中心发现认证中心的登录已失效时
        if (err.message === 'login_required') {
            console.log('登录失效')
            // 清除本地的用户信息
            updateUser(user)

            // 跳转到登录页面
            location.href = '../../../../login.html'
        } else if (err.message === 'interaction_required') {
            // 需要交互的情况 例如必须要进行授权且不允许用户保存授权
            siginInPopup()
        } else {
            // 清除本地的用户信息
            updateUser(user)

            // 跳转到登录页面
          location.href = '../../../../login.html'
        }
    })
}

