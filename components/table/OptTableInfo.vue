<template>
    <div
        class="opt-table-info"
        :class="{'opt-table-info_mobile': isMobile}"
    >
        <div class="general-info info-content">
            <div
                v-for="info in infos"
                :key="`info-${info.field}`"
                class="general-info__item"
            >
                <div class="name">
                    {{ info.name }}
                </div>
                <div class="count">
                    {{ info.count }} {{ info.text }}
                </div>
            </div>
        </div>
        <div class="total-info info-content">
            <div class="name">
                {{ totalInfo.name }}
            </div>
            <div class="count">
                {{ totalInfo.count }} {{ totalInfo.text }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTableStore } from '~/store/table'
const { rows } = storeToRefs(useTableStore())

defineProps({
  isMobile: { type: Boolean, default: false }
})

const infos = ref<any>([
  { name: 'Сумма:', count: 0, text: 'руб', field: 'price' },
  { name: 'Кол-во:', count: 0, text: 'шт', field: 'qty' },
  { name: 'Общий вес:', count: 0, text: 'кг', field: 'total' }
])

const totalInfo = ref<any>({ name: 'Общая сумма:', count: 0, text: 'руб', field: 'price' })

const colculateInfo = () => {
  let sum = 0
  let qty = 0
  for (const info of infos.value) {
    const filteredRows = rows.value.map((row: any) => parseInt(row[info.field]))
    info.count = filteredRows.reduce((a, b) => a + b, 0)
    if (info.field === 'price') {
      sum = info.count
    }
    if (info.field === 'qty') {
      qty = info.count
    }
  }
  totalInfo.value.count = sum * qty
}

if (process.client && rows.value.length > 0) {
  colculateInfo()
}

watch(() => rows.value, () => {
  if (process.client && rows.value.length > 0) {
    colculateInfo()
  }
}, { deep: true, immediate: true })
</script>

<style scoped lang="scss">
.opt-table-info{
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
    align-items: flex-end;
    margin-right: 15px;
    &_mobile{
        margin-right: 0;
        .info-content{
            width: 100% !important;
        }
    }
    .info-content{
      width: 304px;
      padding: 15px;
      border-radius: 5px;
      border: solid 1px #eeeff1;
      background-color: #fbfcfd;
    }
    .general-info{
      display: flex;
      flex-direction: column;
      gap: 15px;
      &__item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name{
          color: #8f8f8f;
        }
      }
    }
    .total-info{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
}
</style>
