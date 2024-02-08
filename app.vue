<script setup>
const { locale } = useI18n()
const { t } = useI18n()
import { provide, ref } from 'vue'
let selectedCountry = ref(t('saudiArabia'))
let countries = computed(() => [
    { name: t('egypt'), symbol: t('egyptCurrency'), rate: 15.69 },
    { name: t('unitedArabEmirates'), symbol: t('unitedArabEmiratesCurrency'), rate: 3.67 },
    { name: t('saudiArabia'), symbol: t('saudiArabiaCurrency'), rate: 3.75 },
    { name: t('jordan'), symbol: t('jordanCurrency'), rate: 0.71 },
    { name: t('qatar'), symbol: t('qatarCurrency'), rate: 3.64 },
    { name: t('kuwait'), symbol: t('kuwaitCurrency'), rate: 0.30 }
]);
provide('countries', countries)
provide('selectedCountry', selectedCountry)
provide('locale', locale)


</script>

<template>
    <LazyHeader />
    <LazyProduct />
    <LazyFooter />
</template>
