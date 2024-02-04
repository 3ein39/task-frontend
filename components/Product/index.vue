<script setup>
import {Breadcrumb} from 'ant-design-vue'
import {gql, request} from 'graphql-request'
import {ref} from "vue";

const endpoint = 'http://localhost:4000/graphql'
let productDetails = ref(null);
let productImages = ref(null);
let productRatings = ref(null);

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
    },
      productGetRatingsByID(product_id: 1) {
        user_id
        rating
        comment
        timestamp
        user {
          username
        }
    }
  }
  `
  productDetails.value = await request(endpoint, productByIDQuery)
  productImages.value = productDetails.value.productGetImagesByID
  productRatings.value = productDetails.value.productGetRatingsByID
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

    <div v-for="rating in productRatings" :key="rating.user_id">
      <p>{{ rating.user.username }}: {{ rating.rating }}</p>
      <p>{{ rating.comment }}</p>
    </div>

    <button>Add to cart</button>

    <LazyProductInfo :product-details="productDetails" :product-ratings="productRatings" />
    <LazyProductSliders />
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
