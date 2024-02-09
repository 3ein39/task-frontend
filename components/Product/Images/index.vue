<template>
  <div v-if="productImages" class="image-carousel">
    <div class="thumbnail-images">
      <div v-for="(image, index) in productImages.slice(1)" :key="index" class="thumbnail-image">
        <img :src="image.url" alt="Thumbnail Image" width="50" height="50">
      </div>
    </div>
    <div class="main-image relative">
      <img :src="productImages[0].url" alt="Main Image" width="373" height="520">
      <svg @click="toggleFav" xmlns="http://www.w3.org/2000/svg" :fill="svgColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#939393"
        :class="locale === 'en' ? 'w-12 h-12 absolute top-0 left-10' : 'w-12 h-12 absolute top-0 right-10'">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
let locale = inject('locale');

let svgColor = ref('white');

const props = defineProps({
  productImages: {
    type: Array,
    required: true,
  },
});

const toggleFav = () => {
  if (svgColor.value === 'white') {
    svgColor.value = '#FF0000';
  } else {
    svgColor.value = 'white';
  }
}

const zoomIn = () => {
  const mainImage = document.querySelector('.main-image');
  mainImage.style.transform = 'scale(1.3)';
}

const zoomOut = () => {
  const mainImage = document.querySelector('.main-image');
  mainImage.style.transform = 'scale(1)';
}

</script>

<style scoped>
.image-carousel {
  display: flex;
  align-items: flex-start;
}

.main-image {
  width: 373px;
  height: 520px;
  overflow: hidden;
}

.thumbnail-images {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail-image {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.thumbnail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}


@media (max-width: 1193px) {
  .image-carousel {
    flex-direction: column;
  }

  .thumbnail-images {
    display: flex;
    flex-direction: row;
  }
}
</style>
