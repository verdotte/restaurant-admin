import server from '../helpers/server';

class RestaurantService {

   static async create (restaurant){
       try {
            const res = await server.post(`restaurant`, restaurant);
            const { data } = res.data;
            return data;
       } catch (error) {
            return { error }
       }
   }

   static async getAll (){
       try {
            const res = await server.get(`restaurant`);
            const { data } = res.data;
            return data;
       } catch (error) {
           return { error }
       }
    }

    static async delete(slug) {
        try {
            const res = await server.delete(`restaurant/${slug}`);
            const { data } = res.data;
            return data;
        } catch (error) {
            return { error }
        }
    }

    static async update(slug, restaurant) {
        try {
            const res = await server.put(`restaurant/${slug}`, restaurant);
            const { data } = res.data;
            return data;
        } catch (error) {
            return { error }
        }
    }

}

export default RestaurantService;
