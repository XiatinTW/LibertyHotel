<template lang="pug">
div
    main.roomlist
        .roomlist__title
            h1 LibertyHotel
        .rl__content
            .rl__content__process
                span.step(:class="{active: step === 1}") 1. 選擇房型
                span.arrow →
                span.step(:class="{active: step === 2}") 2. 預訂
                span.arrow →
                span.step(:class="{active: step === 3}") 3. 預訂完成
            .rl__content__date-info(v-if="step === 1")
                h2 選擇您的客房
                DatePicker(
                    v-model="localDateRange"
                    range
                    :placeholder="displayDate"
                    range-separator="－"
                    format="YYYY-MM-DD"
                    :disabled-date="disabledDate"
                )
            .rl__content__list(v-if="step === 1")
                template(v-if="availableRooms.length > 0")
                    .rl__content__list__room-card(v-for="room in availableRooms" :key="room.id")
                        .rl__content__list__room-card__img
                            img(:src="room.image", :alt="room.type")
                        .rl__content__list__room-card__info
                            h3 {{ room.type }}
                            ul
                                li(v-for="desc in room.desc") {{ desc }}
                            .rl__content__list__room-card__info__price
                                span.price $ {{ room.price }}
                            .rl__content__list__room-card__info__qty
                                span 空房數：{{ room.available }}
                            button.rl__content__list__room-card__info__btn(:disabled="room.available === 0" @click="selectRoom(room)") 選擇
                template(v-else)
                    .no-room-msg 查無房間😭
                    .recommend-title 😍推薦房型：
                    .rl__content__list__room-card(v-for="room in recommendedRooms" :key="room.id")
                        .rl__content__list__room-card__img
                            img(:src="room.image", :alt="room.type")
                        .rl__content__list__room-card__info
                            h3 {{ room.type }}
                            ul
                                li(v-for="desc in room.desc") {{ desc }}
                            .rl__content__list__room-card__info__price
                                span.price $ {{ room.price }}
                            .rl__content__list__room-card__info__qty
                                span 可預訂日期：{{ room.suggestStart }} ~ {{ room.suggestEnd }}
                                button.rl__content__list__room-card__info__btn(@click="selectRoom(room)" style="display: block; margin: 10px 0;") 選擇
            .rl__c__two(v-if="step === 2 && selectedRoom")
                h3 預訂資訊
                .rl__c__two__order
                    .rl__c__two__order__left 
                        .rl__c__two__order__left__img
                            img(:src="selectedRoom.image", :alt="selectedRoom.type")
                            form(@submit.prevent="confirmOrder")
                        .rl__c__two__order__left__row
                            span 房型
                            span {{ selectedRoom.type }}
                        ul
                            li(v-for="desc in selectedRoom.desc") {{ desc }}
                    .rl__c__two__order__right
                        .rl__c__two__order__right__row
                            span 入住日期
                                span {{ formatDate(startDate) }}
                        .rl__c__two__order__right__row
                            span 退房日期
                                span {{ formatDate(endDate) }}
                        .rl__c__two__order__right__row
                            span 數量
                            input(type="number" v-model.number="selectedCount" min="1" :max="selectedRoom.available")
                        .rl__c__two__order__right__row
                            span 總計
                            span ${{ totalPrice }}
                        .rl__c__two__order__right__form
                            span 姓名
                            input(type="text" v-model="orderName" required)
                        .rl__c__two__order__right__form
                            span 電話
                            input(type="text" v-model="orderPhone" required)
                        button.confirm-btn(type="submit") 送出預訂

</template>

