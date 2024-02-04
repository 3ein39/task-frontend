<script setup>
import { defineAsyncComponent } from 'vue'

const Header = defineAsyncComponent(() =>
    import('./components/Header.vue')
)

const Product = defineAsyncComponent(() =>
    import('./components/Product/index.vue')
)
</script>

<template>
    <LazyHeader />
    <LazyProduct />
    <LazyFooter />
</template>
