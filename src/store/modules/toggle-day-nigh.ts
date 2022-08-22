import { Module } from 'vuex'

export const toggleSwitchDayNigth: Module<any, any> = {
  state: {
    night: false,
  },
  getters: {
    showDayNightStatus(state) {
      return state.night
    },

  },
  mutations: {
    changeDayNightStatus: (state) => {
      state.night = !state.night
      
    },
  },
  actions: {
    switchDayNight({ commit }) {
      commit('changeDayNightStatus')
    },
  },
}
export default toggleSwitchDayNigth
