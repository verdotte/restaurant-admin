<template>
  <div class="q-pa-md">
    <q-dialog v-model="dataDialog" persistent>
      <q-card class="column full-height" style="width: 400px">
        <q-card-section>
          <div class="position"><q-btn icon="close" flat round @click.native="close()"/></div>
          <div class="content q-gutter-md">
            <div class="col text-h6 ellipsis">
              ADD RESTAURANT
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
                  style="top: 100px; right: 12px"
                  @click="$refs.fileInput.click()"
                />
              </q-card>
              <div class="field-div">
                <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="name" label="Restaurant Name" />
                <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="address" label="Restaurant Address" />
                <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="phone" label="Phone Number" />
                <q-spinner
                  class="spinner"
                  v-if="loading"
                  color="red"
                  size="3em"
                  :thickness="5"
                />
                <q-btn v-else class="add" label="Add"  @click="createRestaurant()" color="red"/>
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
}
input[type="file"] {
    display: none;
}
.position{
  float: right;
}
.field-div{
  margin-top: 30px;
}
.my-card{
  width: 100;
}
.img-avatar{
  width: 100%;
  height: 140px;
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
import { toast } from '../helpers/notifier';
export default {
  props: ['dataDialog'],
  data: () => ({
    show: true,
    loading: false,
    img: null,
    file: null,
    name: '',
    address: '',
    phone: '',
  }),
  methods: {
      ...mapActions('restaurant',['addRestaurant', 'getRestaurant']),
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
      createRestaurant () {
        const { file, handleCreation } = this;
        file ? handleCreation() : toast(this.$q, 'Image required!','red', 'top')
      },
      resetField() {
        this.name = null,
        this.address = null,
        this.phone = null,
        this.img = null
      },
      handleCreation() {
        this.loading = true;
        const { file, name, address, phone, addRestaurant } = this;
        const ref = storageRef.child(file.name).put(this.file, { contentType: file.type });
        ref.then((result) => {
          result.ref.getDownloadURL().then(url => {
            if(url){
              const restaurantData = {
                restaurantName: name,
                restaurantAddress: address,
                restaurantContact: phone,
                restaurantImage: url,
              }
              addRestaurant(restaurantData);
              this.resetField();
              this.loading = false;
              this.close();
              this.getRestaurant();
            }
          })
        }).catch((err) => {
          alert('error ' + err.message)
        })
      }
  },
}
</script>
