<script setup>
import { Breadcrumb } from 'ant-design-vue'
const routes = [
  {
    path: '/',
    breadcrumbName: 'Home'
  },
  {
    path : '/categories',
    breadcrumbName: 'category 1'
  }
]
</script>

<template>

  <Breadcrumb :routes="routes" />

</template>

<style scoped>
  .ant-breadcrumb {
    margin: 16px;
  }
  .ant-breadcrumb-item {
    font-size: 20px;
  }
  .focus {
    color: #1890ff;
  }
</style>
