// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

import * as auth from './api/auth/auth.js'
import {app} from './api/app.js'
import store from './vuex/store.js'
import {baseRole} from './config/role-map.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import urlAppend from 'url-append'
Vue.use(VueResource)
Vue.use(iView)

import hxqh from 'hx-v'
import 'hx-v/dist/styles/common.css'
// 存储项目url
let baseUrl = {
  identitySiteRoot: localStorage.getItem('identitySiteRootSite'),
  roleUrl: localStorage.getItem('roleUrlSite'),
  appUrl: localStorage.getItem('appUrlSite'),
  rbs: localStorage.getItem('rbsSite'),
  webApiRoot: localStorage.getItem('webApiRootSite'),
  file: localStorage.getItem('fileSite')
}

Vue.use(hxqh, baseUrl, baseRole)
// 开启开发工具
Vue.config.devtools = process.env.NODE_ENV !== 'production'

// 设置vue-resource认证
Vue.http.options.root = '/root'
Vue.http.headers.common['Authorization'] = 'Bearer ' + store.state.identity.user.access_token

Vue.http.options.before = function (request) {
  // Url增加一个随机数 处理IE缓存
  request.url = urlAppend(request.url, {r: Math.random()})
}

Vue.http.options.progress = function () {
  // 每个操作前检测是否超时
  if (!auth.loggedIn()) {
    location.href = 'login.html'
    return
  }
}

router.beforeEach((to, from, next) => {
  if (!auth.loggedIn()) {
    Vue.prototype.$Modal.confirm({
      title: '登陆过期',
      content: '登陆已过期，请重新登陆',
      onOk: function () {
        location.href = 'login.html'  // 登录超时！返回首页，next 死循环
      }
    })
    return
  } else {
    next()
  }
})

router.afterEach(route => {
  // 保存进历史
  app.addHistory(route)
})

/* eslint-disable*/
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
