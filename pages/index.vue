<template>
    <div class="welcome-page">
        <section class="check-fines">
            <div class="check-fines__content">
                <h1>Проверьте штрафы и зарегестрируйтесь в 1 клик</h1>
                <form
                    @submit.prevent="checkPenalties()"
                    @keydown.enter="checkPenalties()"
                >
                    <div class="row">
                        <opt-input
                            v-model="carNumber"
                            :error="v$.carNumber.$error"
                            label="Номер автомобиля"
                        />
                        <opt-input
                            v-model="carRegion"
                            :error="v$.carRegion.$error"
                            label="Регион"
                        />
                    </div>
                    <opt-input
                        v-model="carRegistration"
                        :error="v$.carRegistration.$error"
                        label="Свидетельство о регистрации ТС"
                    />
                    <div class="buttons">
                        <opt-button
                            class="buttons__check"
                            @click="checkPenalties()"
                        >
                            Проверить штрафы
                            <svg-icon icon="arrow" />
                        </opt-button>
                        <opt-button
                            b-form="blue_border"
                            class="buttons__video"
                            @click="popupVideoIsOpen = true"
                        >
                            <svg-icon icon="yt" />
                            О сервисе
                            <span>(1 мин. 20 сек)</span>
                        </opt-button>
                    </div>
                    <div class="offer">
                        Нажимая «Проверить штрафы» вы соглашаетесь с политикой обработки
                        персональных данных и принимаете оферту
                    </div>
                </form>
            </div>
            <img
                width="532"
                height="335"
                class="check-fines__image"
                src="@img/check-fines.png"
                alt="check-fines"
            >
        </section>
        <section class="advantages">
            <h2 class="advantages__title s-title">
                Плюсы использования сервиса «Компас» для анализа штрафов
            </h2>
            <div class="advantages__cards">
                <advantage-card
                    v-for="(advantageCard, advantageCardsIndex) in advantageCards"
                    :key="`advantageCard-${advantageCardsIndex}`"
                    :icon="advantageCard.icon"
                    :title="advantageCard.title"
                    :description="advantageCard.description"
                />
            </div>
        </section>
        <section class="docs">
            <h2 class="docs__title s-title">
                Документы
            </h2>
            <Swiper
                ref="swiperRef"
                class="docs__swiper"
                :modules="[SwiperPagination]"
                :slides-per-view="1"
                :space-between="30"
                :pagination="{ dynamicBullets: true }"
                :breakpoints="{
                    920:{ slidesPerView:2 },
                    1360:{ slidesPerView: 3, }
                }"
                @swiper="onSwiper($event)"
                @slide-change="onSlideChange()"
            >
                <svg-icon
                    class="swiper-arrow swiper-arrow_prev"
                    :class="{'swiper-arrow_disabled': isFirstSlide}"
                    icon="swiper-arrow"
                    @click="swiperPrevSlide()"
                />
                <svg-icon
                    class="swiper-arrow swiper-arrow_next"
                    :class="{'swiper-arrow_disabled': isEndSlide}"
                    icon="swiper-arrow"
                    @click="swiperNextSlide()"
                />
                <SwiperSlide
                    v-for="(documentCard, documentCardIndex) in documentCards"
                    :key="`documentCard-${documentCardIndex}`"
                >
                    <document-card
                        :title="documentCard.title"
                        :description="documentCard.description"
                        :link="`/documents${documentCard.link}`"
                    />
                </SwiperSlide>
            </Swiper>
        </section>
        <popup-wrapper
            v-if="popupVideoIsOpen"
            @close="popupVideoIsOpen = false"
        >
            <iframe
                width="960"
                height="530"
                src="https://www.youtube.com/embed/FUi0q4k08Yo"
                title="Титульный Вторник С ПОКАЗАНИЯМИ ПУЛЬСА! Боремся с мировой элитой!"
                frameborder="0"
                allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                "
                style="border-radius: 10px !important;"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            />
        </popup-wrapper>
    </div>
</template>

<script setup lang="ts">
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const { notify } = useNotification()

