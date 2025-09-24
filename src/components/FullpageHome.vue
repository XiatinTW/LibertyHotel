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

let fpInstance = null;

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
    fpInstance = new fullpage('#fullpage', {
      navigation: true,
      licenseKey: 'gplv3',
      afterLoad: (origin, destination, direction) => {
        this.$root.$emit('sectionChange', destination.index)
      }
    });
  },
  beforeDestroy() {
    // 切換到其他路由銷毀 fullpage.js
    if (fpInstance && fpInstance.destroy) {
      fpInstance.destroy('all');
    }
    // 移除 fullpage.js 產生的 DOM
    const fpNav = document.getElementById('fp-nav');
    if (fpNav) fpNav.remove();
    const fpWatermark = document.querySelector('.fp-watermark');
    if (fpWatermark) fpWatermark.remove();
    // 還原 body 和 html 的 class
    document.body.className = '';
    document.documentElement.className = '';
    document.body.style = '';
    document.documentElement.style = '';
  }
}
</script>

<style lang="scss">
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

/* fullpage.js 的基本樣式（只影響本頁） */
body:not(.fp-responsive) .fp-overflow {
  width: 100% !important;
}
#fp-nav ul li a span,
.fp-slidesNav ul li a span {
  background: #879aaf !important;
}
#fp-nav ul li a.active span, .fp-slidesNav ul li a.active span, #fp-nav ul li:hover a.active span, .fp-slidesNav ul li:hover a.active span {
  background: #546980 !important;
}
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
