<template>
  <q-layout class="my-font" view="lHh Lpr lFf">
    <Header :item="msg"/>
    <q-page-container>
        <q-page>
          <router-view />
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="red" />
          </q-page-sticky>
        </q-page>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.btn-float{
  margin-top: 100px;
}
</style>
<script>
import Header from '@/components/Menu.vue';
export default {
  components: {
     Header,
  },
  data: () => ({
    msg: {
      name: 'verdotte',
      age: 20,
    }
  })
}
</script>