interface AdvantageCardInterface {
 icon: string,
 title: string,
 description: string
}

interface DocumentCardInterface {
 title: string,
 description: string,
 link: string
}

const advantageCards: Array<AdvantageCardInterface> = reactive([
  {
    icon: 'unlimited-fleet',
    title: 'Неограниченый автопарк',
    description: 'Можно добавить неограниченное кол-во машин и водителей'
  },
  {
    icon: 'cost-reduction',
    title: 'Сокращение затрат до 50%',
    description: `
        Максимально быстро узнаете о штрафах в автоматическом режиме,
        тем самым у вас есть время оплатить по скидке
    `
  },
  {
    icon: 'safety',
    title: 'Безопасность',
    description: 'Данные передаются в зашифрованном виде, они доступны только получателю'
  },
  {
    icon: 'notification',
    title: 'Уведомление о погашении',
    description: `
        Мы оповестим вас о том, что штраф был погашен и
        соответствующая запись создана в ГИС ГМП
    `
  },
  {
    icon: 'receipt',
    title: 'Квитанция об оплате',
    description: `
        После совершения оплаты банковской картой на Вашу электронную почту
        придет квитанция об успешной оплате.
    `
  },
  {
    icon: 'all-history',
    title: 'Все история сохраняется по каждой машине',
    description: `
        Вся история штрафов сохраняется по машине и водителю,
        позволяет анализировать статистику по штрафам
    `
  }
])

const documentCards: Array<DocumentCardInterface> = reactive([
  {
    title: 'Лицензионный договор',
    description: `
        Механизм разбрасывания веерного типа приводится в действие от
        колес тележки, отличается простой и надежной конструкцией, не нуждается в смазке.
    `,
    link: '/license-agreement'
  },
  {
    title: 'Политика обработки персональных данных',
    description: 'Радиус разброса ПГМ составляет до 3 метров и может регулироваться.',
    link: '/processing-policy'
  },
  {
    title: 'Информация об оплате',
    description: `
        Десятипозиционный переключатель дозировки расположен на ручке тележки и
        позволяет очень точно регулировать объем рассыпаемого реагента с
        учетом его массы и фракции.
    `,
    link: '/payment-info'
  },
  {
    title: 'Лицензионный договор',
    description: `
        Механизм разбрасывания веерного типа приводится в действие от
        колес тележки, отличается простой и надежной конструкцией, не нуждается в смазке.
    `,
    link: '/license-agreement'
  }
])

// Swiper
const swiperInstance = ref()
const isFirstSlide = ref<boolean>(true)
const isEndSlide = ref<boolean>(true)

function onSwiper (swiper: any) {
  swiperInstance.value = swiper
}

const onSlideChange = () => {
  isEndSlide.value = swiperInstance.value.isEnd
  isFirstSlide.value = swiperInstance.value.isBeginning
}

const swiperNextSlide = () => { swiperInstance.value.slideNext() }
const swiperPrevSlide = () => { swiperInstance.value.slidePrev() }

// Popup
const popupVideoIsOpen = ref<boolean>(false)

// Form

const carNumber = ref('')
const carRegion = ref('')
const carRegistration = ref('')

const createCarNumberRegex = () => {
  const part1 = '^[АВЕКМНОРСТУХавекмнорстух]{1}[0-9]{3}(?<!0{3})[АВЕКМНОРСТУХавекмнорстух]{2}$'
  const part2 = '^[АВЕКМНОРСТУХавекмнорстух]{2}[0-9]{3,4}$'
  const part3 = '^[0-9]{3,4}[АВЕКМНОРСТУХавекмнорстух]{2}$'
  const part4 = '^[АВЕКМНОРСТУХавекмнорстух]{2}[0-9]{3}[АВЕКМНОРСТУХавекмнорстух]{1}$'

  return new RegExp(`${part1}|${part2}|${part3}|${part4}`, 'u')
}

