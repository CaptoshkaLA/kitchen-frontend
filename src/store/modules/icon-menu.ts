import { Module } from 'vuex'

export const menuIconModule: Module<any, any> = {
  state: {
    isMenuShowed: false,
  },
  getters: {
    showIconMenu(state) {
      return state.isMenuShowed
    },
  },
  mutations: {
    changeMenuVisible: (state) => {
      state.isMenuShowed = !state.isMenuShowed
    },
  },
  actions: {
    toggleMenuIcon({ commit }) {
      commit('changeMenuVisible')
    },
  },
}
export default menuIconModule
