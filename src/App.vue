<template lang="pug">
#app
  NavBar
  router-view
</template>

<script>
import NavBar from "./components/nav.vue";
export default {
  name: 'App',
  components: {
    NavBar
  }
}

</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
</style>