<script>
import roomsData from '@/data/rooms.json';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "roomlistPage",
    components: {
        DatePicker
    },
    data() {
        return {
            step: 1,
            startDate: '',
            endDate: '',
            availableRooms: [],
            selectedRoom: null,
            selectedCount: 1,
            orderName: '',
            orderPhone: '',
            recommendedRooms: [],
            localDateRange: [],
        };
    },
    computed: {
        ...mapGetters(['dateRange', 'displayDate']),
        totalPrice() {
            if (!this.selectedRoom || !this.startDate || !this.endDate) return 0;
            const price = this.selectedRoom.price || 0;
            const count = this.selectedCount || 1;
            // 計算天數（入住日到退房日，退房日不算一天）
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            const days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
            return price * count * days;
        },
    },
    watch: {
        dateRange: {
            handler(val) {
                this.localDateRange = val || [];
                if (val && val.length === 2) {
                    this.startDate = val[0];
                    this.endDate = val[1];
                    this.filterRooms();
                } else {
                    this.startDate = '';
                    this.endDate = '';
                    this.availableRooms = [];
                }
            },
            immediate: true
        },
        localDateRange: {
            handler(val) {
                if (JSON.stringify(val) !== JSON.stringify(this.dateRange)) {
                    this.setDateRange(val);
                }
            }
        }
    },
    methods: {
        ...mapMutations(['setDateRange']),
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        },
        filterRooms() {
            // 只顯示入住到退房日期區間都可入住的房型
            if (!this.startDate || !this.endDate) {
                this.availableRooms = [];
                return;
            }
            // 產生日期區間陣列
            const getDateRange = (start, end) => {
                const arr = [];
                let d = new Date(start);
                const endDate = new Date(end);
                while (d <= endDate) {
                    const yyyy = d.getFullYear();
                    const mm = String(d.getMonth() + 1).padStart(2, '0');
                    const dd = String(d.getDate()).padStart(2, '0');
                    arr.push(`${yyyy}-${mm}-${dd}`);
                    d.setDate(d.getDate() + 1);
                }
                return arr;
            };
            const rangeDates = getDateRange(this.startDate, this.endDate);
            this.availableRooms = roomsData.map(room => {
                // 檢查每一天都要有空房
                let minAvailable = Infinity;
                for (const date of rangeDates) {
                    const avail = room.availability.find(a => a.date === date);
                    if (!avail || avail.rooms <= 0) {
                        minAvailable = 0;
                        break;
                    }
                    if (avail.rooms < minAvailable) minAvailable = avail.rooms;
                }
                return {
                    ...room,
                    available: minAvailable
                };
            }).filter(room => room.available > 0);

            // 推薦房型
            if (this.availableRooms.length === 0) {
                this.recommendedRooms = roomsData.map(room => {
                    // 找出最長連續可預訂區間
                    let maxLen = 0, curLen = 0, startIdx = 0, maxStart = 0, maxEnd = 0;
                    const avails = room.availability;
                    for (let i = 0; i < avails.length; i++) {
                        if (avails[i].rooms > 0) {
                            if (curLen === 0) startIdx = i;
                            curLen++;
                            if (curLen > maxLen) {
                                maxLen = curLen;
                                maxStart = startIdx;
                                maxEnd = i;
                            }
                        } else {
                            curLen = 0;
                        }
                    }
                    return {
                        ...room,
                        suggestStart: avails[maxStart] ? avails[maxStart].date : '',
                        suggestEnd: avails[maxEnd] ? avails[maxEnd].date : ''
                    };
                }).filter(room => room.suggestStart && room.suggestEnd);
            } else {
                this.recommendedRooms = [];
            }
        },
        selectRoom(room) {
            this.selectedRoom = room;
            this.selectedCount = 1;
            // 如果是推薦房型，帶入推薦日期
            if (room.suggestStart && room.suggestEnd) {
                this.startDate = room.suggestStart;
                this.endDate = room.suggestEnd;
            }
            this.step = 2;
        },
        confirmOrder() {
            // 可在此送出資料到後端
            this.step = 3;
        },
        disabledDate(date) {
            // 可根據需求禁用過去日期
            return date < new Date();
        }
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
}

#app {
    background: white;
}

main.roomlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: white;
    padding-bottom: 34px;
}

.roomlist__title {
    display: flex;
    height: 30%;
    flex-direction: column;
    align-items: center;
    gap: 64px;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("@/assets/background.jpg");
    will-change: background-image;

    h1 {
        color: rgba(255, 255, 255, 0.75);
        text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        font-size: 84px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        font-family: "Noto Sans TC";
    }
}

