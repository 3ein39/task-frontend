<script setup>
import { Tabs } from 'ant-design-vue';
import { defineProps } from 'vue';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
const locale = inject('locale');

const props = defineProps({
  productDetails: Object,
  productRatings: Array
})

const tabs = computed(() => [
  { title: t('information'), benefits: props.productDetails.productGetByID.benefits, overview: props.productDetails.productGetByID.overview },
  { title: t('details'), class: props.productDetails.productGetByID.gender, capacity: props.productDetails.productGetByID.capacity, model_number: props.productDetails.productGetByID.model_number},
  { title: t('ratings') }
])

const activeTab = ref(0);



</script>

<template>
  <div class="flex flex-col w-full px-16 py-32">
    <div class="flex mb-4">
      <div v-for="(tab, index) in tabs" :key="index" class="cursor-pointer py-2 mx-14 px-2 tab-nav"
        :class="{ 'tab-border in-focus': activeTab === index, 'ar': locale === 'ar' }" @click="activeTab = index">
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