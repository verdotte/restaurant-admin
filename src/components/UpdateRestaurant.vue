<template>
  <div class="q-pa-md">
    <q-dialog v-model="dataDialog" persistent>
      <q-card class="column full-height" style="width: 400px">
        <q-card-section>
          <div class="position"><q-btn icon="close" flat round @click.native="close()"/></div>
          <div class="content q-gutter-md">
            <div class="col text-h6 ellipsis">
              UPDATE RESTAURANT
            </div>
              <q-card class="my-card">
              <q-avatar class="img-avatar" rounded>
                  <img v-if="restaurantData.restaurantImage" :src="restaurantData.restaurantImage">
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
                <q-input outlined v-model="restaurantData.restaurantName" label="Restaurant Name" />
                <q-input outlined v-model="restaurantData.restaurantAddress" label="Restaurant Address" />
                <q-input outlined v-model="restaurantData.restaurantContact" label="Phone Number" />
                <q-spinner
                  v-if="loading"
                  color="red"
                  size="3em"
                  :thickness="5"
                />
                <q-btn v-else class="add" label="Add"  @click="updateRestaurant()" color="red"/>
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
import { mapActions } from 'vuex';
export default {
    props: {
      dataDialog: {
        type: Boolean
      },
      restaurantData: {
        type: Object,
      }
    },
    data: () => ({
      show: true,
      loading: false,
      file: null,
    }),
    methods: {
      ...mapActions('restaurant',['editRestaurant', 'getRestaurant']),
      close() {
        this.$emit('update:dataDialog', false)
      },
      preview: function (event) {
      const input = event.target
      if (input.files && input.files[0]) {
        this.file = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.restaurantData.restaurantImage = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
      },
      updateRestaurant () {
        this.loading = true;
          if (this.file){
          const ref = storageRef.child(this.file.name).put(this.file, { contentType: this.file.type })
          ref.then((result) => {
            result.ref.getDownloadURL().then(url => {
              if(url){
                this.restaurantData.restaurantImage = url;
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
      this.editRestaurant(this.restaurantData);
      this.loading = false;
      this.close();
    }
  },
}
</script>
