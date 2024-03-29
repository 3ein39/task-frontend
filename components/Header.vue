<script setup>
import '@/assets/css/header.css';
import { Space, Input, Dropdown, Typography, Menu } from 'ant-design-vue';
const { Search } = Input;
import { ref } from 'vue'
import { gql, request } from 'graphql-request'
import { useI18n } from 'vue-i18n'
import { inject, onMounted, watch } from 'vue';
import { state } from '../states'
const { t } = useI18n();


const locale = inject('locale');
let selectedCountry = inject('selectedCountry');

let isLoggedIn = ref(false);
let isOpen = ref(false);
let isLTR = ref(true);
let message = ref('');
let categories = ref([]);


onMounted(() => {
  changeCountry(selectedCountry.value);
  console.log('inside onMounted')
  console.log('selectedCountry', selectedCountry.value);
})



if (process.client)
  document.dir = 'ltr';
console.log('locale', locale.value);

const endpoint = 'http://localhost:4000/graphql'


let countries = inject('countries');

const currencySymbol = () => {
  const country = countries.value.find(c => c.name === selectedCountry.value);
  return country ? country.symbol : '';
};

const convertPrice = (priceInUSD) => {
  const country = countries.value.find(c => c.name === selectedCountry.value);
  return country ? priceInUSD * country.rate : priceInUSD;
};

// when the page first loads prices are in USD not SAR
const changeCountry = (country) => {
  selectedCountry.value = country;
  // logic to change currency
  state.symbol = currencySymbol(selectedCountry)

  // actual price to be added
  state.price = convertPrice(state.priceBase)
  state.discountedPrice = convertPrice(state.discountBase)
};

const onSearch = (value, _e, info) => console.log(info?.source, value);



const loadCategories = async () => {
  const query = gql`
    query {
      categoryGetAll(locale: "${locale.value}") {
        title
        slug
      }
    }
  `;
  const data = await request(endpoint, query);
  categories.value = data.categoryGetAll;
}
loadCategories();
watch(locale, loadCategories, { immediate: true });



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

let showSearchOverlay = ref(false);

const showOverlay = () => {
  showSearchOverlay.value = true;
};

const hideOverlay = () => {
  showSearchOverlay.value = false;
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    showOverlay();
  }
};

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
            <a-menu-item v-if="countries" v-for="(country, index) in countries" :key="index"
              @click="changeCountry(country.name)">
              {{ country.name }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <img src="assets/icons/logo.png" alt="" srcset="">


    </div>


    <div class="relative">
      <div class="mid-pane relative z-10">
          <form @submit.prevent="isFinished" class="flex flex-row w-full">
            <input :class="['w-full', 'py-2', 'px-4', 'focus:outline-none', 'focus:ring-0', roundedClass]"
              :style="{ color: 'black' }" type="text" placeholder="input search text" @click="showOverlay"
              @keydown="handleKeyDown" />
               <button @click="isFinished" :class="['py-2', 'text-white', 'px-4', roundedClassX]"
              style="background-color: #FFBD1F;">
              <img src="/assets/icons/search.png" alt="Search" />
            </button>
          </form>
         
        <!-- Fake recent searches -->
        <div v-if="showSearchOverlay"
          class="absolute top-full w-full bg-white border border-gray-200 z-10 p-6 rounded-b-lg">
          <ul class="flex-col p-6">
            <li class="px-4 py-2" :style="{ color: 'black' }">Recent search 1</li>
            <li class="px-4 py-2" :style="{ color: 'black' }">Recent search 2</li>
            <li class="px-4 py-2" :style="{ color: 'black' }">Recent search 3</li>
          </ul>
        </div>
      </div>
      <div v-if="showSearchOverlay" class="fixed inset-0 bg-black bg-opacity-50" @click="hideOverlay">
      </div>
    </div>



    <div class="right-pane">

      <p @click="toggleDirection" class="btn" v-if="!isLTR"> EN </p>
      <p @click="toggleDirection" class="btn" v-if="isLTR"> AR </p>

      <div class="relative">
        <img src="assets/icons/cart.png" alt="" srcset="">
        <div class="h-6 w-6 bg-orange-500 text-white text-center rounded-full absolute top-[-10px] right-[-10px]"
          v-if="state.numberOfProducts > 0">
          {{ state.numberOfProducts }}
        </div>
      </div>


      <p class="btn" @click="fakeLogin" v-if="!isLoggedIn">{{ $t('login') }} </p>
      <p class="btn" @click="fakeLogin" v-if="isLoggedIn"> {{ $t('logout') }}</p>




    </div>
  </header>
  <nav class="nav">
    <ul>
      <li>
        <MenuOutlined />
      </li>
      <li v-if="categories" v-for="category in categories" :key="category.id"
      :style="{ color: 'white', fontWeight: '700', fontSize: '18px', fontFamily: locale === 'ar' ? 'var(--p-font-ar)' : 'var(--p-font-en)'}"
      >
        {{ category.title }}
      </li>
      <li :style="{ color: 'white', fontWeight: '700', fontSize: '18px', fontFamily: locale === 'ar' ? 'var(--p-font-ar)' : 'var(--p-font-en)' }">{{ $t('brands') }} </li>
        <li :style="{ color: 'white', fontWeight: '700', fontSize: '18px', fontFamily: locale === 'ar' ? 'var(--p-font-ar)' : 'var(--p-font-en)' }"> {{ $t('offers') }} </li>

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
  flex-direction: row;
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