<template>
    <div class="document-card">
        <div class="document-card__content">
            <div class="title">
                {{ title }}
            </div>
            <div class="text">
                {{ description }}
            </div>
        </div>
        <opt-button
            class="document-card__button"
            value="Перейти"
            @click="goToPage()"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true }
})

const router = useRouter()
const goToPage = () => { router.push(props.link) }

</script>

<style scoped lang="scss">
.document-card{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--background-color);
    border: 1px solid var(--background-light-gray-two);
    border-radius: 10px;
    width: 340px;
    height: 450px;
    &__content{
        .title{
            margin-bottom: 15px;
            font-weight: 700;
            font-size: var(--font-size-lg);
            line-height: 120%;
            color: var(--text-important);
        }
        .text{
            margin-bottom: 30px;
            line-height: 120%;
        }
    }
    &__button{
        width: 100%;
    }
}

@media (max-width: 1360px){
    .document-card{
        width: fit-content;
    }
}

@media (max-width: 920px){
    .document-card{
        height: 300px;
    }
}

@media (max-width: 720px){
    .document-card{
        height: 400px;
    }
}
</style>
