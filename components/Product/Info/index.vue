<script setup>
import { Tabs } from 'ant-design-vue';
import { defineProps } from 'vue';
import { ref } from 'vue'

const tabs = [
  { title: 'معلومات', content: 'Tab 1 content' },
  { title: 'تفاصيل', content: 'Tab 2 content' },
  { title: 'التقييم', content: 'Tab 3 content' }
];

const activeTab = ref(0);


const props = defineProps({
  productDetails: Object,
  productRatings: Array
})
</script>

<template>
  <div class="flex flex-col w-full px-16 py-32" dir="rtl">
    <div class="flex mb-4">
      <div v-for="(tab, index) in tabs" :key="index" class="cursor-pointer py-2 mx-14 px-2 tab-nav"
        :class="{ 'tab-border in-focus': activeTab === index }" @click="activeTab = index">
        {{ tab.title }}
      </div>
    </div>
    <div class="tab-content">
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
        {{ tab.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-nav {
  font-size: 32px;
  font-weight: 700;
  color: #939393;
  font-family: 'Montserrat-Arabic';
}

.tab-border {
  border-bottom: 6px solid #48B1A6;
}

.in-focus {
  color : black;
}

</style>