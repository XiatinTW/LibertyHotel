<template lang="pug">
    div
        main.activities(:style="{background: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(84, 105, 128, 0.65) 60.72%), url('${selectedCard.img}') center/cover no-repeat`} ")
            .body
                .body-content
                    h1 {{ selectedCard.title }}
                    h5 {{ selectedCard.subtitle }}
                    p {{ selectedCard.desc }}
                    .btn(@click="openMap") 查看地圖

                .list
                    .card(
                        v-for="(card, i) in nextCards"
                        :key="card.title"
                        :style="{background: `url('${card.img}') center/cover no-repeat`}"
                        @click="selectCard(nextCardIndices[i])"
                        )

</template>

<script>
export default {
    name: 'attractionsPage',
    data() {
        return {
            cards: [
                {
                    img: '/src/assets/Activities/activities01.jpg',
                    title: '星光大道',
                    subtitle: '維多利亞港畔的電影傳奇',
                    desc: '不僅僅是一條海濱長廊，更是香港電影百年歷史的縮影。漫步於此，迎面而來的是維多利亞港的徐徐海風，身後則是熠熠生輝的香港電影傳奇。你將與李小龍、梅艷芳等巨星的雕像近距離接觸，感受他們在香港影壇留下的光輝足跡。'
                },
                {
                    img: '/src/assets/Activities/activities02.jpg',
                    title: '旺角街景',
                    subtitle: '霓虹閃爍的都市不夜城',
                    desc: '深入旺角，感受這座城市最真實的生命力。當夜幕降臨，五光十色的霓虹招牌點亮了整條街區，熱鬧非凡的景象令人目不暇給。您可以自由穿梭於各式小吃攤販、潮流服飾店與特色小舖之間，體驗香港獨特的街頭文化。這裡充滿了活力、色彩與自由的氛圍，是體驗道地香港生活的不二選擇。'
                },
                {
                    img: '/src/assets/Activities/activities03.jpg',
                    title: '中環叮叮車',
                    subtitle: '穿越時光的城市漫遊',
                    desc: '搭乘歷史悠久的叮叮車，以最悠閒的方式探索香港的繁華與魅力。坐在雙層電車上，您能欣賞到中環獨特的城市風景，看著高樓大廈與懷舊街景交錯而過。沒有特定的目的地，您只需要買一張車票，就能自由地穿梭於大街小巷，感受這座城市新舊交融的獨特韻味。'
                },
                {
                    img: '/src/assets/Activities/activities04.jpg',
                    title: '香港迪士尼樂園',
                    subtitle: '實現童年夢想的奇幻之旅',
                    desc: '踏入香港迪士尼樂園，進入一個充滿魔法與歡笑的童話世界。這裡不只適合孩子，也為所有懷抱夢想的旅人打造了一個遠離現實的奇幻國度。您可以與經典卡通人物相見歡，欣賞精彩的遊行表演，或是在夢幻城堡前留下難忘的合影。在這裡，您能自由地釋放童心，重溫最純粹的快樂。'
                }
            ],
            selectedIndex: 0
        }
    },
    computed: {
        selectedCard() {
            return this.cards[this.selectedIndex]
        },
        nextCardIndices() {
            // 只顯示「下一張、再下一張、再下一張」三張卡片
            const arr = []
            for (let i = 1; i <= 3; i++) {
                arr.push((this.selectedIndex + i) % this.cards.length)
            }
            return arr
        },
        nextCards() {
            return this.nextCardIndices.map(idx => this.cards[idx])
        }
    },
    methods: {
        selectCard(idx) {
            this.selectedIndex = idx
        },
        openMap() {
            // 可根據 selectedCard.title 或其他欄位決定地圖連結
            let mapUrl = 'https://www.google.com/maps'
            if (this.selectedCard.title === '星光大道') {
                mapUrl = 'https://maps.app.goo.gl/rCA8keJmym4CDaTN9'
            } else if (this.selectedCard.title === '旺角街景') {
                mapUrl = 'https://maps.app.goo.gl/HAJMoTqqoShHpEFf9'
            } else if (this.selectedCard.title === '中環叮叮車') {
                mapUrl = 'https://maps.app.goo.gl/3p83WWgPx1zC28UT6'
            } else if (this.selectedCard.title === '香港迪士尼樂園') {
                mapUrl = 'https://maps.app.goo.gl/VycqmF9izxyCjYCN8'
            }
            window.open(mapUrl, '_blank')
        }
    }
}
</script>

<style lang="scss">
#app {
    .activities {
        height: 100vh;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(84, 105, 128, 0.65) 60.72%), url('@/assets/Activities/activities01.jpg') lightgray 50% / cover no-repeat;

        .body {
            display: flex;
            align-items: flex-end;
            gap: 90px;
            position: absolute;
            bottom: 10%;
            left: 10%;

            .body-content {
                display: flex;
                width: 650px;
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;

                h1 {
                    color: #FFF;
                    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                    font-family: "Noto Sans";
                    font-size: 84px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    margin: 0;
                }

                h5 {
                    color: #FFF;
                    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                    font-family: 'Noto Sans TC';
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    margin: 0;
                }

                p {
                    color: #FFF;
                    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                    font-family: 'Noto Sans TC';
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    margin: 0;
                }

                .btn {
                    display: flex;
                    padding: 15px 10px;
                    gap: 10px;
                    border-radius: 10px;
                    border: 3px solid #FFF;
                    color: #FFF;
                    font-family: 'Noto Sans TC';
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    cursor: pointer;
                }
            }

            .list {
                display: flex;
                align-items: center;
                gap: 36px;

                .card {
                    width: 220px;
                    height: 315px;
                    border-radius: 10px;
                    background: url('@/assets/Activities/activities02.jpg') center/cover no-repeat;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
                }
            }
        }
    }
}
</style>