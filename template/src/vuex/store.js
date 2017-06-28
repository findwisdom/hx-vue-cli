/**
 * Created by wisdom on 2017/2/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 身份认证
import identity from './modules/auth/identity.js'
import common from './modules/page/page-common.js'
import modalEditor from './modules/common/modalEditor.js'
import modal from './modules/common/modal.js'

// 公共actions方法
import * as actions from './actions.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    modules: {
        modal, // 模态窗口
        modalEditor, // 模态编辑器
        identity,   //  身份认证
        common    //  林琳碎碎 的一些data
    },
    actions
})
