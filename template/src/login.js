// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import login from './login.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
    el: '#login',
    template: '<login/>',
    components: {
      login
    }
})
