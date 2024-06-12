<template>
    <div class="document-page">
        <opt-breadcrumbs
            class="container"
            :breadcrumbs="breadcrumbs"
        />
        <section>
            <h1>Это пустая страница</h1>
        </section>
    </div>
</template>

<script setup lang="ts">
const breadcrumbs = ref([
  { name: 'Главная страница', link: '/' },
  { name: 'Документы', link: '/documents' }
])

</script>

<style scoped>

</style>
