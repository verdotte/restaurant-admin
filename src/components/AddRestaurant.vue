<template>
  <div class="q-pa-md">
    <q-dialog v-model="dataDialog" persistent>
      <q-card class="column full-height" style="width: 700px">
        <q-card-section>
          <div class="position"><q-btn icon="close" flat round @click.native="close()"/></div>
          <div class="content q-gutter-md">
            <div class="col text-h6 ellipsis">
              ADD RESTAURANT
            </div>
            <q-avatar size="130px"  rounded>
              <img v-if="show" src="../assets/logo.png">
              <img v-else :src="img">
            </q-avatar>
            <input type="file" ref="fileInput" @change="preview"/>
            <q-btn
              size="15px"
              class="add-img"
              round icon="add"
              @click="$refs.fileInput.click()"
            />
          <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="name" label="Restaurant Name" />
          <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="address" label="Restaurant Address" />
          <q-input :rules="[val => !!val || 'Field is required']" outlined v-model="phone" label="Phone Number" />
          <q-spinner
            v-if="loading"
            color="red"
            size="3em"
            :thickness="5"
          />
          <q-btn v-else class="add" label="Add"  @click="createRestaurant()" color="red"/>
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
  width: 97%;
  font-size: 18px;
  margin-top: 10px;
}
input[type="file"] {
    display: none;
}
.position{
  float: right;
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
