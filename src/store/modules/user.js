import AuthService from '../../services/authService';

const state = {
  status: '',
  user: {},
  profile: {},
  token: localStorage.getItem('token') || '',
}

const getters = {
  isLoggin: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user,
  getProfile: state => state.profile,
}

const actions = {
  async signup({commit}, userData){
    try {
      commit('authRequest');
      const userResponse = await AuthService.signup(userData);
      commit('authSuccess', userResponse);
      return Promise.resolve(userResponse);
    } catch (error) {
      commit('authError');
      localStorage.removeItem('token');
      return Promise.reject(error);
    }
  },

  async login({commit}, userData){
    try {
      commit('authRequest');
      const userResponse = await AuthService.login(userData);
      commit('authSuccess', userResponse);
      return Promise.resolve(userResponse);
    } catch (error) {
      commit('authError');
      localStorage.removeItem('token');
      return Promise.reject(error);
    }
  },

  async profile({commit}){
    try {
      const userResponse = await AuthService.profile();
      commit('setUser', userResponse);
    } catch (error) {
      commit('authError')
    }
},
logout({ commit }) {
    commit('logout')
    AuthService.logout();
    return Promise.resolve();
}

}

const mutations = {
  authRequest: (state) => {
    state.status = 'loading'
  },
  authSuccess: (state, { token, username }) => {
      state.status = 'success',
      state.token = token,
      state.user = { username }
  },
  authError: (state) => {
      state.status = 'error'
  },
  setUser: (state, username) => {
    state.status = 'success',
    state.profile = { username }
  },
  logout(state) {
    state.status = ''
    state.token = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}