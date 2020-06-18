<template>
  <div class="header">
    <TaskCreator />
    <router-link
      exact
      active-class="header-nav-btn-active"
      class="header-nav-btn"
      tag="div"
      to="/"
    >Main</router-link>
    <router-link
      exact
      active-class="header-nav-btn-active"
      class="header-nav-btn"
      tag="div"
      to="/tasks"
    >Tasks</router-link>
  </div>
</template>

<script>
import TaskCreator from "./TaskCreator";

export default {
  name: "Header",
  components: {
    TaskCreator
  }
};
</script>

<style scoped lang='scss'>
$mainColorLightGreen: #c7ebdf;
$mainColorLightGreenLogo: #bae6d5;
$mainColorWhite: #ffffff;
$mainColorWhiteActive: #f9f7f8;
$mainTextColor: #314252;
$mainTextColorActive: #3fba83;

.header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.header-nav-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  &-active {
    background: $mainColorLightGreenLogo;
  }
  &:hover {
    cursor: pointer;
    background: $mainColorWhiteActive;
    text-shadow: 0 2px 4px rgba($mainTextColor, 0.5);
  }
}
</style>