<template>
  <div v-if="productImages" class="image-carousel">
    <div class="thumbnail-images">
      <div v-for="(image, index) in productImages.slice(1)" :key="index" class="thumbnail-image">
        <img :src="image.url" alt="Thumbnail Image" width="50" height="50">
      </div>
    </div>
    <div class="main-image">
      <img :src="productImages[0].url" alt="Main Image" width="373" height="520" @mouseover="zoomIn" @mouseout="zoomOut">
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  productImages: {
    type: Array,
    required: true,
  },
});

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
