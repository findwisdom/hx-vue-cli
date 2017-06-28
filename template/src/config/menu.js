/**
 * Created by wisdom on 2017/4/24.
 */

/**
 *  role 为权限设置 * 或者 ture 显示
 * index 为唯一标识,vuex state 存储
 */
// import {baseRole} from './role-map.js'

let item1 = {
  name: 'app',
  text: '首页',
  index: '1',
  icon: 'ios-navigate',
  display: true,
  dir: 'page/app',
  path: '/app',
  role: '*',
  meta: {
    requiresAuth: true,
    role: '*'
  }
}
let item2 = {
  name: 'role',
  text: '权限管理',
  index: '4',
  icon: 'person',
  display: true,
  child: [{
    dir: 'page/role',
    name: 'userManager',
    text: '用户管理',
    index: '4-1',
    icon: 'wrench',
    path: '/userManager',
    display: true,
    meta: {
      requiresAuth: true,
      role: '*'
    }
  }, {
    dir: 'page/role',
    name: 'roleManager',
    text: '权限管理',
    index: '4-2',
    icon: 'wrench',
    path: '/roleManager',
    display: true,
    meta: {
      requiresAuth: true,
      role: '*'
    }
  }, {
    dir: 'page/role',
    name: 'templateManagement',
    text: '权限模版管理',
    index: '4-3',
    icon: 'wrench',
    path: '/templateManagement',
    display: true,
    meta: {
      requiresAuth: true,
      role: '*'
    }
  }]
}
const menus = [item1, item2]
export default menus
