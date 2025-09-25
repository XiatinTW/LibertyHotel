<template lang="pug">
div
  main.info
    .info__title
      h1 關於 LibertyHotel
    .info__text
      p 在一個充滿規則與拘束的世界，我們夢想創造一個真正自由、無拘無束的空間，
        | 讓每位旅人都能在這裡找到內心的平靜。
      p LibertyHotel 的誕生，正是基於這個簡單而強烈的理念。
      p 我們的故事始於一個信念：
        | 旅行不該只是從一個地點到另一個地點，而是一場解放身心、探索自我的旅程。
      p 因此，我們將飯店的每一個細節都打造成一個讓您能隨心所欲、自由呼吸的環境。
      p 從設計到服務，我們都打破了傳統飯店的框架。
        | 這裡沒有制式的行程，沒有過多的干預，只有我們為您準備的舒適與自在。
      p 我們相信，真正的奢華，是擁有選擇與享受當下的自由。
      p LibertyHotel 不僅是一個住宿地點，更是一個提供無限可能的平台。
      p 我們期待與您分享這份自由，
        | 讓您在這裡找到屬於自己的故事，創造獨一無二的回憶。

</template>

<script>
export default {
  name: 'InfoPage'
}
</script>

<style lang="scss">
#app {
  @mixin flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main.info {
    @include flex_center;
    width: 100vw;
    min-height: 100vh;
    flex-direction: column;
    gap: 12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('@/assets/backgroud2.jpg');
    will-change: background-image;
  }

  .info__title {
    margin-top: 100px;

    h1 {
      color: #546980;
      text-align: center;
      font-size: 96px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin: 0;
      font-family: 'Noto Sans TC';
    }
  }

  .info__text {
    p {
      color: #546980;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 400%;
      font-family: 'Noto Sans TC';
    }
  }


  @media (max-width: 1024px) {
    .info__title {
      h1 {
        font-size: 48px;
      }
    }

    .info__text {
      max-width: 70%;

      p {
        font-size: 14px;
        line-height: 200%;
      }
    }
  }

  @media (max-width: 768px) {
    .info__title {
      margin-top: 50px;

      h1 {
        font-size: 32px;
      }
    }

    .info__text {
      max-width: 90%;

      p {
        font-size: 12px;
        line-height: 150%;
      }
    }
  }
}
</style>