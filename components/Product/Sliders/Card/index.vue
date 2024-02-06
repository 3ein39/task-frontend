<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  products: {
    type: Array,
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

  <div class="antialiased text-gray-900 ">
    <div class="min-h-screen p-8 items-center justify-center flex">

      <button @click="scroll(-1)">←</button>

      <!-- start of card -->
      <div ref="scrollContainer" class="flex overflow-x-scroll no-scrollbar scroll-container">

        <div v-if="products" v-for="product in products" :key="product.product_id">
          <div class="bg-white rounded-lg overflow-hidden shadow-2xl p-6 w-80">
            <!--E11-->
            <!-- <div class="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div> -->
            <img class="h-48 w-full object-cover object-end"
              :src="product.images[0].url"
              alt="Home in Countryside" />
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
      <button @click="scroll(1)">→</button>


    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>