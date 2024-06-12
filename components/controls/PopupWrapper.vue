<template>
    <div
        class="popup"
        :class="[
            {'popup_opening': isOpening},
            {'popup_closing': isClosing}
        ]"
    >
        <div
            class="popup__background"
            @click="closePopup()"
        />
        <div class="popup__content">
            <div
                v-if="title"
                class="popup-title"
            >
                {{ title }}
            </div>
            <slot class="popup-template" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: null },
  close: { type: Function, default: null }
})

const emit = defineEmits(['close'])

const closePopup = () => {
  isClosing.value = true
  setTimeout(() => {
    isClosing.value = false
    emit('close')
  }, 1000)
}

const isOpening = ref<boolean>(true)
const isClosing = ref<boolean>(false)

setTimeout(() => {
  isOpening.value = false
}, 1000)
</script>

<style scoped lang="scss">
@keyframes openPopup {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(0); }
}

@keyframes closePopup {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100vh); }
}

@keyframes closePopupBg {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes openPopupBg {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.popup{
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    &_opening{
        .popup__background{
            animation: openPopupBg 0.6s ease forwards;
        }
        .popup__content{
            animation: openPopup 1s ease forwards;
        }
    }
    &_closing{
        pointer-events: none;
        .popup__background{
            animation: closePopupBg 0.6s ease forwards;
        }
        .popup__content{
            animation: closePopup 1s ease forwards;
        }
    }

    &__background{
        cursor: pointer;
        position: absolute;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0, 0.8);
    }

    &__content{
        cursor: default;
        z-index: 1001;
        width: fit-content;
        min-width: 300px;
        height: fit-content;
        padding: 10px;
        background: var(--background-color);
        border-radius: 15px;

        .popup-title{
            margin-bottom: 25px;
            font-weight: var(--font-weight-extrabold);
            font-size: var(--font-size-xxl-medium);
        }
    }
}
</style>
