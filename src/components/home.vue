<template lang="pug">
div
  main.home
    span.hometitle
    span.hometext
  .CheckRoom
    .body
      // 人數/房間選擇器
      div.person-room-selector(@click="showSelector = true")
        span
          | {{ adults }} 位成人 · {{ children }} 位孩童 · {{ rooms }} 間房
        i.arrow-down
      // 彈出選單
      div.selector-popup(v-if="showSelector", @click.stop)
        .selector-row
          span 標籤 成人
          button(@click="change('adults', -1)", :disabled="adults <= 1") -
          span {{ adults }}
          button(@click="change('adults', 1)") +
        .selector-row
          span 標籤 孩童
          button(@click="change('children', -1)", :disabled="children <= 0") -
          span {{ children }}
          button(@click="change('children', 1)") +
        .selector-row
          span 標籤 客房
          button(@click="change('rooms', -1)", :disabled="rooms <= 1") -
          span {{ rooms }}
          button(@click="change('rooms', 1)") +
        .selector-actions
          button(@click="showSelector = false") 完成
      DatePicker(
        v-model="dateRange"
        range
        placeholder="請選擇入住日與退房日"
        range-separator="－"
        format="YYYY-MM-DD"
      )
      button 查詢空房

</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  name: 'HomePage',
  components: { DatePicker },
  data() {
    return {
      showSelector: false,
      adults: 2,
      children: 0,
      rooms: 1,
      dateRange: []
    }
  },
  watch: {
    showSelector(val) {
      if (val) {
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        document.removeEventListener('click', this.handleOutsideClick)
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(e) {
      const popup = document.querySelector('.selector-popup');
      const selector = document.querySelector('.person-room-selector');
      if (
        this.showSelector &&
        popup && !popup.contains(e.target) &&
        selector && !selector.contains(e.target)
      ) {
        this.showSelector = false;
      }
    },
    change(type, delta) {
      if (type === 'adults') {
        this.adults = Math.max(1, this.adults + delta)
      } else if (type === 'children') {
        this.children = Math.max(0, this.children + delta)
      } else if (type === 'rooms') {
        this.rooms = Math.max(1, this.rooms + delta)
      }
    }
  }


}
</script>

<style lang="scss">
#app {

  main.home {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('@/assets/background.jpg');
    will-change: background-image;
    /* 將 background.jpg 壓縮優化 */
  }

  .hometitle {
    display: block;
    width: min(70vh, 70vw);
    height: min(70vh, 70vw);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    background: url('@/assets/Liberty Hotel.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .hometext {
    display: block;
    width: min(15vh, 15vw);
    height: min(15vh, 15vw);
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    background: url('@/assets/titletext.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .CheckRoom {
    display: flex;
    width: 100vh;
    height: 75px;
    padding: 0 var(--layout-x);
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);

    .body {
      display: flex;
      width: 100vh;
      padding: 10px 13px;
      align-items: center;
      flex: 1 0 0;
      align-self: stretch;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.55);
      backdrop-filter: blur(6px);
      justify-content: space-between;

      .person-room-selector {
        display: flex;
        align-items: center;
        border-radius: 8px;
        justify-content: space-between;
        padding: 8px 18px;
        cursor: pointer;
        font-size: 16px;
        color: #546980;
        min-width: 260px;
        position: relative;
        margin-right: 20px;
      }

      .arrow-down {
        border: solid #888;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 4px;
        margin-left: 8px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }

      .selector-popup {
        position: absolute;
        bottom: 70px;
        left: 10px;
        z-index: 10;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
        padding: 24px 32px 16px 32px;
        min-width: 240px;

        .selector-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;

          span {
            text-align: center;
          }

          button {
            max-width: 32px;
            max-height: 32px;
            border-radius: 50%;
            border: 1px solid #ccc;
            background: #f7f7f7;
            font-size: 20px;
            color: #333;
            margin: 0 8px;

            &:disabled {
              color: #bbb;
              border-color: #eee;
              background: #fafafa;
              cursor: not-allowed;
            }
          }
        }

        .selector-actions {
          display: flex;
          justify-content: center;

          button {
            border-radius: 8px;
            border: 1px solid #546980;
            background: #fff;
            color: #546980;
            font-size: 16px;
            padding: 6px 24px;
            cursor: pointer;

            &:hover {
              background: #f0f8ff;
            }
          }
        }
      }

      .mx-input-wrapper {
        display: flex;
        padding: 10px;
        border: none;
        background: transparent;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex: 1 0 0;

        .mx-input {
          background: transparent;
          border: none;
          box-shadow: none;
          -webkit-box-shadow: none;
          font-size: 16px;
          color: #546980;
          &::placeholder {
            color: #546980;; /* 你可以自訂顏色 */
            opacity: 1; /* 保持不透明 */
          }
        }
      }

      button {
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 212px;
        max-height: 75px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex: 1 0 0;
        align-self: stretch;
        border-radius: 10px;
        border: none;
        background: rgba(255, 255, 255, 0.75);

        font-family: 'Noto Sans TC', sans-serif;
        color: #546980;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        &:hover {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
}
</style>