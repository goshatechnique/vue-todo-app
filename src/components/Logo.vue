<template>
  <div class="logo">Vue.JS todo app</div>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style scoped lang="scss">
$textColor: #314252;
$whiteColor: #ffffff;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #3fba83;
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;

.logo {
  font-size: 2em;
  grid-area: logo;
  display: grid;
  align-items: center;
  padding-left: 15px;
  user-select: none;
  box-sizing: border-box;
  border-bottom: 1px solid $grayColor;
}

@media all and (max-width: 768px) {
  .logo {
    font-size: 1.6em;
  }
}
@media all and (max-width: 460px) {
  .logo {
    font-size: 1.3em;
  }
}
</style>