.rl__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100vh;
    height: 100%;
    padding: 0px var(--Layout-x);
    gap: 30px;
    margin: 32px 0px;
    background: #fff;
    border-radius: 12px;

    &__process {
        display: flex;
        align-self: stretch;
        padding: 12px 0;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background: #f7faff;
        border-radius: 12px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.08);

        span {
            color: #54698071;
            text-align: center;
            font-family: "Noto Sans TC";
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 135%;
            padding: 0 8px;
            transition: color 0.2s, font-weight 0.2s;
        }

        span.active {
            color: #546980;
            font-weight: 700;
            border-bottom: 2px solid #546980;
        }

        span.arrow {
            color: #b0b8c1;
            font-size: 18px;
            font-weight: 700;
            padding: 0 4px;
        }
    }

    &__date-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;

        h2 {
            color: #546980;
            font-size: 32px;
            font-family: "Noto Sans TC";
            font-weight: 500;
            margin-bottom: 24px;
        }

        span {
            color: #546980;
            font-size: 16px;
            font-family: "Noto Sans TC";
            font-weight: 400;
            margin-bottom: 24px;
        }
    }

}


.rl__content__list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    gap: 25px;

    &__room-card {
        display: flex;
        flex-direction: row;
        background: #fff;
        border: 1.5px solid #546980;
        border-radius: 12px;
        padding: 24px;
        gap: 24px;
        min-width: 500px;
        align-items: center;
        box-shadow: 0 2px 8px rgba(84, 105, 128, 0.08);

        &__img {
            width: 50%;
            height: 30vh;
            overflow: hidden;
            border-radius: 8px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
            gap: 8px;

            h3 {
                color: #546980;
                font-size: 24px;
                font-family: "Noto Sans TC";
                font-weight: 500;
                margin: 0;
            }

            ul {
                margin: 0;
                padding-left: 18px;
                color: #546980;
                font-size: 16px;
                font-family: "Noto Sans TC";
                font-weight: 400;
            }

            &__price {
                margin-top: 12px;

                .price {
                    color: #546980;
                    font-size: 32px;
                    font-weight: 700;
                }
            }

            &__qty {
                color: #546980;
                font-size: 16px;
                font-family: "Noto Sans TC";
                font-weight: 400;
            }

            &__btn {
                margin-top: 16px;
                background: #546980;
                color: #fff;
                border: none;
                border-radius: 6px;
                padding: 8px 32px;
                font-size: 20px;
                font-family: "Noto Sans TC";
                cursor: pointer;
                transition: background 0.2s;

                &:hover {
                    background: #3a4c5e;
                }
            }
        }
    }
}

.rl__c__two {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 50%;
    background: #fff;
    border: 1.5px solid #546980;
    border-radius: 12px;
    gap: 24px;
    align-items: center;
    box-shadow: 0 2px 8px rgba(84, 105, 128, 0.08);
}

.rl__c__two__order {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    flex-direction: row;

    &__left {
        width: 50%;
        padding: 25px;

        &__img {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 20%;
                border-radius: 8px;
                object-fit: cover;
                margin: 16px 0;
            }
        }

        &__row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
            color: #546980;
            font-family: "Noto Sans TC";
            border-bottom: 1px solid #546980;
            padding: 8px 0;
        }

        &_row:last-child {
            border-bottom: none;
            font-size: 22px;
        }

        ul {
            margin: 8px 0 0 0;
            padding-left: 18px;
            color: #546980;
            font-size: 16px;
            font-family: "Noto Sans TC";
            font-weight: 400;
            margin-left: 10px;
        }
    }

    &__right {
        width: 50%;
        padding: 25px;

        &__row {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 20px;
            color: #546980;
            font-family: "Noto Sans TC";
            border-bottom: 1px solid #546980;
            padding: 8px 0;

            input {
                width: 15%;
                padding: 8px;
                margin-top: 6px;
                border: 1px solid #ccc;
                border-radius: 6px;
                font-size: 18px;
                color: #546980;
                font-family: "Noto Sans TC";
                box-sizing: border-box;
            }
        }

        &__row:last-child {
            border-bottom: none;
            font-size: 22px;
        }

        &__form {
            margin: 10px 0px;

            span {
                font-size: 20px;
                color: #546980;
                font-family: "Noto Sans TC";
            }

            input {
                width: 100%;
                padding: 8px;
                margin-top: 6px;
                border: 1px solid #ccc;
                border-radius: 6px;
                font-size: 18px;
                color: #546980;
                font-family: "Noto Sans TC";
                box-sizing: border-box;
            }
        }
    }
}

