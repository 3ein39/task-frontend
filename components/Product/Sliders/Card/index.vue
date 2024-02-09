<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'
let locale = inject('locale')

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

const scrollContainer = ref(null);
const scroll = (direction) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += direction * 300;
  }
};
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
      <LeftOutlined v-if="locale === 'en'" @click='scroll(1)'/>
      <RightOutlined v-if="locale ==='ar'" @click="scroll(-1)"/>


      <!-- start of card -->
      <div ref="scrollContainer" class="flex overflow-x-scroll no-scrollbar scroll-container"
        :style="{ flexWrap: expanded ? 'wrap' : 'nowrap' }">

        <div v-if="products" v-for="product in products" :key="product.product_id">
          <div class="bg-white rounded-lg overflow-hidden shadow-2xl p-6 w-80"
            :style="{ width: expanded ? flex : '0 0 auto' }">
            <img v-if="product.images[0]" class="h-48 w-full object-cover object-end" :src="product.images[0].url" alt="Home in Countryside" />
            <div class="p-6">
              <div class="flex items-baseline">
                <span
                  class="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">New</span>
                <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                  placeholder
                </div>
              </div>
              <h4 class="mt-2 font-semibold text-lg leading-tight truncate">{{ product.title }} </h4>

              <div class="mt-1">
                <span>{{ product.price }}</span>
                <span class="text-gray-600 text-sm">/ wk</span>
              </div>
              <div class="mt-2 flex items-center">
                <span class="text-teal-600 font-semibold">
                </span>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <span>
                </span>
              </div>
            </div>


          </div>
        </div>
      </div>

      <!-- <button @click="scroll(-1)">←</button> -->
      <RightOutlined v-if="locale === 'en'" @click='scroll(-1)'/>
      <LeftOutlined v-if="locale ==='ar'" @click="scroll(1)"/>


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