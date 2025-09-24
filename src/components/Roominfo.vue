<template lang="pug">
    div
        main.Roominfo
            img(:src="roominfolist[currentIndex].img" :alt="roominfolist[currentIndex].name")

            .FacilityText(v-if="roominfolist.length > 0")
                h2 {{ roominfolist[currentIndex].name }}
                h5 {{ roominfolist[currentIndex].subtitle }}
                p {{ roominfolist[currentIndex].text }}

                .selecttool
                    .btn(v-for="(item, idx) in roominfolist" :key="item.name" :class="{active: idx === currentIndex}" @click="currentIndex = idx")
                        p(v-if="item.name === '雙人房'")
                            | 雙人房
                        p(v-else) {{ item.name }}
</template>

<script>
export default {
    name: 'Roominfo',
    data() {
        return {
            currentIndex: 0,
            roominfolist: [
                { name: "雙人房", subtitle: "Double Room", img: "/src/assets/Room/Room01.jpg", text: "我們的雙人房為您提供一個極致的私密空間，讓您遠離日常喧囂。房間設計簡約而溫馨，每一處細節都經過精心考量，旨在為您打造一個不受打擾的避風港。您可以自由地享受夜晚的寧靜，或是窩在舒適的大床上，觀賞一部喜愛的電影。這裡不只是暫時的棲息地，更是您與旅伴共同創造美好回憶的起點，讓您在彼此的陪伴中，感受最純粹的自在。" },
                { name: "家庭房", subtitle: "Family Room", img: "/src/assets/Room/Room02.png", text: "在我們的家庭房，自由的定義有了更豐富的詮釋。寬敞的空間足以讓孩子們盡情嬉鬧，而父母也能在獨立的區域中享受片刻的安寧。我們提供完善的親子設施，讓旅途中的大小成員都能感到舒適。無論是親子共讀，還是全家一起觀看電影，這裡都是一個能讓您與家人自由相處、無拘無束的溫馨天地。讓家庭房成為您與摯愛共同探索、共同歡笑的自由基地。" },
                { name: "景觀房", subtitle: "View Room", img: "/src/assets/Room/Room03.png", text: "我們的景觀房是為熱愛自由、嚮往遼闊的您而設計。超大落地窗將戶外美景盡收眼底，無論是城市的璀璨夜景、壯麗的山巒，還是寧靜的海景，都將成為您房間最獨特的風景畫。您可以自由地在窗邊品嚐咖啡，欣賞日出日落的瞬息萬變，或是 просто發呆，讓思緒自由翱翔。這裡不只是住宿，更是一個能讓您與自然、與城市自由對話的專屬空間。" }
            ]
        }
    }
}
</script>

<style lang="scss">
#app {
    .navbar {
        background: rgba(255, 255, 255, 0.8);
    }

    .Roominfo {
        display: flex;
        justify-content: flex-start;
        background: #fff;

        img {
            width: 100%;
            max-width: 50%;
            height: 100vh;
            flex-shrink: 0;
            object-fit: cover;
        }

        .FacilityText {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 25px;
            width: 50%;

            h2 {
                color: #546980;
                font-family: "Noto Sans TC";
                font-size: 64px;
                font-style: normal;
                font-weight: 700;
                line-height: 135%;
                margin: 0;
                margin-top: 40px;
            }

            h5 {
                color: #546980;
                font-family: "Noto Sans TC";
                font-size: 24px;
                font-style: normal;
                font-weight: 400;
                line-height: 135%;
                margin: 0;
                margin-bottom: 20px;
            }

            p {
                color: #546980;
                font-family: "Noto Sans TC";
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 135%;
                max-width: 550px;
                margin: 0;
            }

            .selecttool {
                display: inline-flex;
                padding: 25px 0px;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                border-radius: 10px 0 0 10px;
                background: rgba(84, 105, 128, 0.15);
                position: absolute;
                right: 0;
                top: 30%;

                .btn {
                    display: flex;
                    max-width: 66px;
                    padding: 5px 15px;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;

                    &:hover {
                        border-radius: 10px;
                        background: rgba(255, 255, 255, 0.45);
                        cursor: pointer;
                    }
                }
            }
        }
    }

    @media (max-width: 1024px) {
        .Roominfo {
            flex-direction: column;
            height: 100vh;
            overflow-x: hidden;

            img, .FacilityText {
                width: 100%;
                max-width: 100%;
                height: 50%;
            }

            .FacilityText {
                width: 90%;
                height: 50%;
                padding: 25px 45px;

                h2 {
                    font-size: 32px;
                    margin-top: 20px;
                }

                h5 {
                    font-size: 18px;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 14px;
                    max-width: 100%;
                }

                .selecttool {
                    top: auto;
                    bottom: 10px;
                    right: 50%;
                    transform: translateX(50%);
                    padding: 10px 15px;
                    flex-direction: row;
                    background: rgba(84, 105, 128, 0.15);
                    border-radius: 10px;

                    .btn {
                        max-width: none;
                        padding: 5px 10px;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
         .Roominfo .FacilityText {
            padding: 15px 25px;

            h2 {
                font-size: 24px;
                margin-top: 15px;
            }

            h5 {
                font-size: 16px;
                margin-bottom: 8px;
            }

            p {
                font-size: 12px;
            }

            .selecttool {
                bottom: 15px;
                padding: 8px 10px;
                gap: 8px;
                width: 100%;
                justify-content: center;

                .btn {
                    padding: 3px 8px;

                    p {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>