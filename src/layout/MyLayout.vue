<template>
  <q-layout class="content" view="lHh Lpr lFf">
    <Menu/>
    <q-page-container>
        <q-page>
          <router-view />
          <AddRestaurant :dataDialog.sync="dialog"/>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="red" @click="displayDialog()"/>
          </q-page-sticky>
        </q-page>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.btn-float{
  margin-top: 100px;
}
.content{
  background-color: #F8F8F8;
}
</style>
<script>
import Menu from '@/components/Menu.vue';
import AddRestaurant from '@/components/AddRestaurant.vue';
import { mapActions } from 'vuex';
export default {
  components: {
     Menu,
     AddRestaurant,
  },
  data: () => ({
    dialog: false,
  }),
  methods:{
    ...mapActions('restaurant',['getRestaurant']),
    displayDialog(){
      this.dialog = true;
    },
  },
  watch: {
    'dialog': function (newValue) {
      if(!newValue){
        this.getRestaurant();
      }
    }
  },
}
</script>