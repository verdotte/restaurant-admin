import RestaurantService from '../../services/restaurantService';

const state = {
    restaurants: [],
    newInsert: [],
}

const getters = {
    allRestaurant: state => state.restaurants
}

const actions = {
  async addRestaurant({commit}, restaurantData){
    const response = await RestaurantService.create(restaurantData);
    commit('newRestaurant', response);
  },

  async getRestaurant({commit}){
    const response = await RestaurantService.getAll();
    commit('setRestaurant', response);
  },

  async removeRestaurant({commit}, slug){
      const response = await RestaurantService.delete(slug);
      commit('deleteRestaurant', response);
  },

  async editRestaurant({commit}, restaurantData){
      const { slug, restaurantName, restaurantImage, restaurantAddress, restaurantContact } = restaurantData;
      const response = await RestaurantService.update(slug, {
          restaurantName,
          restaurantImage,
          restaurantAddress,
          restaurantContact
        });
      commit('updateRestaurant', response);
  }
}

const mutations = {
    newRestaurant: (state, response) => ( state.newInsert = response ),
    setRestaurant: (state, response) => ( state.restaurants = response),
    deleteRestaurant: (state, response) => (state.newInsert = response),
    updateRestaurant: (state, response) => ( state.newInsert = response ),
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
