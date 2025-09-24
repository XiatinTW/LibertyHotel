<template lang="pug">
    nav.navbar
        p.navbar-item(:class="{active: activeIndex === 1}", @click="goSection(1)") 關於
        p.navbar-item(:class="{active: activeIndex === 2}", @click="goSection(2)") 設施服務
        p.navbar-item(:class="{active: activeIndex === 3}", @click="goSection(3)") 房型介紹
        p.navbar-item(:class="{active: activeIndex === 0}", @click="goSection(0)") 首頁
        p.navbar-item(:class="{active: activeIndex === 4}", @click="goSection(4)") 公告內容
        p.navbar-item(:class="{active: activeIndex === 5}", @click="goSection(5)") 周邊景點
        p.navbar-item(:class="{active: activeIndex === 6}", @click="goSection(6)") 聯絡我們
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            activeIndex: 0
        }
    },
    mounted() {
        this.$root.$on('sectionChange', (idx) => {
            this.activeIndex = idx
        })
    },
    methods: {
        goSection(idx) {
            if (window.fullpage_api) {
                window.fullpage_api.moveTo(idx + 1)
            }
        }
    }
}
</script>

<style lang="scss">
.navbar {
    display: flex;
    width: 100%;
    justify-content: center;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    gap: 10px;
    position: absolute;
    top: 0;
    z-index: 10;

    .navbar-item {
        color: #546980;
        color: #546980;
        display: flex;
        width: 100px;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;

        &:hover {
            cursor: pointer;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: -14px;
                width: 135px;
                height: 135px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 35px;
                z-index: -1;
            }
        }
    }

    .navbar-item.active {
        cursor: pointer;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: -14px;
            width: 135px;
            height: 135px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 35px;
            z-index: -1;
        }
    }
    @media (max-width: 768px) {
        .navbar-item {
            width: 70px;
            font-size: 14px;
        }
    }
}
</style>