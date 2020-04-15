<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="../assets/images/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded" style="font-family: 'Raleway';">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      style="width:200px; background: red; color: white; font-family: 'Raleway';"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>