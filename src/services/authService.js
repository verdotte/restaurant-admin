import server from '../helpers/server';

class AuthService {

   static async signup (user){
       const res = await server.post(`auth/signup`, user);
       const { username, token } = res.data.data;
       localStorage.setItem('token', token);
       return {
           username,
           token
       }
   }

   static async login (user){
        const res = await server.post(`auth/login`, user);
        const { username, token } = res.data.data;
        localStorage.setItem('token', token);
        return {
            username,
            token
        }
    }

    static async logout() {
        localStorage.removeItem('token')
    }

    static async profile() {
        const res = await server.get(`auth/profile`);
        const { username } = res.data.data;
        return username;
    }
}

export default AuthService;
