import server from '../../helpers/server';

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
  async login({commit}, userItem){
    try {
        commit('authRequest');
        const userData = await server.post(`login`, userItem);
        const { username, token } = userData.data.data;
        localStorage.setItem('token', token);
        commit('authSuccess', { token, username });
        console.log(userData.data.data.token);
    } catch (error) {
        commit('authError')
        localStorage.removeItem('token')
    }
  },
  async profile({commit}){
    try {
        const userData = await server.get(`profile`);
        commit('setUser', userData.data.data.username);
    } catch (error) {
        commit('authError')
    }
},
logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
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