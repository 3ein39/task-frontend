<script setup>
import { Breadcrumb } from 'ant-design-vue'
import { gql, request } from 'graphql-request'
import { ref, watch } from "vue";
import { state } from '../../states'

const locale = inject('locale')
const selectedCountry = inject('selectedCountry')

const endpoint = 'http://localhost:4000/graphql'
let productDetails = ref(null);
let productImages = ref(null);
let productRatings = ref(null);

const loadProductDetails = async () => {
  const productByIDQuery = gql`
  query {
      productGetByID(product_id: 1, locale: "${locale.value}") {
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
watch(locale, loadProductDetails, { immediate: true });

// console.log(data)
const routes = [
  {
    path: '/',
    breadcrumbName: 'Home'
  },
  {
    path: '/categories',
    breadcrumbName: 'category 1'
  }
]

</script>

<template>
  <Breadcrumb :routes="routes" />

  <div v-if="productDetails">

    <div class="main-product">
      <div class="left-main">
        <div class="product-details">
          <div class="border-2 border-gray-400 mb-8 flex items-center" :style="{ width: '584px', height: '89px', borderRadius: '18px' }">
            <img src="https://static.thcdn.com/images/large/webp/productimg/1600/1600/11423416-1554493886910365.jpg" alt="description"
              :style="{ width: '156px', height: '85px', borderRadius: '18px' }">
              <div class="flex-col" :style="{ width: '169px', height: '55px' }">
                <p class="mb-4" :style="{ fontFamily: 'Montserrat', fontSize: '20px', fontWeight: 500, lineHeight: '24px', letterSpacing: '0em', textAlign: 'left' }">
                  ORIGINIAL 100%
                </p>
                <p :style="{ fontFamily: 'Montserrat-Arabic', fontSize: '16px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0em', textAlign: 'left', color: '#939393' }">
                    المزيد من هذه الماركة
                </p>
              </div>
          </div>
          <h1>{{ selectedCountry }}</h1>
          <h1>{{ state.symbol }} {{ state.newPrice }}</h1>
          <h1>{{ productDetails.productGetByID.title }}</h1>
          <p>{{ productDetails.productGetByID.description }}</p>
          <p>Brand: {{ productDetails.productGetByID.brand }}</p>
          <p>Price: {{ productDetails.productGetByID.price }}</p>
          <p>Discounted Price: {{ productDetails.productGetByID.discounted_price }}</p>
          <p>VAT: {{ productDetails.productGetByID.vat }}</p>
          <p>Gained Points: {{ productDetails.productGetByID.gained_points }}</p>
          <p>Benefits: {{ productDetails.productGetByID.benefits }}</p>
          <p>Overview: {{ productDetails.productGetByID.overview }}</p>
          <p>Gender: {{ productDetails.productGetByID.gender }}</p>
          <p>Capacity: {{ productDetails.productGetByID.capacity }}</p>
          <p>Model Number: {{ productDetails.productGetByID.model_number }}</p>
          <button class="btn">Add to cart</button>
        </div>
      </div>
      <div class="right-main">
        <LazyProductImages :product-images="productImages" />
      </div>
    </div>



    <LazyProductInfo :product-details="productDetails" :product-ratings="productRatings" />
    <LazyProductSliders />
  </div>
</template>

<style scoped>
.main-product {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: 20px;
  margin: 20px;
}

@media (max-width: 1194px) {
  .main-product {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
  }
}

.left-main {
  width: 50%;
  padding: 36px;
}

.right-main {
  width: 50%;
  padding: 36px;
}


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
