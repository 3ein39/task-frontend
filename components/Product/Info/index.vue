<script setup>
import { Tabs } from 'ant-design-vue';
import { defineProps } from 'vue';


const props = defineProps({
  productDetails: Object,
  productRatings: Array
})
</script>

<template>
  <Tabs v-if="productDetails && productRatings">
    <Tabs.TabPane key="1" tab="Info">
      <h1>Benefits</h1>
      <h2>{{productDetails.productGetByID.benefits}}</h2>
      <h1>Overview</h1>
      <h2>{{productDetails.productGetByID.overview}}</h2>
    </Tabs.TabPane>
    <Tabs.TabPane key="2" tab="Details">
      <h1>Gender: {{ productDetails.productGetByID.gender }}</h1>
      <h1>Capacity: {{ productDetails.productGetByID.capacity }}</h1>
      <h1>Model Number: {{ productDetails.productGetByID.model_number }}</h1>
    </Tabs.TabPane>
    <Tabs.TabPane key="3" tab="Reviews">
      <div v-for="rating in productRatings" :key="rating.user_id">
        <h1>{{ rating.user.username }}: {{ rating.rating }}</h1>
        <h2>{{ rating.comment }}</h2>
      </div>
    </Tabs.TabPane>
  </Tabs>
</template>

<style scoped>

</style>