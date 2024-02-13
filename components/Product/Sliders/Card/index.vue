<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'
import { gql, request } from 'graphql-request'
let locale = inject('locale')
const endpoint = 'http://localhost:4000/graphql'

const expanded = ref(false)

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

// for each product in products, query the database to get the average rating
// and store it in the product object
const loadAvgRating = async (product_id) => {
  const query = gql`
    query {
      productAverageRating(product_id: ${product_id})
    }
  `
  const data = await request(endpoint, query)
  return data.productAverageRating
}

props.products.forEach(async (product) => {
  product.avg_rating = await loadAvgRating(product.product_id)
})

const scrollContainer = ref(null);
const scroll = (direction) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += direction * 300;
  }
};

let favStatus = ref({});
props.products.forEach((product) => {
  favStatus.value[product.product_id] = 'white';
});

const toggleFav = (id) => {
  console.log(id);
  if (favStatus.value[id] === '#FF0000') {
    favStatus.value[id] = 'white';
  } else {
    favStatus.value[id] = '#FF0000';
  }
}
</script>


<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
  <div class="heading">
    <p class="ar">{{ $t(`${title}`) }}</p>
    <p class="clickable" @click="expanded = !expanded"> {{ $t('seeMore') }} </p>

  </div>
  <div class="antialiased text-gray-900 ">
    <div class="p-8 items-center justify-center flex">

      <!-- <button @click="scroll(1)">→</button> -->
      <LeftOutlined v-if="locale === 'en'" @click='scroll(1)' />
      <RightOutlined v-if="locale === 'ar'" @click="scroll(-1)" />


      <!-- start of card -->
      <div ref="scrollContainer" class="flex overflow-x-scroll no-scrollbar scroll-container"
        :style="{ flexWrap: expanded ? 'wrap' : 'nowrap' }">

        <div v-if="products" v-for="product in products" :key="product.product_id">
          <div class="relative bg-white rounded-lg overflow-hidden p-3 m-3 w-80 border border-gray-300"
            :style="{ width: expanded ? flex : '0 0 auto' }">

            <!-- to be implemented to play only on hover -->
            <a-carousel autoplay>
              <div v-for="(image, index) in product.images" :key="image.id">
                <img class="h-48 w-full object-cover object-end" :src="image.url" alt="Product image" />
              </div>
            </a-carousel>


            <svg @click="toggleFav(product.product_id)" xmlns="http://www.w3.org/2000/svg"
              :fill="favStatus[product.product_id]" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#939393"
              :class="locale === 'en' ? 'w-12 h-12 absolute top-0 left-10 cursor-pointer' : 'w-12 h-12 absolute top-0 right-10 cursor-pointer'">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            <span :class="locale === 'en' ? 'absolute top-2 right-10' : 'absolute top-2 left-10'"
              class="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">New
            </span>
            <div class="p-6">

              <h4 class="mt-2 font-semibold text-lg leading-tight truncate">{{ product.title }} </h4>
              <h4 class="mt-2 font-semibold text-m leading-tight">{{ product.description }} </h4>

              <div class="flex">
                <svg v-for="n in Math.floor(product.avg_rating)" :key="n" xmlns="http://www.w3.org/2000/svg" fill="yellow"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <!-- remaining stars not filled -->
                <svg v-for="n in 5 - Math.floor(product.avg_rating)" :key="n" xmlns="http://www.w3.org/2000/svg"
                  fill="#F5BD3661" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>



              <div class="mt-1">
                <span>{{ product.price }}</span>
                <span class="text-gray-600 text-sm">/ wk</span>
              </div>
            </div>


          </div>
        </div>
      </div>

      <!-- <button @click="scroll(-1)">←</button> -->
      <RightOutlined v-if="locale === 'en'" @click='scroll(-1)' />
      <LeftOutlined v-if="locale === 'ar'" @click="scroll(1)" />


    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.heading {
  display: flex;
  align-items: center;
  margin: 0 50px 0 50px;
  justify-content: space-between;
}

.clickable {
  cursor: pointer;
  font-size: 24px;
  font-weight: 500;
  color: #939393;
}

.ar {
  text-align: right;
  font-size: 36px;
  font-weight: 700;
}
</style>