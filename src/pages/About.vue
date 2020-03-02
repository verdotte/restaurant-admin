<template>
  <div id="app">
   <h1>Login To my App {{getProfile.username}}</h1>
   <div>
    <button @click="signup()">Register</button>
    </div>
  </div>
</template>

<style scoped>
h1{
  font-family: 'Raleway';
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return{

        }
    },
    methods: {
        ...mapActions('user',['login', 'profile']),
        signup(){
            let data = {
                username: 'verdottelojo',
                password: 'lalaxx12223'
            };
        this.profile(data)
        .then((data) => console.log(data))
        .catch(err => console.log(err));
        console.log(this.getProfile);
        }

    },
    computed: {
    ...mapGetters('user',['isLoggin', 'getProfile'])
  },
}
</script>

