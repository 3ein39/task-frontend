<script setup>
import { gql, request } from 'graphql-request'
import { ref } from "vue";

const { t } = useI18n()
const endpoint = 'http://localhost:4000/graphql'
const locale = inject('locale')
let products = ref(null);

let similarProductsTitle = 'similarProducts'
let moreLikeThisTitle = 'moreFromThisBrand'

const loadProducts = async () => {
  const query = gql`
    query {
      productGetAllWithImages(locale: "${locale.value}") {
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
      productAveragrRating(product_id: ${product_id})
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

  <LazyProductSlidersCard v-if="products" :products="products.productGetAllWithImages" :title="similarProductsTitle" />
  <LazyProductSlidersCard v-if="products" :products="products.productGetAllWithImages" :title="moreLikeThisTitle" />
</template>

<style scoped>



</style>