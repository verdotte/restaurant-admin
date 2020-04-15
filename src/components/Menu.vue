<template>
  <div>
    <q-header>
      <q-toolbar class="menu-bar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title class="my-header text-bold">
          Alimento
        </q-toolbar-title>
        <div class="text-user text-grey">
          {{getProfile.username}}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list class="side-bar my-header">
        <q-btn class="btn-add" size="17px" rounded @click="displayDialog()" label="Add Food" color="red" text-color="white"/>
        <q-item clickable :active="link === 'restaurant'" @click="openLink('restaurant')" active-class="link">
          <q-item-section avatar>
            <q-icon name="restaurant" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Restaurant</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :active="link === 'food'" @click="openLink('food')" active-class="link">
          <q-item-section avatar>
            <q-icon name="restaurant_menu"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Food</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :active="link === 'order'" @click="openLink('order')" active-class="link">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Incoming Order</q-item-label>
            <q-badge class="badge" color="red" floating>10</q-badge>
          </q-item-section>
        </q-item>
        <q-item clickable :active="link === 'stats'" @click="openLink('stats')" active-class="link">
          <q-item-section avatar>
            <q-icon name="shop" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Statistics</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item clickable @click="signOut()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <AddFood :dataDialog.sync="dialog"/>
  </div>
</template>

<style scoped>
.btn-add{
  color: white;
  font-size: 20px;
  font-family: 'Raleway';
  font-weight: bold;
  margin: 20px 10px 20px 10px;
}
.menu-bar{
  background: #fff;
  font-family: 'Raleway';
  color: red;
  box-shadow: 0px;
}
.text-title{
  font-family: 'Raleway';
  text-align: start;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
.side-bar{
  font-family: 'Raleway';
  font-size: 16px;
}
.badge{
  margin: 10px 85px 0 0;
  border-radius: 50%;
}
.text-user{
  font-size: 16px;
  font-weight: bold;
}
.link{
  background-color: #E0E0E0;
  color: black;
}
</style>
<script>
import AddFood from '@/components/AddFood.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Menu',
  components: {
    AddFood
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      dialog: false,
      link: 'restaurant',
    }
  },
  methods:{
    ...mapActions('user',['logout', 'profile']),
    ...mapActions('food',['getFood']),
    signOut(){
      this.logout()
      .then(() => this.$router.push('/login'))
    },
    displayDialog(){
      this.dialog = true;
    },
    openLink(linkName){
      this.link = linkName;
      linkName === 'restaurant' ? this.$router.push('/') : this.$router.push(`${linkName}`);
    }
  },
  computed: {
    ...mapGetters('user',['getProfile'])
  },
  created(){
    this.profile();
  },
  watch: {
    'dialog': function (newValue) {
      if(!newValue){
        this.getFood();
      }
    }
  },
}
</script>