<template lang="pug">
div
  main.home
    span.home__title
    span.home__text
  .CheckRoom
    .check-room__body
      // 人數/房間選擇器
      .check-room__person-selector(@click="showSelector = true")
        span
          | {{ adults }} 位成人 · {{ children }} 位孩童 · {{ rooms }} 間房
        i.check-room__person-selector_arrow-down
      // 彈出選單
      .check-room__body_selector-popup(v-if="showSelector", @click.stop)
        .check-room__body_selector-popup_selector-row
          span 標籤 成人
          button(@click="change('adults', -1)", :disabled="adults <= 1") -
          span {{ adults }}
          button(@click="change('adults', 1)") +
        .check-room__body_selector-popup_selector-row
          span 標籤 孩童
          button(@click="change('children', -1)", :disabled="children <= 0") -
          span {{ children }}
          button(@click="change('children', 1)") +
        .check-room__body_selector-popup_selector-row
          span 標籤 客房
          button(@click="change('rooms', -1)", :disabled="rooms <= 1") -
          span {{ rooms }}
          button(@click="change('rooms', 1)") +
        .check-room__body_selector-popup_selector-actions
          button(@click="showSelector = false") 完成
      DatePicker(
        v-model="dateRange"
        range
        placeholder="請選擇入住日與退房日"
        range-separator="－"
        format="YYYY-MM-DD"
        :disabled-date="disabledDate"
      )
      button.check-room__body_btn(@click="goRoomList") 查詢空房

</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import roomsData from '@/data/rooms.json';
import { mapActions } from 'vuex';
export default {
  name: 'HomePage',
  components: { DatePicker },
  data() {
    return {
      showSelector: false,
      adults: 2,
      children: 0,
      rooms: 1,
      dateRange: [],
      availableDates: []
    }
  },
  watch: {
    showSelector(val) {
      if (val) {
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },
    dateRange(val) {
      // 日期選擇時同步到 Vuex
      this.updateDateRange(val);
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  created() {
    // 計算所有房型有空房的日期
    const dateSet = new Set();
    roomsData.forEach(room => {
      room.availability.forEach(a => {
        if (a.rooms > 0) dateSet.add(a.date);
      });
    });
    this.availableDates = Array.from(dateSet);
  },
  methods: {
    ...mapActions(['updateDateRange']),
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
    },
    goRoomList() {
      if (this.dateRange.length === 2) {
        // 查詢前同步到 Vuex
        this.updateDateRange(this.dateRange);
        const formatDate = d => {
          if (!d) return '';
          if (typeof d === 'string') return d;
          if (d instanceof Date) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
          }
          if (d.format) return d.format('YYYY-MM-DD');
          return String(d);
        };
        const start = formatDate(this.dateRange[0]);
        const end = formatDate(this.dateRange[1]);
        this.$router.push({
          path: '/roomlist',
          // 不再需要 query，直接跳轉即可
        });
      } else {
        alert('請選擇入住日與退房日');
      }
    },
    disabledDate(date) {
      // date 是原生 Date 物件
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const d = `${yyyy}-${mm}-${dd}`;
      return !this.availableDates.includes(d);
    }
  }
}
</script>

<style lang="scss">
#app {
  @mixin flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @mixin flex_center_space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  main.home {
    @include flex_center;
    width: 100vw;
    height: 100vh;
    align-items: center;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('@/assets/background.jpg');
  }

  .home__title {
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

  .home__text {
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
  }

  .check-room__body {
    @include flex_center_space-between;
    width: 100vh;
    padding: 10px 13px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(6px);
  }

  .check-room__person-selector {
    @include flex_center_space-between;
    border-radius: 8px;
    padding: 8px 18px;
    cursor: pointer;
    font-size: 16px;
    color: #546980;
    min-width: 260px;
    position: relative;
    margin-right: 20px;
  }

  .check-room__person-selector_arrow-down {
    border: solid #888;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    margin-left: 8px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .check-room__body_selector-popup {
    position: absolute;
    bottom: 70px;
    left: 10px;
    z-index: 10;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
    padding: 24px 32px 16px 32px;
    min-width: 240px;
  }

  .check-room__body_selector-popup_selector-row {
    @include flex_center_space-between;
    margin-bottom: 18px;

    span {
      text-align: center;
      font-size: 16px;
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

  .check-room__body_selector-popup_selector-actions {
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

  .mx-input-wrapper {
    @include flex_center;
    padding: 10px;
    border: none;
    background: transparent;
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
        color: #546980;
        ;
        /* 你可以自訂顏色 */
        opacity: 1;
        /* 保持不透明 */
      }
    }
  }

  .check-room__body_btn {
    @include flex_center;
    width: 100%;
    height: 100%;
    max-width: 212px;
    max-height: 75px;
    flex-direction: column;
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

  @media (max-width: 1024px) {
    .CheckRoom {
      width: 90vw;
      height: 20%;
      bottom: 20px;
    }

    .check-room__body {
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .check-room__person-selector {
      margin-right: 0;
      width: 100%;
      justify-content: center;
    }

    .mx-datepicker-range {
      width: 100%;
    }

    .mx-input-wrapper .mx-input {
      text-align: center;
    }

    .check-room__body_btn {
      max-width: none;
      height: 20%;
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .CheckRoom {
      width: 80vw;
    }

    .home__title {
      height: 50vw;
      top: 35%;
    }

    .home__text {
      width: 50%;
      height: 10vw;
      top: 45%;
    }
  }
}
</style>