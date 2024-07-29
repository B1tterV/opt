<template>
    <section class="table-page">
        <div class="table-page__title">
            Проведение ТО и мелкий ремонт
        </div>
        <div class="table-page__row">
            <ul class="table-nav">
                <li
                    :class="{'active': activeTable === 'total'}"
                    @click="activeTable = 'total'"
                >
                    Общее
                </li>
                <li
                    :class="{'active': activeTable === 'product'}"
                    @click="activeTable = 'product'"
                >
                    Товары
                </li>
                <li
                    :class="{'active': activeTable === 'additional'}"
                    @click="activeTable = 'additional'"
                >
                    Доп. расходы
                </li>
            </ul>
            <div class="table-settings">
                <svg-icon
                    icon="settings"
                    @click="tableSettingsTopIsOpen = !tableSettingsTopIsOpen"
                />
                <opt-table-settings
                    v-if="tableSettingsTopIsOpen"
                    v-click-outside="() => tableSettingsTopIsOpen = false"
                    :items="[{name: 'Отображение столбцов', component: 'opt-toggle-cols'}]"
                />
            </div>
        </div>
        <div class="table-page__buttons">
            <opt-button
                b-form="blue"
                class="add-button"
                @click="addRow()"
            >
                <svg-icon icon="add" />
                Добавить строку
            </opt-button>
        </div>
        <opt-table />
    </section>
</template>

<script setup lang="ts">
import { useTableStore } from '~/store/table'
const { addRow, generateTestData } = useTableStore()
const { rows, tableSettingsTopIsOpen } = storeToRefs(useTableStore())
const activeTable = ref<string>('product')

onMounted(() => {
  if (process.client && rows.value.length === 0) {
    rows.value = generateTestData()
  }
})

</script>

<style scoped lang="scss">
.table-page{
    margin-bottom: 100px;
    &__title{
        margin-bottom: 25px;
        font-size: 30px;
    }
    &__row{
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 15px;
        .table-nav{
            cursor: pointer;
            display: flex;
            gap: 25px;
            li{
                font-size: 16px;
                font-weight: 600;
                color: #1253a2;
                &.active{
                    color: #000;
                }
            }
        }
        .table-settings{
            position: relative;
            cursor: pointer;
        }
    }
    &__buttons{
        margin-bottom: 25px;
        border-radius: 10px;
        padding: 20px 25px;
        box-shadow: 0 5px 20px 0 rgba(0,0,0, 0.07);
        border: solid 1px #eeeff1;
        background-color: #fff;
        .add-button{
            gap: 7px;
            border-radius: 5px;
            height: 35px;
        }
    }
}
</style>
