<template>
  <!-- Start Landing Page -->

  <div class="landing-page">
    <div class="container">
      <div class="header-area">
        <div class="logo">QUEn</div>
        <ul class="links">
          <li>Home</li>

          <li>Signup</li>
          <li>Signin</li>
        </ul>
      </div>
      <div class="info">
        <h1>Examination Center For Students</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          odit nihil ullam nesciunt quidem iste, Repellendus odit nihil
        </p>
        <button>Button name</button>
      </div>
      <div class="image">
        <img src="https://i.postimg.cc/65QxYYzh/001234.png" />
      </div>
      <div class="clearfix"></div>
    </div>
  </div>

  <!-- End Landing Page -->
</template>

<script>
import Login from "../components/Login.vue";

export default {
  name: "IndexPage",
  middleware: ["redirectAuthenticated"],

  components: {
    Login,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Open Sans", sans-serif;
}

.container {
  width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin: auto;
}

/* Start Landing Page */

.landing-page {
  position: relative;
  background-color: #fff;
}

.landing-page .header-area {
  display: flex;
  padding: 25px 0 0;
  position: relative;
}

.landing-page .header-area .logo {
  text-transform: uppercase;
  font-style: italic;
  margin-top: 10px;
  font-size: 19px;
  width: 300px;
  color: #5d5d5d;
}

.landing-page .header-area .links {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: right;
}

.landing-page .header-area .links li {
  display: inline-block;
  margin-left: 30px;
  color: #5d5d5d;
  cursor: pointer;
}

.landing-page .info {
  width: 35%;
  float: left;
  margin-top: 130px;
}

.landing-page .info h1 {
  font-size: 44px;
  margin: 0 0 20px;
  line-height: 1.4;
  color: #5d5d5d;
}

.landing-page .info p {
  margin: 0;
  line-height: 1.6;
  font-size: 15px;
  color: #5d5d5d;
}

.landing-page .info button {
  border: 0;
  border-radius: 20px;
  padding: 12px 30px;
  margin-top: 30px;
  cursor: pointer;
  color: #fff;
  background-color: #6c63ff;
}

.landing-page .image {
  width: 50%;
  float: right;
  margin-top: 35px;
}

.landing-page .image img {
  max-width: 100%;
}

.clearfix {
  clear: both;
}

/* End Landing Page */
</style>
