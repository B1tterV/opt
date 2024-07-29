<template>
    <div class="opt-table">
        <component :is="currentTableComponent" />
    </div>
</template>

<script setup lang="ts">
const currentTableComponent = ref<any>(null)

const updateTableComponent = () => {
  const mediaQuery = window.matchMedia('(max-width: 720px)')
  if (mediaQuery.matches) {
    currentTableComponent.value = 'OptTableMobile'
  } else {
    currentTableComponent.value = 'OptTableDesktop'
  }
}

onMounted(() => {
  updateTableComponent() // Установка начального значения
  window.addEventListener('resize', updateTableComponent)
})

// Удаление обработчиков событий при размонтировании компонента
onUnmounted(() => {
  window.removeEventListener('resize', updateTableComponent)
})
</script>

<style scoped lang="scss">
.opt-table{
}
</style>
