<template>
    <div class="opt-toggle-cols">
        <div
            v-for="(column, columnIndex) in columns.filter(e => e.title !== '')"
            :key="`opt-toggle-item-${columnIndex}`"
            class="opt-toggle-cols__item"
        >
            <checkbox-custom
                default-type
                :checked="!column.hide"
                :text="column.title"
                @click="column.hide = !column.hide"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTableStore } from '~/store/table'
const { columns } = storeToRefs(useTableStore())
</script>

<style scoped lang="scss">
.opt-toggle-cols{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
