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
          verdotte
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list class="side-bar my-header">
        <q-btn class="btn-add" size="17px" rounded to="/add" label="Add Restaurant" color="red" text-color="white"/>
        <q-item clickable >
          <q-item-section avatar>
            <q-icon name="restaurant" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Restaurant</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="restaurant_menu" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Food</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Incoming Orders</q-item-label>
            <q-badge class="badge" color="red" floating>10</q-badge>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="shop" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Processed Orders</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>

<style>
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
</style>
<script>
export default {
  name: 'Menu',
  props: ['item'],
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>