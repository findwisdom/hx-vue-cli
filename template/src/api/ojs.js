/**
 * Created by wisdom on 2017/3/7.
 */
import o from 'o.js'
import { lineChartApi } from 'charts/charts-api.js'
// import Vue from 'vue'

export function getData (url, _self, value) {
    _self.$nextTick(function () {
        o(lineChartApi).get(function (data) {
            _self.value = data
        })
    })
}
