<template>
  <div class="tasks">Tasks</div>
</template>

<script>
export default {
  name: "Tasks"
};
</script>

<style lang="scss" scoped>
$mainColorLightGreen: #c7ebdf;
$mainColorLightGreenLogo: #bae6d5;
$mainColorWhite: #ffffff;
$mainColorWhiteActive: #f9f7f8;
$mainTextColor: #314252;
$mainTextColorActive: #3fba83;

.tasks {
  grid-area: main;
  background: $mainColorLightGreen;
}
</style>