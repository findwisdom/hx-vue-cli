import Oidc from 'oidc-client'

const settings = {
    authority: localStorage.getItem('identitySiteRootSite') + '/identity',
    client_id: 'RBS',
    // redirect_uri: 'http://localhost:8080/login.html',
    // post_logout_redirect_uri: 'http://localhost:8080/login.html',

    redirect_uri: localStorage.getItem('appUrlSite') + '/login.html',
    post_logout_redirect_uri: localStorage.getItem('appUrlSite') + '/login.html',

    // popup_redirect_uri: appUrl + '/signin_popup.html',
    popupWindowFeatures: 'location=no,toolbar=no,width=600,height=500,left=100,top=100',

    // these two will be done dynamically from the buttons clicked, but are
    // needed if you want to use the silent_renew
    response_type: 'id_token token',
    scope: 'openid roles profile rs_userInfo',

    // silent renew will get a new access_token via an iframe
    // just prior to the old access_token expiring (60 seconds prior)
    // silent_redirect_uri: window.location.protocol + '//' + window.location.host + '/silent_renew.html',
    automaticSilentRenew: true,

    // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app
    // wouldn't care about them or want them taking up space
    filterProtocolClaims: true,

    // this will use the user info endpoint if it's an OIDC request and there's an access_token
    loadUserInfo: true
}

Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.NONE

export
const mgr = new Oidc.UserManager(settings)

export
default {
    signIn () {
        return mgr.signinRedirect() // 返回 允许触发当前窗口到授权端点的重定向。
    },
    signInCallback () {
        return mgr.signinRedirectCallback()// 返回响应 promise的结果是验证User
    },
    getUser () {
        return mgr.getUser() // 返回 promise  User为当前已认证的用户加载对象。
    },
    logout () {
        return mgr.signoutRedirect() // 返回允许触发当前窗口重定向到结束会话终结点。
    },
    signinSilent () {
        return mgr.signinSilent() // 允许触发静默请求（通过iframe）到授权端点。返回承诺的结果是验证User
    },
    signinPopup () {
        console.log(mgr.signinPopup())
        return mgr.signinPopup() // 返回允许触发一个请求（通过弹出窗口）到授权端点。承诺的结果是验证User。
    }
}
