<template>
    <div class="opt-table-settings">
        <div
            v-for="(item, itemIndex) in items"
            :key="`table-settings-item-${itemIndex}`"
            class="opt-table-settings__item"
            :class="{'opt-table-settings__item_open' : activeItem}"
            @click="activeItem = item"
        >
            <p v-if="!activeItem">
                {{ item.name }}
            </p>
            <svg-icon
                icon="arrow-right"
                :class="{'reverse-icon': activeItem}"
                @click.stop="activeItem = null"
            />
            <component
                :is="activeItem.component"
                v-if="activeItem"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['open'])

defineProps({
  items: { type: Array<any>, required: true }
})

const activeItem = ref<any>(null)

</script>

<style scoped lang="scss">
.opt-table-settings{
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    background-color: #fff;
    z-index: 100;
    overflow: hidden;
    &__item{
        display: flex;
        gap: 9px;
        padding: 7px 10px;
        white-space: nowrap;
        font-size: 14px;
        color: #161616;
        &:hover{
            background-color: #eef3f8;
        }
        &_open{
            padding-left: 30px;
            &:hover{
                background-color: #fff;
            }
        }
        .reverse-icon{
            transform: rotate(180deg);
            position: absolute;
            height: 100%;
            top: 0;
            left: 0;
            padding: 10px;
            &:hover{
                background-color: #eef3f8;
            }
        }
    }
}
</style>
