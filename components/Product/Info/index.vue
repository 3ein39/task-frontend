<script setup>
import { Tabs } from 'ant-design-vue';
import { defineProps } from 'vue';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
const locale = inject('locale');

const props = defineProps({
  productDetails: Object,
  productRatings: Array,
  productRatingsGroup: Object
})

const tabs = computed(() => [
  { title: t('information'), benefits: props.productDetails.productGetByID.benefits, overview: props.productDetails.productGetByID.overview },
  { title: t('details'), class: props.productDetails.productGetByID.gender, capacity: props.productDetails.productGetByID.capacity, model_number: props.productDetails.productGetByID.model_number },
  { title: t('ratings') }
])

const activeTab = ref(0);



</script>

<template>
  <div class="flex flex-col w-full px-16 py-32">
    <div class="flex mb-4">
      <div v-for="(tab, index) in tabs" :key="index" class="cursor-pointer py-2 mx-14 px-2 tab-nav"
        :class="{ 'tab-border in-focus': activeTab === index, 'ar': locale === 'ar' }" @click="activeTab = index"
        :id="index === 2 ? 'ratings' : ''">
        {{ tab.title }}
      </div>
    </div>
    <div class="tab-content flex-row mb-4">
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
        <!-- tab 1 -->
        <div class=" py-2 mx-14 px-2 tab-nav-sm flex-row" v-if="activeTab === 0">
          {{ $t('benefits') }}
          <div class="tab-nav-content">
            {{ tab.benefits }}
          </div>
        </div>
        <div class=" py-2 mx-14 px-2 tab-nav-sm" v-if="activeTab === 0">
          {{ $t('overview') }}
          <div class="tab-nav-content">
            {{ tab.overview }}
          </div>
        </div>

        <!-- tab 2 -->
        <div class=" py-2 mx-14 px-2 tab-nav-sm flex" v-if="activeTab === 1">
          {{ $t('class') }} :
          <div class="px-16 text-black">
            {{ tab.class }}
          </div>
        </div>
        <div class=" py-2 mx-14 px-2 tab-nav-sm flex" v-if="activeTab === 1">
          {{ $t('capacity') }} :
          <div class="px-16 text-black">
            {{ tab.capacity }}
          </div>
        </div>
        <div class=" py-2 mx-14 px-2 tab-nav-sm flex" v-if="activeTab === 1">
          {{ $t('modelNo') }} :
          <div class="px-16 text-black">
            {{ tab.model_number }}
          </div>
        </div>

        <!-- tab 3 -->
        <div class=" py-2 mx-14 px-2 tab-nav-sm flex" v-if="activeTab === 2">
          <div class="flex-row">
            <div v-for="i in 5" :key="i" class="row-content flex items-center border-2 p-2 mb-2">
              <p class="m-2">{{ i }}</p>
              <svg v-for="n in i" :key="n" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="yellow" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <!-- remaining stars are not filled -->
              <svg v-for="n in 5 - i" :key="n" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="yellow" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <p class="m-2"> {{ (productRatingsGroup.find(el => el.rating === i) || {}).count }}
              </p>

            </div>
          </div>
          <div class="flex flex-col p-6 items-center px-32 gap-4">
            <p :class="{ 'ar': locale === 'ar', 'en': locale === 'en' }"
              :style="{ fontWeight: '700', fontSize: '32px', color: 'black' }">{{ $t('generalRating') }}</p>
            <!-- stars with number of avg rating-->
            <div class="flex items-center">
              <svg v-for="i in productDetails.productAverageRating" :key="i" xmlns="http://www.w3.org/2000/svg"
                fill="yellow" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <!-- remaining stars are not filled -->
              <svg v-for="i in 5 - productDetails.productAverageRating" :key="i" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </div>
            <p :style="{ fontWeight: '700', fontSize: '32px', color: 'black' }"
              :class="{ 'ar': locale === 'ar', 'en': locale === 'en' }">{{ productDetails.productAverageRating }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-nav {
  font-size: 32px;
  font-weight: 700;
  color: #939393;
  font-family: 'Montserrat';
}

.ar {
  font-family: 'Montserrat-Arabic';
}

.en {
  font-family: 'Montserrat';
}

.tab-nav-sm {
  font-size: 24px;
  font-weight: 700;
  color: #939393;
  font-family: 'Montserrat';
}

.tab-nav-content {
  font-size: 20px;
  font-weight: 400;
  color: #939393;
  font-family: 'Montserrat';

}

.tab-border {
  border-bottom: 6px solid #48B1A6;
}

.in-focus {
  color: black;
}
</style>