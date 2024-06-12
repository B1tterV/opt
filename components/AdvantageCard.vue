<template>
    <div class="advantage-card">
        <svg-icon
            :icon="icon"
            class="advantage-card__icon"
        />
        <div class="advantage-card__content">
            <div class="title">
                {{ title }}
            </div>
            <div class="description">
                {{ description }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.advantage-card{
    gap: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--background-light-gray-two);
    border-radius: 10px;
    padding: 24px 20px;
    background: var(--background-light-gray);
    &__content{
        .title{
            margin-bottom: 10px;
            font-weight: 700;
            line-height: 120%;
            color: var(--text-important);
        }
        .description{
            font-size: var(--font-size-md);
            line-height: 120%;
        }
    }
}
</style>
