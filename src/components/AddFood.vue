<template>
  <div class="q-pa-md">
    <q-dialog v-model="dataDialog" persistent>
      <q-card class="column full-height" style="width: 400px">
        <q-card-section>
          <div class="position"><q-btn icon="close" flat round @click.native="close()"/></div>
          <div class="content q-gutter-md">
            <div class="col text-h6 ellipsis">
              Add Food
            </div>
              <q-card class="my-card">
                <q-avatar class="img-avatar" rounded>
                  <img v-if="show" src="../assets/images/kfc.jpg">
                  <img v-else :src="img">
                </q-avatar>
                <input type="file" ref="fileInput" @change="preview"/>
                <q-btn
                  fab
                  color="primary"
                  icon="add"
                  class="absolute"
                  style="top: 65px; right: 12px"
                  @click="$refs.fileInput.click()"
                />
              </q-card>
              <div class="field-div">
              <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="name" label="Food Name" />
              <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="price" label="Food Price" />
              <q-select outlined v-model="time" :options="cookingTime" label="Cooking Time" />
              <q-select
              class="select-class"
              outlined
              v-model="restaurant"
              :options=" allRestaurant.map(({ restaurantName, slug, _id }) => {
                return {
                  label: restaurantName,
                  slug,
                  _id
                }
              })"
              label="Restaurant Name" />
              <q-spinner
                class="spinner"
                v-if="loading"
                color="red"
                size="3em"
                :thickness="5"
              />
              <q-btn v-else class="add" label="Add"  @click="createFood()" color="red"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<style scoped>
.content{
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Raleway';
}
.add-img{
    background: red;
    color: #fff;
    margin-top: 40px;
    right: 20px;
}
.add{
  width: 100%;
  font-size: 18px;
  margin-top: 10px;
}
input[type="file"] {
    display: none;
}
.position{
  float: right;
}
.field-div{
  margin-top: 20px;
  padding: 5px
}
.my-card{
  width: 100;
}
.img-avatar{
  width: 100%;
  height: 110px;
}
.select-class{
  margin-top: 10px;
}
.spinner{
  margin-top: 20px;
}
</style>
<script>
import storageRef from '../config/firebase';
import { mapActions, mapGetters } from 'vuex';
import { toast } from '../helpers/notifier';
import { cookingTime } from '../helpers/constant';
export default {
  props: ['dataDialog'],
  data: () => ({
    show: true,
    loading: false,
    img: null,
    file: null,
    name: '',
    price: '',
    cookingTime,
    time: '',
    restaurant: '',
  }),
  methods: {
      ...mapActions('restaurant',['getRestaurant']),
      ...mapActions('food',['addFood', 'getFood']),
      close() {
        this.$emit('update:dataDialog', false);
      },
      preview: function (event) {
      const input = event.target
      if (input.files && input.files[0]) {
        this.file = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.img = e.target.result
          this.show = false
        }
        reader.readAsDataURL(input.files[0])
      }
      },
      createFood () {
        const { file, handleCreation } = this;
        file ? handleCreation() : toast(this.$q, 'Image required!','red', 'top')
      },
      resetField() {
        this.name = null,
        this.price = null,
        this.time = null,
        this.img = null,
        this.restaurant = null
      },
      handleCreation() {
        this.loading = true;
        const { file, name, price , time, restaurant, addFood } = this;
        const { slug, _id } = restaurant;
        const ref = storageRef.child(file.name).put(this.file, { contentType: file.type });
        ref.then((result) => {
          result.ref.getDownloadURL().then(url => {
            if(url){
              const foodData = {
                foodName: name,
                foodPrice: price,
                cookingTime: time,
                slug,
                foodImage: url,
                restaurantId: _id
              }
              addFood(foodData);
              this.close();
              this.resetField();
              this.loading = false;
              this.getFood();
            }
          })
        }).catch((err) => {
          alert('error ' + err.message)
        })
      }
  },
  computed: {
    ...mapGetters('restaurant',['allRestaurant'])
  },
  created () {
    this.getRestaurant();
  }
}
</script>
