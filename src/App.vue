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