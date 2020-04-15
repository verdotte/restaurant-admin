<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-xl">
      <div class="col-4" v-for="(food, index) in allFood" :key="`sm-${food.slug}`">
        <q-card class="my-card">
          <q-img
          :src="food.foodImage"
          spinner-color="red"
          style="height: 180px;"
          />
          <q-card-section class="q-pt-none">
            <div class="col text-h6 ellipsis">
                <q-icon name="restaurant_menu" class="icon-style"/>
                {{ food.foodName }}
            </div>
            <div class="text-subtitle1">
                <q-icon name="money" class="icon-style"/>
                {{ food.foodPrice }} shs
            </div>
            <div class="text-subtitle1">
                <q-icon name="access_alarm" class="icon-style"/>
                {{ food.cookingTime }} minutes
            </div>
            <div class="txt text-subtitle1 text-grey">
                <q-icon name="restaurant" class="icon-style"/>
                {{ food.restaurantName }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="btn">
            <q-btn @click="updateFood(food)" flat color="primary" icon="edit" />
            <q-btn @click="deleteFood(food.slug, index)" flat color="red" icon="delete"/>
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
            <q-btn @click="handleDelete()" label="Ok" color="primary"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <UpdateFood :dataDialog.sync="dialog" :foodData="updateData"/>
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
.icon-style{
    color: red;
    font-size: 1.3em;
    margin-right: 5px;
}
</style>

<script>
import UpdateFood from '../components/UpdateFood';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Home',
    components: {
        UpdateFood
    },
    data: () => ({
        confirm: false,
        dialog: false,
        slug: null,
        index: null,
        updateData: {},
    }),
    methods: {
        ...mapActions('food',['getFood', 'removeFood']),
        updateFood(food) {
            this.updateData = food;
            this.dialog = true;
        },
        deleteFood(slug, index){
            this.confirm = true;
            this.slug = slug;
            this.index = index;
        },
        handleDelete(){
            this.removeFood(this.slug);
            this.confirm = false;
            this.allFood.splice(this.index, 1);
        }
    },
    computed: {
        ...mapGetters('food',['allFood'])
    },
    created(){
        this.getFood();
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
