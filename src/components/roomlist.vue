<template lang="pug">
div
    main.roomlist
        .title
            h1 LibertyHotel
        .content
            .process
                span.step(:class="{active: step === 1}") 1. 選擇房型
                span.arrow →
                span.step(:class="{active: step === 2}") 2. 預訂
                span.arrow →
                span.step(:class="{active: step === 3}") 3. 預訂完成
            .date-info(v-if="step === 1")
                h2 選擇您的客房
                span 選擇日期：{{ displayDate }}
            .room-content(v-if="step === 1")
                .room-card(v-for="room in availableRooms" :key="room.id")
                    .room-img
                        img(:src="room.image", :alt="room.type")
                    .room-info
                        h3 {{ room.type }}
                        ul
                            li(v-for="desc in room.desc") {{ desc }}
                        .room-price
                            span.price $ {{ room.price }}
                        .room-qty
                            span 空房數：{{ room.available }}
                        button.select-btn(:disabled="room.available === 0" @click="selectRoom(room)") 選擇
            .order-area(v-if="step === 2 && selectedRoom")
                h3 預訂資訊
                .order-summary
                    .left 
                        .order-img
                            img(:src="selectedRoom.image", :alt="selectedRoom.type")
                            form(@submit.prevent="confirmOrder")
                        .order-row
                            span 房型
                            span {{ selectedRoom.type }}
                    .right
                        .order-row
                            span 入住日期
                            span {{ startDate }}
                        .order-row
                            span 退房日期
                            span {{ endDate }}
                        .order-row
                            span 數量
                            input(type="number" v-model.number="selectedCount" min="1" :max="selectedRoom.available")
                        .order-row
                            span 總計
                            span ${{ totalPrice }}
                        .form-row
                            span 姓名
                            input(type="text" v-model="orderName" required)
                        .form-row
                            span 電話
                            input(type="text" v-model="orderPhone" required)
                        button.confirm-btn(type="submit") 送出預訂

</template>

<script>
import roomsData from '@/data/rooms.json';

export default {
    name: "roomlistPage",
    data() {
        return {
            step: 1, // 1:選房型 2:預訂 3:完成
            startDate: '',
            endDate: '',
            availableRooms: [],
            selectedRoom: null,
            selectedCount: 1,
            orderName: '',
            orderPhone: '',
        };
    },
    computed: {
        totalPrice() {
            if (!this.selectedRoom) return 0;
            return this.selectedCount * this.selectedRoom.price;
        },
        displayDate() {
            if (this.startDate && this.endDate) {
                return `${this.startDate} ~ ${this.endDate}`;
            }
            return '';
        }
    },
    created() {
        // 處理日期格式（可能是 Date 物件或字串）
        const formatDate = d => {
            if (!d) return '';
            if (typeof d === 'string') return d;
            if (d instanceof Date) {
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
            }
            // 支援 dayjs 物件
            if (d.format) return d.format('YYYY-MM-DD');
            return String(d);
        };
        this.startDate = formatDate(this.$route.query.start);
        this.endDate = formatDate(this.$route.query.end);
        this.filterRooms();
    },
    methods: {
        filterRooms() {
            // 只顯示入住日有空房的房型
            this.availableRooms = roomsData.map(room => {
                const avail = room.availability.find(a => a.date === this.startDate);
                return {
                    ...room,
                    available: avail ? avail.rooms : 0
                };
            }).filter(room => room.available > 0);
        },
        selectRoom(room) {
            this.selectedRoom = room;
            this.selectedCount = 1;
            this.step = 2;
        },
        confirmOrder() {
            // 可在此送出資料到後端
            this.step = 3;
        }
    }
};
</script>

<style lang="scss">
#app {
    background: white;

    main.roomlist {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        background: white;
        padding-bottom: 34px;

        .title {
            display: flex;
            height: 30%;
            flex-direction: column;
            align-items: center;
            gap: 64px;
            width: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url("src/assets/background.jpg");
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

        .process {
            display: flex;
            align-self: stretch;
            padding: 12px 0;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: #f7faff;
            border-radius: 12px;
            box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.08);

            span.step {
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

            span.step.active {
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

        .content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100vh;
            height: 100%;
            padding: 0px var(--Layout-x);
            gap: 30px;
            margin: 32px 0px;
            max-height: 80vh;
            background: #fff;
            border-radius: 12px;

            .date-info {
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

            .room-content {
                display: flex;
                width: 100%;
                justify-content: space-between;
                flex-direction: column;
                gap: 25px;

                .room-select-area {
                    display: flex;
                    flex-direction: row;
                    gap: 40px;
                    width: 100%;
                    align-items: flex-start;
                }

                .room-card {
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

                    .room-img {
                        width: 200px;
                        height: 140px;
                        overflow: hidden;
                        border-radius: 8px;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    .room-info {
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

                        .room-price {
                            margin-top: 12px;

                            .price {
                                color: #546980;
                                font-size: 32px;
                                font-weight: 700;
                            }
                        }

                        .room-qty {
                            color: #546980;
                            font-size: 16px;
                            font-family: "Noto Sans TC";
                            font-weight: 400;
                        }

                        .select-btn {
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

            .order-area {
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

                .order-summary {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: space-between;
                    flex-direction: row;

                    .left {
                        width: 50%;
                        padding: 25px;

                        .order-img {
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

                        .order-row {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 20px;
                            color: #546980;
                            font-family: "Noto Sans TC";
                            border-bottom: 1px solid #546980;
                            padding: 8px 0;
                        }

                        .order-row:last-child {
                            border-bottom: none;
                            font-size: 22px;
                        }
                    }

                    .right {
                        width: 50%;
                        padding: 25px;

                        .order-row {
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
                        }

                        .order-row:last-child {
                            border-bottom: none;
                            font-size: 22px;
                        }

                        .form-row {
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
        }
    }
}
</style>
