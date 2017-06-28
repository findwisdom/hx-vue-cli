import Vue from 'vue'
import Router from 'vue-router'
import store from './../vuex/store.js'
import menuRoot from './../config/menu.js'
import * as role from '../../src/api/auth/auth'

import o from 'o.js'
o().config({
  endpoint: null,   // your odata endpoint for the service
  json: true,       // currently only json is supported
  strictMode: true, // strict mode throws exceptions, non strict mode only logs them
  start: function () {
  },      // a function which is executed on loading
  ready: null,      // a function which is executed on ready
  error: null,      // a function which is executed on error
  headers: [{name: 'Authorization', value: 'Bearer ' + store.state.identity.user.access_token}],      // an array of additional headers e.g.: [{name:'headername',value:'headervalue'}]
  username: null,   // a basic auth username
  password: null,   // a basic auth password
  isAsync: true     // set this to false to make synced (a)jax calls. (doesn't work with basic auth!)
})
// 定义动态加载组件方法
const getComponent = path => require(`./../${path}.vue`)

// 定义路由数组
const routes = []  // history

// 首页
routes.push({
  path: '/index.html',
  name: 'index',
  component: require('./../page/app/app.vue')
})

routes.push({
  path: '/',
  name: '/',
  component: require('./../page/app/app.vue')
})

// 菜单对象转换为routes
// 最高层定义为module,二级定义为menu，三层定义为subMenu
menuRoot.forEach((module) => {
  const menus = module.child
  if (menus) {
    menus.forEach((menu) => {
      // 菜单项增加到路由数组中
      const subMenus = menu.child
      if (subMenus) {
        subMenus.forEach((subMenu) => {
          if (subMenu.role === '*' || role.inRole(subMenu.role)) {
            routes.push({
              path: subMenu.path,
              name: subMenu.name,
              component: getComponent(subMenu.dir + subMenu.path)
            })
          }
        })
      } else {
        if (menu.role === '*' || role.inRole(menu.role)) {
          routes.push({
            path: menu.path,
            name: menu.name,
            component: getComponent(menu.dir + menu.path)
          })
        }
      }
    })
  } else {
    if (module.role === '*' || role.inRole(module.role)) {
      routes.push({
        path: module.path,
        name: module.name,
        component: getComponent(module.dir + module.path)
      })
    }
  }
})

routes.push({
  path: '*',
  name: 'notfound',
  component: require('./../page/NotFound.vue')
})

// 使用并定义路由
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})
