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
let productRatingsGroup = ref(null);

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
    },
     productGetRatingsGroupByRating(product_id: 1) {
        rating
        count
    },
    productGetRatingsCountByID(product_id: 1),
     productAverageRating(product_id: 1)
  }
  `
  productDetails.value = await request(endpoint, productByIDQuery)
  productImages.value = productDetails.value.productGetImagesByID
  productRatings.value = productDetails.value.productGetRatingsByID
  productRatingsGroup.value = productDetails.value.productGetRatingsGroupByRating
  state.priceBase = productDetails.value.productGetByID.price
  state.price = productDetails.value.productGetByID.price
  state.discountedPrice = productDetails.value.productGetByID.discounted_price
  state.discountBase = productDetails.value.productGetByID.discounted_price
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

const addToCart = () => {
  const productNum = document.getElementById('productNum').value;
  state.numberOfProducts += parseInt(productNum);
}

const scrollToRatings = () => {
  let tab = document.getElementById('ratings')
  tab.scrollIntoView({ behavior: 'smooth' });
  // click on the ratings tab
  tab.click()
}

</script>

<template>
  <Breadcrumb :routes="routes" />

  <div v-if="productDetails">

    <div class="main-product">
      <div class="left-main">
        <div class="product-details">
          <div class="border-2 border-gray-400 mb-8 flex items-center"
            :style="{ width: '584px', height: '89px', borderRadius: '18px' }">
            <img src="https://static.thcdn.com/images/large/webp/productimg/1600/1600/11423416-1554493886910365.jpg"
              alt="description" :style="{ width: '156px', height: '85px', borderRadius: '18px' }">
            <div class="flex-col" :style="{ width: '169px', height: '55px' }">
              <p class="mb-4"
                :style="{ fontFamily: 'Montserrat', fontSize: '20px', fontWeight: 500, lineHeight: '24px', letterSpacing: '0em', textAlign: 'left' }">
                ORIGINIAL 100%
              </p>
              <p
                :style="{ fontFamily: 'Montserrat-Arabic', fontSize: '16px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0em', textAlign: 'left', color: '#939393' }">
                المزيد من هذه الماركة
              </p>
            </div>
          </div>
          <div class="space-y-5 flex-col items-end" :style="{ width: '574px', height: '503px' }">
            <div class="flex justify-between items-center">
              <p
                :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '28px', fontWeight: 700, lineHeight: '34px', letterSpacing: '0em', textAlign: 'right' }">
                {{ productDetails.productGetByID.title }}
              </p>
              <p
                :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '22px', fontWeight: 500, lineHeight: '26px', textAlign: 'right', color: '#036C46' }">
                {{ $t('win') }} {{ productDetails.productGetByID.gained_points }} {{ $t('points') }}
              </p>
            </div>

            <p
              :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '24px', fontWeight: 400, lineHeight: '29px', letterSpacing: '0em', color: '#939393' }">
              {{ productDetails.productGetByID.description }}</p>


            <div class="flex items-center gap-8">
              <div class="bg-green-800 rounded-lg p-2 text-white inline-flex items-center gap-2"
                :style="{ backgroundColor: '#024B31' }">
                <svg class="w-4 h-4 text-white ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p
                  :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: '0em', color: 'white' }">
                  {{ productDetails.productAverageRating }} </p>

              </div>
              <p
                @click="scrollToRatings"
                :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 500, lineHeight: '24px', letterSpacing: '0em', color: '#036C46', textDecoration: 'underline', cursor: 'pointer' }">
                {{ productDetails.productGetRatingsCountByID }} {{ $t('ratings') }}</p>
            </div>

            <p
              :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '24px', fontWeight: 500, lineHeight: '29px', letterSpacing: '0em' }">
              {{ $t('productNumber') }}: {{ productDetails.productGetByID.model_number }}</p>

            <p :style="{
              fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '18px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0em', color: '#939393',
              textDecoration: 'line-through'
            }">
              {{ $t('before') }}: {{ state.price }} {{ state.symbol }}</p>

            <p
              :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '24px', fontWeight: 700, lineHeight: '29px', letterSpacing: '0em' }">
              {{ $t('now') }}: <span :style="{ fontSize: '30px' }">{{ state.discountedPrice }} {{
                state.symbol }} </span>
              <span :style="{
                fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '18px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0em', color: '#939393'
              }">
                ({{ $t('vatIncluded') }})
              </span>
            </p>

            <!-- you saved x p -->
            <div class="flex items-center gap-8">

              <p
                :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 500, lineHeight: '24px', letterSpacing: '0em' }">
                {{ $t('saved') }}: {{ state.price - state.discountedPrice
                }}
                {{
                  state.symbol }}
              <div class=" rounded-lg p-1 mx-8 text-white inline-flex items-center gap-2"
                :style="{ backgroundColor: '#E53E3E', padding: '6px, 10px, 6px, 10px' }">
                <p
                  :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: '0em' }">
                  {{ $t('discount') }} {{ Math.round((state.price -
                    state.discountedPrice) / state.price * 100) }}%
                </p>
              </div>
              </p>
            </div>

            <div class="flex gap-8" :style="{ alignItems: 'baseline' }">
              <fieldset class="border-4 p-2 rounded-lg" :style="{ borderColor: '#036C46' }">
                <legend class="rounded-lg p-1"
                  :style="{ backgroundColor: '#036C46', color: '#ffffff', padding: '8px, 4px, 8px, 4px', fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 500, lineHeight: '29px', letterSpacing: '0em' }">
                  {{ $t('bestValue') }}</legend>
                <div class="flex-row items-center">
                  <p>3 {{ $t('pckgs') }}</p>
                  <!-- price before and after discount -->
                  <div class="flex">
                    <p
                      :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: '0em' }">
                      {{ state.discountedPrice*3 }} {{ state.symbol }}</p>
                    <p :style="{
                      fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '14px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0em', color: '#939393',
                      textDecoration: 'line-through'
                    }">{{ state.price*3 }} {{ state.symbol }}</p>
                  </div>

                </div>
              </fieldset>
              <fieldset class="border-4 p-2 rounded-lg">
                <div class="flex-row items-center">
                  <p>6 {{ $t('pckgs') }}</p>
                  <!-- price before and after discount -->
                  <div class="flex">
                    <p
                      :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: '0em' }">
                      {{ state.discountedPrice*6 }} {{ state.symbol }}</p>
                    <p :style="{
                      fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '14px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0em', color: '#939393',
                      textDecoration: 'line-through'
                    }">{{ state.price*6 }} {{ state.symbol }}</p>
                  </div>

                </div>
              </fieldset>
              <fieldset class="border-4 p-2 rounded-lg">
                <div class="flex-row items-center">
                  <p>9 {{ $t('pckgs') }}</p>
                  <!-- price before and after discount -->
                  <div class="flex">
                    <p
                      :style="{ fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: '0em' }">
                      {{ state.discountedPrice*9 }} {{ state.symbol }}</p>
                    <p :style="{
                      fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '14px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0em', color: '#939393',
                      textDecoration: 'line-through'
                    }">{{ state.price * 9 }} {{ state.symbol }}</p>
                  </div>

                </div>
              </fieldset>
            </div>
            
            <div class="flex gap-4 items-center">
              
              <input id="productNum" type="number" min="1" class="border-2 border-gray-300 rounded-md text-center w-20"
              :style="{ height: '64px', fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700}"
              value="1"/>
              <button @click="addToCart" class="py-2 px-10 rounded-md text-white" :style="{ justifyContent: 'space-between',width: '440px', height: '64px', backgroundColor: '#FFBD1F', borderRadius: '12px', fontFamily: `${locale === 'ar' ? 'Montserrat-Arabic' : 'Montserrat'}`, fontSize: '20px', fontWeight: 700, lineHeight: '24px', letterSpacing: '0em' }">
                  {{ $t('addToCart') }}
                </button>
            </div>

          </div>
        </div>
      </div>
      <div class="right-main">
        <LazyProductImages :product-images="productImages" />
      </div>
    </div>



    <LazyProductInfo :product-details="productDetails" :product-ratings="productRatings" :product-ratings-group="productRatingsGroup" />
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
