import FoodService from '../../services/foodService';

const state = {
    foods: [],
    newInsert: [],
}

const getters = {
    allFood: state => state.foods
}

const actions = {
  async addFood({commit}, foodData){
    const { foodName, foodPrice, foodImage, cookingTime, restaurantId, slug } = foodData;
    const response = await FoodService.create(
      slug,
      {
        foodName,
        foodPrice,
        foodImage,
        cookingTime,
        restaurantId
      }
    );
    commit('newFood', response);
  },

  async getFood({commit}){
    const response = await FoodService.getAll();
    commit('setFood', response);
  },

  async removeFood({commit}, slug){
      const response = await FoodService.delete(slug);
      commit('deleteFood', response);
  },

  async editFood({commit}, foodData){
      const { slug, foodName, foodImage, foodPrice, cookingTime, restaurantId } = foodData;
      const response = await FoodService.update(
        slug,
        {
          foodName,
          foodImage,
          foodPrice,
          cookingTime,
          restaurantId
        });
      commit('updateFood', response);
  }
}

const mutations = {
    newFood: (state, response) => ( state.newInsert = response),
    setFood: (state, response) => ( state.foods = response),
    deleteFood: (state, response) => (state.newInsert = response),
    updateFood: (state, response) => ( state.newInsert = response ),
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
