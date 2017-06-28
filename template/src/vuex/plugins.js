import { STORAGE_IDENTITY_KEY } from './plugins.js'

const localStoreagePlugin = store => {
  store.subscribe((mutation, { user }) => {
    alert(JSON.stringify(user))
    localStorage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify(user))
  })
}

export default [localStoreagePlugin]