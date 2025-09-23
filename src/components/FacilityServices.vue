<template lang="pug">
    div
        main.FacilityServices
            img(:src="fslist[currentIndex].img" :alt="fslist[currentIndex].name")

            .FacilityText(v-if="fslist.length > 0")
                h2 {{ fslist[currentIndex].name }}
                h5 {{ fslist[currentIndex].subtitle }}
                p {{ fslist[currentIndex].text }}

                .selecttool
                    .btn(v-for="(item, idx) in fslist" :key="item.name" :class="{active: idx === currentIndex}" @click="currentIndex = idx")
                        p(v-if="item.name === '餐廳 酒吧'")
                            | 餐廳
                            br
                            | 酒吧
                        p(v-else) {{ item.name }}

</template>

<script>
export default {
    name: 'FacilityServicesPage',
    data() {
        return {
            currentIndex: 0,
            fslist: [
                { name: "餐廳 酒吧", subtitle: "Restaurant & Bar", img: "/src/assets/FacilityServices/FS01.jpg", text: "我們的餐廳與酒吧為您提供一個無拘無束的味覺探索之旅。在這裡，沒有制式的用餐時間，您可以隨時來一杯現磨咖啡，或是享受由主廚精心烹製的創意料理。夜晚，酒吧化身為一個社交空間，您能自由地與新朋友交流，品嚐調酒師特製的雞尾酒。我們精選在地新鮮食材，讓您在輕鬆愜意的氛圍中，感受最純粹的美味與自由。" },
                { name: "游泳池", subtitle: "Swimming Pool", img: "/src/assets/FacilityServices/FS02.jpg", text: "您能俯瞰城市的全景，感受前所未有的自由與遼闊。無論是悠閒地漂浮在水面上，或是在池畔的躺椅上閱讀、小憩，這裡都是您遠離塵囂的避風港。白天，陽光灑落，夜晚，星光閃爍，每一次的游水體驗都將是一場心靈的解放。這裡是您的私密天堂，讓您自由地享受每一刻的寧靜。" },
                { name: "SPA中心", subtitle: "SPA Center", img: "/src/assets/FacilityServices/FS03.jpg", text: "在 Liberty Hotel，我們相信真正的放鬆來自於身心靈的完全釋放。我們的 SPA 中心提供多樣化的療程，由專業芳療師以天然精油與獨特技法，為您量身打造專屬的療癒體驗。您可以自由選擇適合您的療程，讓緊繃的肌肉獲得舒緩，讓疲憊的心靈重獲寧靜。在這裡，您無需迎合任何人的期待，只需專注於自己的感受，找回內在的平衡與自由。" },
                { name: "會議室", subtitle: "Conference Room", img: "/src/assets/FacilityServices/FS04.jpg", text: "在我們的多功能會議室，商務不再受限於傳統框架。我們提供靈活的空間配置與最先進的科技設備，從小型討論到大型研討會，都能根據您的需求自由調整。這裡的氛圍旨在激發創意，鼓勵自由交流。我們相信，最成功的合作來自於開放的思維與不受拘束的討論。讓您的每一次商務會議，都能在輕鬆、自由的環境中，達到事半功倍的效果。" },
                { name: "健身房", subtitle: "Gym", img: "/src/assets/FacilityServices/FS05.jpg", text: "在您的旅程中，無需中斷健康生活。我們的 24 小時健身房為您提供最先進的健身設備與寬敞的運動空間。無論是清晨的活力訓練，還是深夜的舒壓伸展，您都能隨時來此，自由地掌控您的運動節奏。窗外是開闊的城市景觀，讓您在揮灑汗水的同時，也能感受城市的脈動，享受身心自由的暢快。" },
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

    .FacilityServices {
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
}
</style>