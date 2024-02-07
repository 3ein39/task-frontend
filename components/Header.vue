<script setup>
import '@/assets/css/header.css';
import { Space, Input, Dropdown, Typography, Menu } from 'ant-design-vue';
const { Search } = Input;
import { ref } from 'vue'
import { gql, request } from 'graphql-request'
import { useI18n } from 'vue-i18n'
import { inject } from 'vue';
const locale = inject('locale');
const { t } = useI18n();


if (process.client)
  document.dir = 'ltr';
console.log('locale', locale.value);

const endpoint = 'http://localhost:4000/graphql'


let countries = computed(() => [
  { name: t('egypt'), symbol: t('egyptCurrency'), rate: 15.69 },
  { name: t('unitedArabEmirates'), symbol: t('unitedArabEmiratesCurrency'), rate: 3.67 },
  { name: t('saudiArabia'), symbol: t('saudiArabiaCurrency'), rate: 3.75 },
  { name: t('jordan'), symbol: t('jordanCurrency'), rate: 0.71 },
  { name: t('qatar'), symbol: t('qatarCurrency'), rate: 3.64 },
  { name: t('kuwait'), symbol: t('kuwaitCurrency'), rate: 0.30 }
]);

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
let isLTR = ref(true);
let selectedCountry = ref(t('saudiArabia'));
let message = ref('');
let categories = ref([]);

const loadCategories = async () => {
  // fetch categories
  const query = gql`
    query {
      categoryGetAll {
        title
        slug
      }
    }
  `;
  const data = await request(endpoint, query);
  categories = data.categoryGetAll;

  categories.forEach(element => {
    console.log(element.title);
  });
}
loadCategories();


const toggleDirection = () => {
  isLTR.value = !isLTR.value;
  document.dir = isLTR.value ? 'ltr' : 'rtl';
  document.querySelector('html').setAttribute('lang', isLTR.value ? 'en' : 'ar');

  locale.value = isLTR.value ? 'en' : 'ar';

  console.log('countries', countries);
  console.log('locale', locale.value);
  console.log('isLTR', isLTR.value);
}

const fakeLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;

  // better to be implemented with something like flash 
  message.value = isLoggedIn.value ? t('loggedIn') : t('loggedOut');
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
const roundedClass = computed(() => (isLTR.value ? 'rounded-l-md' : 'rounded-r-md'));
const roundedClassX = computed(() => (!isLTR.value ? 'rounded-l-md' : 'rounded-r-md'));
</script>

<template>
  <a-modal v-model:open="isOpen" @ok="handleOK">
    <p>Comming Soon</p>
  </a-modal>
  <header>
    <div class="left-pane">

      <a-dropdown class="ship-info" :trigger="['click']">
        <div class="dropdown-link-container">
          <a class="ant-dropdown-link" @click.prevent>
            <DownOutlined />
          </a>
          <div class="dropdown-link-text">
            <p> {{ $t('shipTo') }}</p>
            <p> {{ selectedCountry }} </p>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="country in countries" :key="index" @click="changeCountry(country.name)">
              {{ $t(country.name) }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <img src="assets/icons/logo.png" alt="" srcset="">


    </div>


    <div class="mid-pane">
      <div class="flex flex-row w-full">
          <input :class="['w-full', 'py-2','px-4' ,'focus:outline-none', 'focus:ring-0', roundedClass]" type="text"
          placeholder="input search text" />
        <!-- recent searches and overlay to be implemented -->
        <button @click="isFinished" :class="['py-2', 'text-white','px-4', roundedClassX]" style="background-color: #FFBD1F;">
            <img src="/assets/icons/search.png" alt="Search" />
        </button>
      </div>
    </div>

    <div class="right-pane">

      <p @click="toggleDirection" class="btn" v-if="!isLTR"> EN </p>
      <p @click="toggleDirection" class="btn" v-if="isLTR"> AR </p>

      <img src="assets/icons/cart.png" alt="" srcset="">
      <p class="btn" @click="fakeLogin" v-if="!isLoggedIn">{{ $t('login') }} </p>
      <p class="btn" @click="fakeLogin" v-if="isLoggedIn"> {{ $t('logout') }}</p>




    </div>
  </header>
  <nav class="nav">
    <ul>
      <li v-if="categories" v-for="category in categories" :key="category.id">
        <!-- needs language support -->
        {{ category.title }}
      </li>
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
  flex-direction: row-reverse;
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