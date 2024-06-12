<template>
    <div class="opt-breadcrumbs">
        <nuxt-link
            v-for="(breadcrumb, breadcrumbIndex) in breadcrumbs"
            :key="`breadcrumb-${breadcrumbIndex}`"
            class="opt-breadcrumbs__item"
            :class="{'opt-breadcrumbs__item_active': route.path === breadcrumb.link}"
            :to="breadcrumb.link"
        >
            {{ breadcrumb.name }}
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">

interface breadcrumbsItem {
  link: string,
  name: string
}

defineProps({
  breadcrumbs: { type: Array<breadcrumbsItem>, required: true, default: [] }
})

const route = useRoute()
</script>

<style scoped lang="scss">
.opt-breadcrumbs{
    margin: 20px 0;
    display: flex;
    &__item{
        display: flex;
        align-items: center;
        color: var(--text-color);
        font-size: var(--font-size-xs2);
        &:hover{
            color: var(--text-link);
        }
        &_active{
            color: var(--text-gray);
            &:hover{
                color: var(--text-gray);
            }
        }
        &:not(:last-child)::after{
            content:"\A";
            width: 5px;
            height: 5px;
            border-radius: 100%;
            background: var(--text-color);
            display: inline-block;
            margin: 0 10px;
            margin-top: 2px;
        }
    }
}
</style>
