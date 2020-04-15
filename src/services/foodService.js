import server from '../helpers/server';

class FoodService {

   static async create (restaurantSlug, food){
       try {
            const res = await server.post(`food/${restaurantSlug}`, food);
            const { data } = res.data;
            return data;
       } catch (error) {
            return { error }
       }
   }

   static async getAll (){
       try {
            const res = await server.get(`food`);
            const { data } = res.data;
            return data;
       } catch (error) {
           return { error }
       }
    }

    static async delete(foodSlug) {
        try {
            const res = await server.delete(`food/${foodSlug}`);
            const { data } = res.data;
            return data;
        } catch (error) {
            return { error }
        }
    }

    static async update(foodSlug, food) {
        try {
            const res = await server.put(`food/${foodSlug}`, food);
            const { data } = res.data;
            return data;
        } catch (error) {
            return { error }
        }
    }

}

export default FoodService;