.confirm-btn {
    width: 100%;
    background: #546980;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 12px 0;
    font-size: 22px;
    font-family: "Noto Sans TC";
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #3a4c5e;
    }
}

.order-area {
    h3 {
        color: #546980;
        text-align: center;
        font-family: "Noto Sans TC";
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        line-height: 135%;
    }
}

.no-room-msg {
    width: 100%;
    color: #54698090;
    text-align: center;
    font-family: "Noto Sans TC";
    font-size: 40px;
}

.recommend-title {
    width: 100%;
    color: #546980;
    font-family: "Noto Sans TC";
    font-size: 40px;
}

@media (max-width: 1024px) {
    main.roomlist {
        width: 100%;
    }

    .roomlist__title {
        h1 {
            font-size: 48px;
        }
    }

    .rl__content {
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        padding: 0px 25px;
        gap: 20px;
        margin: 16px 0px;

        &__date-info {
            align-items: center;

            h2 {
                font-size: 24px;
                margin-bottom: 16px;
            }

            span {
                font-size: 14px;
                margin-bottom: 16px;
            }
        }
    }

    .rl__content__list {
        gap: 20px;

        &__room-card {
            min-width: unset;
            height: auto;
            width: 100%;
            max-width: 80%;
            align-self: center;

            &__img {
                height: 25vh;
            }

            &__info {
                h3 {
                    font-size: 20px;
                }

                ul {
                    font-size: 14px;
                }

                &__price {
                    .price {
                        font-size: 24px;
                    }
                }

                &__qty {
                    font-size: 14px;
                }

                &__btn {
                    font-size: 18px;
                    padding: 6px 24px;
                }
            }
        }
    }

    .rl__c__two {
        min-width: unset;
        width: 100%;

        &__order {

            &__left,
            &__right {
                width: 100%;
                padding: 16px;

                &__row {
                    font-size: 16px;

                    input {
                        width: 30%;
                        font-size: 16px;
                    }
                }

                ul {
                    font-size: 14px;
                }
            }
        }
    }

    .confirm-btn {
        font-size: 18px;
    }

    .no-room-msg,
    .recommend-title {
        font-size: 24px;
    }
}

@media (max-width: 768px) {

    .roomlist__title {
        padding-top: 50px;
    }
    .roomlist__title {
        h1 {
            font-size: 32px;
        }
    }

    .rl__content {
        width: 100vw;
        max-width: 100vw;
        box-sizing: border-box;
        padding: 0px 8px;
        gap: 12px;
        margin: 8px 0px;

        &__date-info {
            h2 {
                font-size: 20px;
                margin-bottom: 12px;
                margin: 0;
            }

            span {
                font-size: 12px;
                margin-bottom: 12px;
            }
        }
    }

    .rl__content__list {
        gap: 12px;

        &__room-card {
            min-width: unset;
            height: auto;
            width: 100%;
            align-self: center;

            &__img {
                height: 20vh;
            }

            &__info {
                h3 {
                    font-size: 18px;
                }

                ul {
                    font-size: 12px;
                }

                &__price {
                    .price {
                        font-size: 20px;
                    }
                }

                &__qty {
                    font-size: 12px;
                }

                &__btn {
                    font-size: 16px;
                    padding: 6px 20px;
                }
            }
        }
    }

    .rl__content__process {
        span {
            font-size: 14px;
        }
    }

    .rl__c__two {
        &__order {

            &__left,
            &__right {
                padding: 12px;

                &__row {
                    font-size: 14px;

                    input {
                        width: 40%;
                        font-size: 14px;
                    }
                }

                ul {
                    font-size: 12px;
                }
            }
        }
    }

    .confirm-btn {
        font-size: 16px;
        padding: 10px 0;
    }

    .no-room-msg,
    .recommend-title {
        font-size: 20px;
    }
}
</style>
