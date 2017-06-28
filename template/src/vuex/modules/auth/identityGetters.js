export const user = state => {
    return state.user
}

export const userRoles = state => {
    return state.user.profile.role
}

export const loginError = state => {
    return state.error
}
