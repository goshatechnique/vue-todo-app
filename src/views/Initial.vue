<template>
  <div class="initial">
    Initial
    <button v-on:click="switchForm" class="initial-add-btn">Add task</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Initial",
  methods: {
    ...mapMutations(["switchForm"])
  }
};
</script>

<style lang="scss" scoped>
$mainColorLightGreen: #c7ebdf;
$mainColorLightGreenLogo: #bae6d5;
$mainColorWhite: #ffffff;
$mainColorWhiteActive: #f9f7f8;
$mainTextColor: #314252;
$mainTextColorActive: #3fba83;

.initial {
  grid-area: main;
  background: $mainColorLightGreen;
}
</style>