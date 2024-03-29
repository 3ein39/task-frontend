<template>
  <div v-if="productImages" class="image-carousel">
    <div class="thumbnail-images">
      <div v-for="(image, index) in productImages.slice(1)" :key="index" class="thumbnail-image"
        @click="swapImage(image)">
        <img :src="image.url" alt="Thumbnail Image" width="50" height="50">
      </div>
    </div>
    <div class="main-image relative">
      <img :class="{ 'zoom': zoom }" :src="mainImage.url" alt="Main Image" width="373" height="520">
      <svg @click="toggleFav" xmlns="http://www.w3.org/2000/svg" :fill="svgColor" viewBox="0 0 24 24" strokeWidth={1.5}
        stroke="#939393"
        :class="locale === 'en' ? 'w-12 h-12 absolute top-0 left-10 cursor-pointer' : 'w-12 h-12 absolute top-0 right-10 cursor-pointer'">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#939393"
        :class="locale === 'en' ? 'w-12 h-12 absolute top-12 left-10 cursor-pointer' : 'w-12 h-12 absolute top-12 right-10 cursor-pointer'"
        @click="share">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
      </svg>


      <svg @click="zoomIn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="#939393"
        :class="locale === 'en' ? 'w-12 h-12 absolute bottom-0 right-10 cursor-pointer' : 'w-12 h-12 absolute bottom-0 left-10 cursor-pointer'">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
      </svg>


    </div>
  </div>

  <div v-if="showShareModal" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="bg-white p-6 rounded shadow-lg z-10" style="width: 50%;">
      <p class="mb-4 text-lg font-semibold">Copy and paste this link to share:</p>
      <div class="mb-4 relative">
        <input type="text" v-model="shareableLink" readonly class="w-full px-4 py-2 border border-gray-300 rounded">
        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" @click="copyToClipboard">
          Copy
        </button>
      </div>
      <button @click="showShareModal = false" class="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
let locale = inject('locale');

const props = defineProps({
  productImages: {
    type: Array,
    required: true,
  },
});

let mainImage = ref(props.productImages[0]);

let svgColor = ref('white');


// not supported by many browsers
// fix: Modal fallback
let shareableLink = ref(window.location.href);
let showShareModal = ref(false);
const share = () => {
  if (navigator.share) {
    navigator.share({
      title: 'WebShare API Demo',
      url: shareableLink.value,
    }).then(() => {
      console.log('Thanks for sharing!');
    })
      .catch(console.error);
  } else {
    console.log('Web Share API not supported');
    showShareModal.value = true;
  }
};

// the copy to clipboard function
const copyToClipboard = () => {
  const el = document.createElement('textarea');
  el.value = shareableLink.value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const swapImage = (image) => {
  let temp = mainImage.value;
  mainImage.value = image;
  image = temp;
};

const toggleFav = () => {
  if (svgColor.value === 'white') {
    svgColor.value = '#FF0000';
  } else {
    svgColor.value = 'white';
  }
}

const zoomIn = (event) => {
  const mainImage = document.querySelector('.main-image');
  mainImage.classList.add('zoomed');

  mainImage.addEventListener('click', (event) => {
    if (event.target === mainImage) {
      zoomOut();
    }
  });
  document.addEventListener('keydown', (event) => {
    zoomOut();
  });
};


const zoomOut = () => {
  const mainImage = document.querySelector('.main-image');
  mainImage.classList.remove('zoomed');
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

.zoomed {
  transform: scale(1.5);
  transition: transform 0.25s ease;
  z-index: 1000;
  position: fixed;
  top: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: 'zoom-out';
  z-index: 1000;
  top: 0;
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
