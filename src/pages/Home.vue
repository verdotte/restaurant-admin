<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-xl">
      <div class="col-4" v-for="n in 7" :key="`sm-${n}`">
        <q-card class="my-card">
          <img src="../assets/images/kfc.jpg" />
          <q-card-section class="q-pt-none">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="txt text-subtitle1">
              Kansanga
            </div>
            <div class="txt text-subtitle1 text-grey">
              +25677777234
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn @click="confirm = true"  color="primary" icon="edit" />
            <q-btn  color="red" icon="delete"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>

      <!-- dialog box -->
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
            <span class=" txt q-ml-sm">Are you sure you want to delete this item.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Ok" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>
</template>

<style scoped>
.my-card{
  width: 100%;
  font-family: 'Raleway';
}
.q-pa-md{
  padding: 40px;
  background-color: #F8F8F8;
}
.txt{
  font-family: 'Roboto';
}
</style>

<script>
export default {
  name: 'Home',
  data: () => ({
    confirm: false,
  })
}
</script>
