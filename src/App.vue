<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
$mainColorLightGreen: #c7ebdf;
$mainColorLightGreenLogo: #bae6d5;
$mainColorWhite: #ffffff;
$mainColorWhiteActive: #f9f7f8;
$mainTextColor: #314252;
$mainTextColorActive: #3fba83;

* {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: $mainTextColor;
}

body {
  padding: 0;
  margin: 0;
}

.container {
  background: $mainColorWhite;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "header main"
    "header main";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
}
</style>
