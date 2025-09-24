<template lang="pug">
div
  main.Notice
    .title
      h1 公告內容
    .content
      .navigation
                p(:class="{active: currentIndex === 0}" @click="currentIndex = 0") 公告
                p(:class="{active: currentIndex === 1}" @click="currentIndex = 1") 住宿優惠
                p(:class="{active: currentIndex === 2}" @click="currentIndex = 2") 節慶活動
                p(:class="{active: currentIndex === 3}" @click="currentIndex = 3") 體驗活動
      .noticelist
                .notice(v-for="item in currentList" :key="item.title")
                    .left
                        h6 {{ item.title }}
                        p {{ item.text }}
                    .right
                        p {{ item.date }}

</template>

<script>
export default {
    name: 'NoticePage',
    data() {
        return {
            currentIndex: 0,
            noticelist: [
                { title: "2024 夏季設施維護公告", date: "2024-07-15", text: "為了提供更安全、舒適的休憩空間，本飯店游泳池及 SPA 中心將於 2024/08/01 至 2024/08/05 進行年度維護。維護期間，該設施將暫停開放。造成不便之處，敬請見諒。我們期待維護完成後，能讓您再次自由地享受最完善的服務。" },
            ],
            AccDlist: [
                { title: "「自由漫遊」連住優惠", date: "2024-06-20", text: "渴望一場無拘無束的城市探索嗎？現在，預訂連續入住兩晚以上，即可享有 房價八五折 專屬優惠。此專案包含每日精緻早餐，並提供免費延遲退房服務，讓您能自由安排時間，不受限制地體驗城市的每一個角落。立即預訂，解放您的旅程，享受最純粹的自在。" },
                { title: "春季住宿優惠活動", date: "2024-03-20", text: "迎接春天的到來，我們特別推出春季住宿優惠活動。凡於 2024/04/01 至 2024/06/30 期間預訂雙人房或家庭房，即可享有 15% 的折扣優惠。讓您在這個花開的季節，與親友一同自由地探索美麗的風景，創造難忘的回憶。" },
            ],
            FestDlist: [
                { title: "聖誕夜限定：星空下的自由盛宴", date: "2024-12-24", text: "為慶祝聖誕節，我們將於 2024/12/24 舉辦一系列特別活動，包括聖誕市集、手作聖誕飾品體驗以及聖誕歌曲合唱。歡迎所有住客自由參加，共度一個充滿節日氣息的聖誕佳節。" },
                { title: "端午節特別活動", date: "2024-05-10", text: "為慶祝端午節，我們將於 2024/06/22 舉辦一系列特別活動，包括傳統龍舟競賽觀賞、手作粽子體驗以及端午節文化講座。歡迎所有住客自由參加，共度一個充滿文化氣息的端午佳節。" }
            ],
            ExpDlist: [
                { title: "在地文化深度體驗：巷弄調酒課程", date: "2024-08-10", text: "除了觀光景點，您是否也想感受香港最道地的生活氣息？我們與知名在地酒吧合作，推出獨家 「巷弄調酒課程」。由專業調酒師帶領，教您如何將在地特色食材融入雞尾酒中，調配出屬於您的獨特風味。這不只是一堂課程，更是一場深入城市靈魂的自由探索。立即報名，用味覺寫下您的香港故事。" },
                { title: "夏日清涼體驗活動", date: "2024-06-05", text: "炎炎夏日，我們特別策劃了一系列清涼體驗活動，包括水上瑜伽、沙灘排球比賽以及夜間星空電影放映。這些活動將於 2024/07/01 至 2024/08/31 每週末舉行，歡迎所有住客自由參加，一同享受夏日的清涼與樂趣。" }
            ]
        }
    },
    computed: {
        currentList() {
            switch (this.currentIndex) {
                case 0:
                    return this.noticelist;
                case 1:
                    return this.AccDlist;
                case 2:
                    return this.FestDlist;
                case 3:
                    return this.ExpDlist;
                default:
                    return [];
                }
            }
    }
    
}



</script>

<style lang="scss">
#app {
    background: white;

    main.Notice {
        display: inline-flex;
        width: 100%;
        height: 100vh;
        padding-bottom: 34px;
        flex-direction: column;
        align-items: center;
        gap: 21px;

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
            background-image: url('src/assets/background.jpg');
            will-change: background-image;

            h1 {
                color: rgba(255, 255, 255, 0.75);
                text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                font-size: 84px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                font-family: 'Noto Sans TC';
            }
        }

        .content {
            display: flex;
            max-height: 60%;
            width: 100%;
            max-width: 955px;
            flex-direction: column;
            align-items: center;
            gap: 15px;

            .navigation {
                display: flex;
                width: 100%;
                max-width: 535px;
                justify-content: space-between;
                align-items: center;

                p {
                    display: flex;
                    padding: 10px;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    color: rgba(84, 105, 128, 0.50);
                    font-family: 'Noto Sans TC';
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    margin: 0;

                    &:hover {
                        cursor: pointer;
                        border-bottom: 1px solid #546980;
                        color: #546980;
                    }
                }

                p.active {
                    border-bottom: 1px solid #546980;
                    color: #546980;
                }
            }

            .noticelist {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
                align-self: stretch;

                .notice {
                    display: flex;
                    padding: 15px;
                    justify-content: space-between;
                    align-items: flex-start;
                    align-self: stretch;
                    border-bottom: 1px solid #546980;

                    .left {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 9px;
                        max-width: 80%;

                        h6 {
                            color: #546980;
                            font-family: 'Noto Sans TC';
                            font-size: 24px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                            margin: 0;
                        }

                        p {
                            color: rgba(84, 105, 128, 0.75);
                            font-family: 'Noto Sans TC';
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                            margin: 0;
                        }
                    }

                    .right {

                        p {
                            color: #546980;
                            font-family: 'Noto Sans TC';
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                            margin: 0;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 1024px) {
        main.Notice {
            .title {
                justify-content: center;
                
                h1 {
                    font-size: 48px;
                }
            }

            .content {
                .navigation {
                    max-width: 90%;
                    p {
                        font-size: 16px;
                        padding: 6px;
                    }
                }

                .noticelist {
                    padding: 0 10px;

                    .notice {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;

                        .left {
                            max-width: 100%;

                            h6 {
                                font-size: 18px;
                            }

                            p {
                                font-size: 14px;
                                line-height: 200%;
                            }
                        }

                        .right {
                            p {
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 600px) {
        main.Notice {
            .title {
                h1 {
                    font-size: 32px;
                }
            }

            .content {
                width: 80%;

                .navigation {
                    max-width: 100%;
                    p {
                        font-size: 14px;
                        padding: 4px;
                    }
                }

                .noticelist {
                    .notice {
                        .left {
                            h6 {
                                font-size: 16px;
                            }

                            p {
                                font-size: 12px;
                                line-height: 150%;
                            }
                        }

                        .right {
                            p {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>