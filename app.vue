<script setup>
const { locale } = useI18n()
const { t } = useI18n()
import { provide, ref } from 'vue'
let selectedCountry = ref(t('saudiArabia'))

provide('selectedCountry', selectedCountry)
provide('locale', locale)
</script>

<template>
    <LazyHeader />
    <LazyProduct />
    <LazyFooter />
</template>
