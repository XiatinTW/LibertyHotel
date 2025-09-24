<template lang="pug">
div
  main.about
    .about__title
      h1 聯絡我們
    .about__text
      p 訂房專線： 撥打 +XXX-XX-XXXX-XXXX
      p 總機： 撥打 +XXX-XX-XXXX-XXXX
      p 備註： 你可以註明服務時間，例如「服務時間：每日 09:00 - 21:00」。
      p 訂房諮詢： reservations@freehotel.com
      p 一般事務： info@freehotel.com
      p 備註： 可以註明「我們將在 24 小時內回覆您的郵件」。
      p 飯店地址： 
      img(src="@/assets/maps.jpg" alt="飯店地址")
    
</template>

<script>
export default {
  name: 'aboutPage'
}
</script>

<style lang="scss">
#app {


  main.about {
    display: flex;
    width: 100vw;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('src/assets/backgroud2.jpg');
    will-change: background-image;
  }

  .about__title {
    margin-top: 100px;

    h1 {
      color: #546980;
      text-align: center;
      font-family: "Noto Sans";
      font-size: 96px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin: 0;
      font-family: 'Noto Sans TC';
    }
  }

  .about__text {
    p {
      color: #546980;
      font-family: "Noto Sans";
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 200%;
      font-family: 'Noto Sans TC';
    }
  }

  @media (max-width: 1024px) {
    .about__title {
      margin-top: 50px;

      h1 {
        font-size: 48px;
      }
    }

    .about__text {
      display: flex;
      flex-direction: column;
      align-items: start;
      max-width: 80%;

      p {
        font-size: 14px;
        line-height: 150%;
      }

      img {
        width: 100%;
      }
    }
  }
}
</style>