const historyLimit = 25

export const app = {
    historys: [],
    clearHistorys: function () {
        app.historys.length = 0
    },
    addHistory: function (history) {
        app.historys.splice(0, 0, history)

        if (app.historys.length > historyLimit) {
            app.historys.splice(historyLimit, 1)
        }
    }
}
