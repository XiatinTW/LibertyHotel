<template lang="pug">
div#fullpage-home
  #fullpage
      .section
        Home/
      .section
        Info/
      .section
        FacilityServices/
      .section
        Roominfo/
      .section
        Notice/
      .section
        attractionsPage/
      .section
        about/
</template>

<script>
import Home from "./home.vue";
import 'fullpage.js/dist/fullpage.css'
import fullpage from 'fullpage.js'
import Info from ".//info.vue";
import FacilityServices from "./FacilityServices.vue";
import Roominfo from "./Roominfo.vue";
import about from "./about.vue";
import attractionsPage from "./attractions.vue";
import Notice from "./Notice.vue";

export default {
    name: 'FullpageHome',
    components: {
        Home,
        Info,
        FacilityServices,
        Roominfo,
        about,
        attractionsPage,
        Notice
    },
    mounted() {
        new fullpage('#fullpage', {
            navigation: true,
            licenseKey: 'gplv3',
            afterLoad: (origin, destination, direction) => {
                this.$root.$emit('sectionChange', destination.index)
            }
        })
    }
}
</script>

<style scoped lang="scss">
#fullpage-home {
    min-height: 100vh;
}

.section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
}

</style>
