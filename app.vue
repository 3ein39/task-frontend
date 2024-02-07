<script setup>
const { locale } = useI18n()

provide('locale', locale)
</script>

<template>
    <LazyHeader />
    <LazyProduct />
    <LazyFooter />
</template>