const carNumberRegex = helpers.regex(createCarNumberRegex())
const carRegionRegex = helpers.regex(/^[0-9]{2,3}$/)
const carRegistrationRegex = helpers.regex(/^[0-9]{2}(?<!0{2})[0-9АВЕКМНОРСТУХавекмнорстух]{2}[0-9]{6}(?<!0{6})$/u)

const formRules = {
  carNumber: {
    required,
    carNumberRegex
  },
  carRegion: {
    required,
    carRegionRegex
  },
  carRegistration: {
    required,
    carRegistrationRegex
  }
}

const v$ = useVuelidate(formRules, { carNumber, carRegion, carRegistration })

const checkPenalties = () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    notify({
      type: 'success',
      title: 'Данные отправлены!',
      text: 'Данные отправлены'
    })
  } else {
    notify({
      type: 'error',
      title: 'Ошибка!',
      text: 'Проверьте данные и попробуйте еще раз'
    })
  }
}

</script>

<style lang="scss">

.welcome-page{
    margin-bottom: 50px;
    .check-fines{
        display: flex;
        gap: 40px;
        margin-top: 79px;
        margin-bottom: 98px;
        &__content{
            width: 563px;
            form{
                .row{
                    margin-bottom: 15px;
                    display: flex;
                    gap: 30px;
                    .opt-input:first-child{
                        input{
                            width: 320px;
                        }
                    }
                }
                .buttons{
                    margin-top: 15px;
                    margin-bottom: 16px;
                    display: flex;
                    gap: 21px;
                    &__check{
                        display: flex;
                        align-items: center;
                        gap: 2px;
                        &:hover{
                            .svg-icon{
                                path{
                                    fill: var(--text-color);
                                }
                            }
                        }
                    }
                    &__video{
                        display: flex;
                        gap: 4px;
                        span{
                            font-size: var(--font-size-md);
                            color: var(--text-important);
                        }
                        &:hover{
                            .svg-icon{
                                path{
                                    &:first-child{
                                        stroke: red;
                                    }
                                    &:last-child{
                                        fill: red;
                                    }
                                }
                            }
                            span{
                                color: colorOpacity(--text-reverse, 0.8);
                            }
                        }
                    }
                }
                .offer{
                    font-size: var(--font-size-xs2);
                    line-height: 120%;
                    color: var(--text-gray);
                }
            }
            h1{
                margin-bottom: 24px;
            }
        }
    }
    .advantages{
        margin-bottom: 85px;
        &__title{
            margin-bottom: 33px;
            text-align: center;
        }
        &__cards{
            display: grid;
            gap: 35px;
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .docs{
        &__title{
            margin-bottom: 20px;
            text-align: center;
        }
        &__swiper{
            position: relative;
            padding: 20px 20px;
            margin: 0 15px;
            .swiper-wrapper{
                margin-bottom: 15px;
            }
            .swiper-arrow{
                cursor: pointer;
                z-index: 2;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                &_prev{
                    left: 0;
                }
                &_next{
                    right: 0;
                    transform: rotateZ(180deg);
                }
                &_disabled{
                    opacity: 0.5;
                }
            }
        }
    }

}

@media (max-width: 1360px){
    .welcome-page{
        .check-fines{
            margin-top: 50px;
            margin-bottom: 50px;
            gap: 30px;
            &__content{
                width: 400px;
                form{
                    .row{
                        .opt-input:first-child input{
                            width: 200px;
                        }
                    }
                }
            }
            &__image{
                width: 45%;
                height: 45%;
            }
        }
        .advantages{
            margin-bottom: 50px;
            &__cards{
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
}

@media (max-width: 920px){
    .welcome-page{
        .check-fines{
            margin-top: 50px;
            margin-bottom: 50px;
            gap: 30px;
            &__content{
                width: 100%;
                form{
                    .row{
                        .opt-input:first-child input{
                            width: 100%;
                        }
                    }
                    .buttons{
                        flex-wrap: wrap;
                    }
                }
            }
            &__image{
               display: none;
            }
        }
    }
}

@media (max-width: 720px){
    .welcome-page{
        .advantages{
            &__cards{
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
}
</style>
