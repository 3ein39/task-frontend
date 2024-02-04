<script setup>
import {Breadcrumb} from 'ant-design-vue'
import {gql, request} from 'graphql-request'
import {ref} from "vue";

const endpoint = 'http://localhost:4000/graphql'
let productDetails = ref(null);
let productImages = ref(null);

const loadProductDetails = async () => {
  const productByIDQuery = gql`
  query {
      productGetByID(product_id: 1) {
        product_id
        title
        description
        brand
        price
        discounted_price
        vat
        gained_points
        benefits
        overview
        gender
        capacity
        model_number
      },
      productGetImagesByID(product_id: 1) {
        image_id
        url
        is_main
    }
  }
  `
  productDetails.value = await request(endpoint, productByIDQuery)
  productImages.value = productDetails.value.productGetImagesByID
}
loadProductDetails()

// console.log(data)
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

  <div v-if="productDetails">
    <h1>{{productDetails.productGetByID.title}} title</h1>
    <p>{{productDetails.productGetByID.description}}</p>

    <div v-for="image in productImages" :key="image.image_id">
      <img :src="image.url" alt="product image" />
    </div>
  </div>

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
