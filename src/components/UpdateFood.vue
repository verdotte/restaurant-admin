<template>
  <div class="q-pa-md">
    <q-dialog v-model="dataDialog" persistent>
      <q-card class="column full-height" style="width: 400px">
        <q-card-section>
          <div class="position"><q-btn icon="close" flat round @click.native="close()"/></div>
          <div class="content q-gutter-md">
            <div class="col text-h6 ellipsis">
              Edit Food
            </div>
              <q-card class="my-card">
                <q-avatar class="img-avatar" rounded>
                  <img v-if="foodData.foodImage" :src="foodData.foodImage">
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
              <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="foodData.foodName" label="Food Name" />
              <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="foodData.foodPrice" label="Food Price" />
              <q-select outlined v-model="foodData.cookingTime" :options="cookingTime" label="Cooking Time" />
              <q-select
              class="select-class"
              outlined
              v-model="restaurant"
              :label="foodData.restaurantName"
              :options=" allRestaurant.map(({ restaurantName, _id }) => {
                return {
                  label: restaurantName,
                  _id
                }
              })"
              />
              <q-spinner
                v-if="loading"
                color="red"
                size="3em"
                :thickness="5"
                class="spinner"
              />
              <q-btn v-else class="add" label="Add"  @click="updateFood()" color="red"/>
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
import { cookingTime } from '../helpers/constant';
export default {
    props: {
      dataDialog: {
        type: Boolean
      },
      foodData: {
        type: Object,
      }
    },
  data: () => ({
    show: true,
    loading: false,
    file: null,
    cookingTime,
    restaurant: null
  }),
  methods: {
      ...mapActions('restaurant',['getRestaurant']),
      ...mapActions('food',['getFood', 'editFood']),
      close() {
        this.$emit('update:dataDialog', false);
      },
      preview (event) {
      const input = event.target
      if (input.files && input.files[0]) {
        this.file = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.foodData.foodImage = e.target.result
          this.show = false
        }
        reader.readAsDataURL(input.files[0])
      }
      },
        updateFood () {
            this.loading = true;
            if (this.file){
            const ref = storageRef.child(this.file.name).put(this.file, { contentType: this.file.type })
            ref.then((result) => {
                result.ref.getDownloadURL().then(url => {
                    if(url){
                        this.foodData.foodImage = url;
                        this.handleUpdate();
                    }
                })
            }).catch((err) => {
                alert('error ' + err.message)
            })
            }else{
            this.handleUpdate();
            }
        },
        handleUpdate(){
            const { foodData, restaurant } = this;
            const foodItem = {
                slug: foodData.slug,
                foodName: foodData.foodName,
                foodImage: foodData.foodImage,
                foodPrice: foodData.foodPrice,
                cookingTime: foodData.cookingTime,
                restaurantId: restaurant ? this.restaurant._id : foodData.restaurantId
            }
            this.editFood(foodItem);
            this.loading = false;
            this.close();
            this.getFood();
        }
  },
  computed: {
    ...mapGetters('restaurant',['allRestaurant'])
  },
  created () {
    this.getRestaurant();
  },
}
</script>
