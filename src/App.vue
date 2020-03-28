<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import server from '../src/helpers/server'
export default {
  name: 'App',
  methods:{
    ...mapActions('user',['logout']),
  },
  created () {
    server.interceptors.response.use((response) => {
      if(response.status === 401) {
        this.logout();
      }
      return response;
    });
  }
}
</script>
