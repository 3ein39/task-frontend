<script setup>
import '@/assets/css/header.css';
import { Space, Input, Dropdown, Typography, Menu } from 'ant-design-vue';
const { Search } = Input;

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

</script>

<template>
  <header>
    <div class="left-pane">
      <p>EN</p>
     <img src="assets/icons/cart.png" alt="" srcset="">
     <p class="ar">تسجيل الدخول</p>
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
  <nav>
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
