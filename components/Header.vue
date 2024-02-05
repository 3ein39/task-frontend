<script setup>
import '@/assets/css/header.css';
import { Space, Input, Dropdown, Typography, Menu } from 'ant-design-vue';
const { Search } = Input;
import { ref } from 'vue'

const countries = [
  { name: 'مصر', symbol: 'EGP', rate: 15.69 },
  { name: 'الإمارات', symbol: 'AED', rate: 3.67 },
  { name: 'السعودية', symbol: 'SAR', rate: 3.75 },
  { name: 'الأردن', symbol: 'JOD', rate: 0.71 },
  { name: 'قطر', symbol: 'QAR', rate: 3.64 },
  { name: 'الكويت', symbol: 'KWD', rate: 0.30 },
];

const currencySymbol = computed(() => {
  const country = countries.find(c => c.name === selectedCountry.value);
  return country ? country.symbol : '';
});

const convertPrice = (priceInUSD) => {
  const country = countries.find(c => c.name === selectedCountry.value);
  return country ? priceInUSD * country.rate : priceInUSD;
};

const changeCountry = (country) => {
  selectedCountry.value = country;
  // logic to change currency
  // logic to change price
};


const onSearch = (value, _e, info) => console.log(info?.source, value);

let isLoggedIn = ref(false);
let isOpen = ref(false);
let isLTR = ref(false);
let selectedCountry = ref('السعودية');
let message = ref('');


const toggleDirection = () => {
  isLTR.value = !isLTR.value;
  document.dir = isLTR.value ? 'ltr' : 'rtl';
  document.querySelector('html').setAttribute('lang', isLTR.value ? 'en' : 'ar');
  console.log('isLTR', isLTR.value);
}

const fakeLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;

  // better to be implemented with something like flash 
  message.value = isLoggedIn.value ? 'تم تسجيل الدخول بنجاح' : 'تم تسجيل الخروج بنجاح';
  setTimeout(() => {
    message.value = '';
  }, 2000);
};

const isFinished = () => {
  isOpen.value = true;
}
const handleOK = () => {
  isOpen.value = false;
}

</script>

<template>
  <a-modal v-model:open="isOpen" @ok="handleOK">
    <p>Comming Soon</p>
  </a-modal>
  <header>
    <div class="left-pane">
      <p @click="toggleDirection" class="btn">EN</p>
      <img src="assets/icons/cart.png" alt="" srcset="">
      <p class="ar btn" @click="fakeLogin" v-if="!isLoggedIn">تسجيل الدخول</p>
      <p class="btn" @click="fakeLogin" v-if="isLoggedIn">تسجيل الخروج</p>
    </div>


    <div class="mid-pane">
      <div class="flex flex-row-reverse w-full">
        <input class="w-full px-4 py-2 rounded-r-md focus:outline-none focus:ring-0" type="text"
          placeholder="input search text" />
        <!-- recent searches and overlay to be implemented -->
        <button @click="isFinished" class="px-4 py-2 text-white rounded-l-md" style="background-color: #FFBD1F;">
          <img src="/assets/icons/search.png" alt="Search" />
        </button>
      </div>
    </div>

    <div class="right-pane">
      <a-dropdown class="ship-info" :trigger="['click']">
        <div class="dropdown-link-container">
          <a class="ant-dropdown-link" @click.prevent>
            <DownOutlined />
          </a>
          <div class="dropdown-link-text">
            <p> الشحن إلى</p>
            <p> {{ selectedCountry }} </p>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="country in countries" :key="country.name" @click="changeCountry(country.name)">
              {{ country.name }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <img src="assets/icons/logo.png" alt="" srcset="">
    </div>
  </header>
  <nav class="nav">
    <ul>
      <!-- placeholders -->
      <li>تواصل معنا</li>
      <li>المدونة</li>
      <li>العروض</li>
      <li>المتجر</li>
      <li>الرئيسية</li>
      <li>
        <MenuOutlined />
      </li>

    </ul>
  </nav>
  <p class="ar">{{ message }}</p>
</template>
<style scoped>
:root {
  --p-font-en: 'Montserrat';
  --p-font-ar: 'Montserrat-Arabic';
  --p-sz: 30px;
}

@media (max-width: 1194px) {
  .ship-info {
    display: none !important;
  }
}


.dropdown-link-container {
  display: flex;
  align-items: center;
}

.dropdown-link-text {
  margin-right: 10px;
  /* Adjust as needed */
}

.ant-dropdown-link {
  display: flex;
  flex-direction: row;
  margin: 8px;
}

header {
  background-color: #036C46;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 132px;
  gap: 39px;
}

.left-pane,
.mid-pane,
.right-pane {
  display: flex;
  align-items: center;
  color: white;
  height: 37px;
  gap: 39px;
}

.mid-pane {
  gap: 0;
  width: 400px;
}

p {
  font-family: 'Montserrat';
  font-weight: 800;
  font-size: 30px;
  margin: 0;
}

p.ar {
  font-family: 'Montserrat-Arabic';
}

.nav {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 25px;
  height: 57px;
  padding: 27px 134px;
  background-color: #024B31;
}

ul {
  display: flex;

  gap: 39px;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  font: var(--p-font-ar);
  color: white;
}

.btn {
  cursor: pointer;
}

.a-modal-body {
  color: #038E5C;
}
</style>