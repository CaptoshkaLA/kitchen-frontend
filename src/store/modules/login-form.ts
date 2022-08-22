import { Module } from 'vuex';

export const loginFormModule: Module<any, any> = {
  state: {
    user: {
      role: null,
    },
    errorLogin: false,
    isAdmin: false,
  },
  getters: {
    getUser(state) {
      return state.user;
    },

    getUserId(state) {
      return state.user.userId;
    },
    getErrorLogin(state) {
      return state.errorLogin;
    },
    getIsAdmin(state) {
      if (state.user?.role === 'admin') return !state.isAdmin;
      else return state.isAdmin;
    },
  },
  mutations: {
    changeUser: async (state, { login, password }) => {
      try {
        const request = await fetch(
          `${process.env.VUE_APP_BASE_URL}/auth/sign-in`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
              login,
              password,
            }),
          }
        );

        if (request.ok) {
          state.errorLogin = false;
          const response = await request.json();

          state.user = response.user;
        } else {
          throw Response;
        }
      } catch (error) {
        state.errorLogin = true;
      }
    },
    changeErrorLogin(state) {
      state.errorLogin = false;
    },

    changeRole(state) {
      if (state.user?.role === 'user') state.user.role = 'admin';
      else state.user.role = 'user';
    },
  },
  actions: {
    loginUser({ commit }, { login, password }) {
      commit('changeUser', { login, password });
    },
  },
};
export default loginFormModule;
