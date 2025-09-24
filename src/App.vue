<template lang="pug">
#app
  NavBar
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
import 'fullpage.js/dist/fullpage.css'
import fullpage from 'fullpage.js'

import Home from "./components/home.vue";
import NavBar from "./components/nav.vue";
import Info from "./components/info.vue";
import FacilityServices from "./components/FacilityServices.vue";
import Roominfo from "./components/Roominfo.vue";
import about from "./components/about.vue";
import attractionsPage from "./components/attractions.vue";
import Notice from "./components/Notice.vue";

export default {
  name: 'App',
  components: {
    Home,
    NavBar,
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
      // destination.index 代表目前 section 的 index
      this.$root.$emit('sectionChange', destination.index)
    }
    })
  }
}

</script>

<style lang="scss">
#app {
  min-height: 100vh;

  /* fullpage.js 的基本樣式 */
  .section {
    /* 設定每一屏的樣式 */
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

}

/* fullpage.js 的基本樣式 */
body:not(.fp-responsive) .fp-overflow {
  width: 100% !important;
}
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  background: #879aaf !important;
}

/* 選中顏色 */
#fp-nav ul li a.active span, .fp-slidesNav ul li a.active span, #fp-nav ul li:hover a.active span, .fp-slidesNav ul li:hover a.active span {
  background: #546980 !important;
}

/* 靠左 */
#fp-nav {
  left: 20px !important;
  right: auto !important;
}
.fp-warning, .fp-watermark {
  display: none !important;
}

@media (max-width: 768px) {
  #fp-nav {
    left: 5px !important;
  }
}
</style>