// 解决低版本语法兼容问题
import 'babel-polyfill'

import Vue from 'vue'

import SilentRenew from './SilentRenew.vue'

/* eslint-disable no-new */
new Vue({
    el: '#silentRenew',
    render: h => h(SilentRenew)
})
