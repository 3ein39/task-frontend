<script setup>
import { gql, request } from 'graphql-request'
import { ref } from "vue";

const endpoint = 'http://localhost:4000/graphql'
let products = ref(null);


const loadProducts = async () => {
  const query = gql`
    query {
      productGetAllWithImages {
        product_id
        title
        description
        price
        discounted_price
        images {
          url
        }
      } 
    }
  `
  products.value = await request(endpoint, query)
  // console.log(products.value)
}
loadProducts()

const loadAvgRating = async (product_id) => {
  const query = gql`
    query {
      productGetAvgRatingByID(product_id: ${product_id}) {
        avg_rating
      }
    }
  `
  const data = await request(endpoint, query)
  return data.productGetAvgRatingByID.avg_rating
}

products.value?.productGetAllWithImages.forEach(async (product) => {
  product.avg_rating = await loadAvgRating(product.product_id)
})

</script>


<template>
  <LazyProductSlidersCard :products="products.productGetAllWithImages"/>
</template>