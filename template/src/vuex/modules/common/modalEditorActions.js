import * as Types from './../../mutation-types.js'

export const showModalEditor = ({ dispatch }) => {
    dispatch(Types.MODAL_EDITOR_DISPLAY, true)
}

export const hideModalEditor = ({ dispatch }) => {
    dispatch(Types.MODAL_EDITOR_DISPLAY, false)
}