<script setup>

</script>

<template>
  <div class="contacts">
    <div class="inner-bg">
      <WhatsAppOutlined style="color: #939393; font-size: 45px"/>
      <p style="color: #939393; font-size: 36px">+2000000</p>
      |
      <MailFilled style="color: #939393; font-size: 45px"/>
      <p style="color: #939393; font-size: 36px"> hussein@test.com </p>
    </div>
    <p style="font-size: 36px; color: #939393; font-family: 'Montserrat-Arabic'">نحن دائما جاهزون لمساعدتك</p>
  </div>

  <footer>
    <div class="footer-div">
      <h1>حمل التطبيق من هنا</h1>
      <img src="assets/icons/google.png" alt="" srcset="">
      <img src="assets/icons/apple.png" alt="" srcset="">
    </div>
    <div class="footer-div">
      <h1>اعرف المزيد عننا</h1>
      <h2>مدونتنا</h2>
      <h2>سياسة الخصوصية</h2>
      <h2>سياسة الإستبدال والإسترجاع</h2>
    </div>
    <div class="footer-div">
      <h1>تسوق معنا</h1>
      <h2>حسابك</h2>
      <h2>تتبع طلبك</h2>
      <h2>طريقة الدفع</h2>
      <h2>الشحن والتوصيل</h2>
    </div>
    <div class="footer-div">
      <img src="assets/icons/logo.png" alt="" srcset="">
      <h1>تواصل معنا</h1>
      <div style="display: flex; gap: 26px">
        <FacebookFilled style="color: white; font-size: 40px;"/>
        <WhatsAppOutlined style="color: white; font-size: 40px;"/>
        <img src="assets/icons/snapchat.png" style="width: 40px; color: #939393">
        <TwitterOutlined style="color: white; font-size: 40px"/>
        <InstagramOutlined style="color: white; font-size: 40px"/>
      </div>
      <h1 style="font-size: 20px">للإشتراك في النشرة البريدية</h1>
      <AInput placeholder="البريد الإلكتروني" style="width: 300px; height: 50px; border-radius: 10px"/>

    </div>
  </footer>
  <img src="assets/icons/copyrights.png">
</template>

<style scoped>

footer {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  height: 590px;
  background: #036C46;
}

h1 {
  font-family: 'Montserrat-Arabic';
  font-size: 24px;
  color: white;
  font-weight: 700;
}

h2 {
  font-family: 'Montserrat-Arabic';
  font-size: 20px;
  color: lightgray;
  font-weight: 500;
}

.footer-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  padding: 16px;
  height: 324px;
  justify-content: space-around;
}

.inner-bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: #F8F8F8;

}

.contacts {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 106px;
  padding: 25px 129px;
  gap: 16px;
  background: #F8F8F8;
}
</style>