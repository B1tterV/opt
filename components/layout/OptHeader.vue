<template>
    <header class="opt-header">
        <nuxt-link
            class="opt-header__logo"
            to="/"
        >
            <svg-icon
                icon="logo"
            />
        </nuxt-link>
        <div class="opt-header__content">
            <div
                class="content-wrapper"
                :class="{'active': headerContentActive}"
            >
                <div class="wrapper-block">
                    <nav class="opt-header__nav">
                        <ul>
                            <li>
                                <nuxt-link to="/tariffs">Тарифы</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/contacts">Контакты</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="wrapper-block">
                    <a
                        class="opt-header__phone"
                        href="tel:+74951184422"
                    >
                        +7 495 118-44-22
                    </a>
                    <nuxt-link
                        to="/auth"
                    >
                        Вход
                    </nuxt-link>
                    <opt-button
                        :b-form="['min', 'blue']"
                        value="Регистрация"
                        @click="router.push('/auth')"
                    />
                </div>
            </div>
            <div
                class="hamburger"
                :class="{'active': headerContentActive}"
                @click="headerContentActive = !headerContentActive"
            >
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const headerContentActive = ref<boolean>(false)
const router = useRouter()

</script>

<style scoped lang="scss">
.opt-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background: var(--background-gradient);
    .content-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .hamburger{
        display: none;
        width: fit-content;
        &.active{
            .bar:nth-child(1){
                -webkit-transform: translateY(8px) rotate(45deg);
                -ms-transform: translateY(8px) rotate(45deg);
                transform: translateY(8px) rotate(45deg);
            }
            .bar:nth-child(2){
                opacity: 0;
            }
            .bar:nth-child(3){
                -webkit-transform: translateY(-8px) rotate(-45deg);
                -ms-transform: translateY(-8px) rotate(-45deg);
                transform: translateY(-8px) rotate(-45deg);
            }
        }
        .bar{
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            --webkit-transition: all 0.3 ease-in-out;
            -webkit-transition: all .3 ease-in-out;
            transition: all .3 ease-in-out;
            background-color: #fff;
        }
    }
    .wrapper-block{
        display: flex;
        align-items: center;
        gap: 30px;
    }
    &__logo{
        margin-right: 30px;
    }
    &__content{
        width: 100%;
    }
    &__nav{
        ul{
            display: flex;
            align-items: center;
            gap: 30px;
        }
    }
    &__phone{
        font-weight: 700;
    }
    .opt-button{
        &:hover{
            color: var(--text-reverse);
        }
    }
}

@media (max-width: 920px){
    .opt-header{
        position: sticky;
        top: 0;
        .content-wrapper{
            padding: 32px 24px;
            max-height: calc(100vh - 64px);
            position: fixed;
            top: 0;
            right: -100%;
            padding: 60px 60px 32px 60px;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            width: -webkit-fit-content;
            width: -moz-fit-content;
            width: fit-content;
            text-align: center;
            -webkit-transition: .3s;
            transition: .3s;
            gap: 0;
            border-radius: 0 0 0 8px;
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            max-height: calc(100vh - 72px);
            overflow: auto;
            &.active{
                top: 0;
                right: 0;
                background: #080b0f;
                border-top: 1px solid #1F2125;
            }
        }
        &__content{
            width: fit-content;
        }
        .wrapper-block{
            flex-direction: column;
            gap: 20px;
            &:not(:last-child){
                margin-bottom: 20px;
            }
        }
        &__nav{
            ul{
                flex-direction: column;
                gap: 20px;
            }
        }
        .hamburger{
            display: block;
        }
    }
}
</style>
