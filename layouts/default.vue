<template>
    <div class="page-layout">
        <opt-header />
        <slot class="page-slot" />
        <NuxtNotifications
            position="bottom right"
            :speed="500"
            :duration="30000"
        />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
</style>
