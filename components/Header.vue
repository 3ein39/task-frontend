<script setup>
import '@/assets/css/header.css';
import { Space, Input, Dropdown, Typography, Menu } from 'ant-design-vue';
const { Search } = Input;
import { ref } from 'vue'

const countries = [
  {
    key: '1',
    value: 'Egypt',
  },
  {
    key: '2',
    value: 'UAE',
  },
  {
    key: '3',
    value: 'KSA',
  }
]



const onSearch = (value, _e, info) => console.log(info?.source, value);

let isOpen = ref(false);
let isLTR = ref(false);
const toggleDirection = () => {
  isLTR.value = !isLTR.value;
  document.dir = isLTR.value ? 'ltr' : 'rtl';
  document.querySelector('html').setAttribute('lang', isLTR.value ? 'en' : 'ar');
  console.log('isLTR', isLTR.value);
}

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
     <p class="ar btn" @click="isFinished">تسجيل الدخول</p>
    </div>

    <div class="mid-pane">
    
    <Space direction="vertical">
    <Search
      style="width: 400px"
      placeholder="input search text"
    />
    </Space>

    </div>

    <div class="right-pane">
      <p>الشحن إلى</p> <!--to be implemented -->
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

</template>
<style scoped>

:root {
  --p-font-en: 'Montserrat';
  --p-font-ar: 'Montserrat-Arabic';
  --p-sz: 30px;
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

.left-pane, .mid-pane, .right-pane {
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

ul, li {
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