<template lang="pug">
.div
    nav.navbar
        p.navbar-item(:class="{active: activeIndex === 1}", @click="goSection(1)") 關於
        p.navbar-item(:class="{active: activeIndex === 2}", @click="goSection(2)") 設施服務
        p.navbar-item(:class="{active: activeIndex === 3}", @click="goSection(3)") 房型介紹
        p.navbar-item(:class="{active: activeIndex === 0}", @click="goSection(0)") 首頁
        p.navbar-item(:class="{active: activeIndex === 4}", @click="goSection(4)") 公告內容
        p.navbar-item(:class="{active: activeIndex === 5}", @click="goSection(5)") 周邊景點
        p.navbar-item(:class="{active: activeIndex === 6}", @click="goSection(6)") 聯絡我們
    nav.navbarmedia
        span.btn(@click="toggleMobileNav")
        .navbarmedia__navbar(v-show="showMobileNav")
          p.navbar-item(:class="{active: activeIndex === 1}", @click="goSection(1); toggleMobileNav()") 關於
          p.navbar-item(:class="{active: activeIndex === 2}", @click="goSection(2); toggleMobileNav()") 設施服務
          p.navbar-item(:class="{active: activeIndex === 3}", @click="goSection(3); toggleMobileNav()") 房型介紹
          p.navbar-item(:class="{active: activeIndex === 0}", @click="goSection(0); toggleMobileNav()") 首頁
          p.navbar-item(:class="{active: activeIndex === 4}", @click="goSection(4); toggleMobileNav()") 公告內容
          p.navbar-item(:class="{active: activeIndex === 5}", @click="goSection(5); toggleMobileNav()") 周邊景點
          p.navbar-item(:class="{active: activeIndex === 6}", @click="goSection(6); toggleMobileNav()") 聯絡我們

</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            activeIndex: 0,
            showMobileNav: false
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
            // 如果點擊首頁且不在首頁路由，先導航到首頁再跳轉到第一頁
            if (idx === idx) {
                this.$router.push('/').then(() => {
                    this.$nextTick(() => {
                        if (window.fullpage_api) window.fullpage_api.moveTo(idx + 1);
                    });
                });
            } else {
                if (window.fullpage_api) window.fullpage_api.moveTo(idx + 1);
            }
        },
        toggleMobileNav() {
            this.showMobileNav = !this.showMobileNav
        }
    }
}
</script>

<style lang="scss">
@mixin nav {
    display: flex;
    position: absolute;
    top: 0;
    z-index: 10;
    justify-content: center;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    width: 100%;
    gap: 10px;
}

@mixin nav__item-after {
    content: '';
    position: absolute;
    bottom: -14px;
    width: 135px;
    height: 135px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 35px;
    z-index: -1;
}

.navbar {
    @include nav;
}

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
        @include nav__item-after;
    }
}

.navbarmedia {
    display: none;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 20px;
    width: 100%;
    height: 65px;
    position: absolute;
    z-index: 20;
    background: rgba(255, 255, 255, 0.25);

    .btn {
        display: flex;
        width: 30px;
        height: 30px;
        position: relative;
        margin-right: 30px;
        background-color: #546980;
        mask-image: url('@/assets/media.svg');
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;

        &::after {
            top: -10px;
        }

        &::before {
            bottom: -10px;
        }
    }
}

@media (max-width: 768px) {
    .navbar {
        display: none;
    }

    .navbar-item {
        width: 70px;
        font-size: 14px;
    }
}


@media (max-width: 768px) {
    .navbarmedia {
        display: flex;
    }
}

.navbarmedia__navbar {
    @include nav;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);

    .navbar-item.active {
        &::after {
            @include nav__item-after;
            width: 125px;
            height: 55px;
        }
    }
}
</style>