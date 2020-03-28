<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-xl">
      <div class="col-4" v-for="(restaurant, index) in allRestaurant" :key="`sm-${restaurant.slug}`">
        <q-card class="my-card">
          <q-img
          :src="restaurant.restaurantImage"
          spinner-color="red"
          style="height: 180px;"
          />
          <q-card-section class="q-pt-none">
            <div class="col text-h6 ellipsis">
              {{ restaurant.restaurantName }}
            </div>
            <div class="txt text-subtitle1">
              {{ restaurant.restaurantAddress }}
            </div>
            <div class="txt text-subtitle1 text-grey">
              {{ restaurant.restaurantContact }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="btn">
            <q-btn @click="updateRestaurant(restaurant)" flat color="primary" icon="edit" />
            <q-btn @click="deleteRestaurant(restaurant.slug, index)" flat color="red" icon="delete"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>

      <!-- delete dialog -->
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="red" text-color="white" />
            <span class=" txt q-ml-sm">Are you sure you want to delete this item.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Ok" color="primary" @click="handleDelete()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <UpdateRestaurant :dataDialog.sync="dialog" :restaurantData="updateData"/>
  </div>
</template>

<style scoped>
.my-card{
  width: 100%;
  font-family: 'Raleway';
}
.q-pa-md{
  padding: 40px;
}
.txt{
  font-family: 'Roboto';
}
.btn{
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<script>
import UpdateRestaurant from '@/components/UpdateRestaurant';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Home',
  components: {
    UpdateRestaurant,
  },
  data: () => ({
    confirm: false,
    dialog: false,
    slug: null,
    index: null,
    updateData: {},
  }),
  methods: {
    ...mapActions('restaurant',['getRestaurant', 'removeRestaurant']),
    deleteRestaurant(slug, index){
      this.confirm = true;
      this.slug = slug;
      this.index = index;
    },
    handleDelete(){
      this.removeRestaurant(this.slug);
      this.confirm = false;
      this.allRestaurant.splice(this.index, 1);
    },
    updateRestaurant(restaurant){
      this.updateData = restaurant;
      this.dialog = true;
    },
  },
  computed: {
    ...mapGetters('restaurant',['allRestaurant'])
  },
  created(){
    this.getRestaurant();
  },
}
</script>
