<template>
  <div class="header">
    <router-link
      exact
      active-class="header-nav-btn-active"
      class="header-nav-btn"
      tag="div"
      :to="'/'"
    >Home</router-link>
    <div class="header-nav-btn header-nav-btn-task">Tasks:</div>
    <router-link
      v-for="task in allTasks"
      :key="task.id"
      exact
      active-class="header-nav-btn-active"
      class="header-nav-btn header-nav-btn-task-link"
      tag="div"
      :to="'/task/' + task.id"
      @click.native="fetchTaskById(task.id)"
    >#&#8195;{{task.title}}</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  components: {},
  methods: {
    ...mapActions(["fetchTasks", "fetchTaskById"])
  },
  computed: {
    ...mapGetters(["allTasks"])
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style scoped lang='scss'>
$textColor: #314252;
$whiteColor: #ffffff;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #3fba83;
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;

.header {
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  border-right: 1px solid $grayColor;
}

.header-nav-btn {
  width: 90%;
  height: 50px;
  line-height: 50px;
  font-size: 1.2em;
  text-align: center;
  transition: 0.2s;
  &-active {
    text-decoration: underline;
  }
  &:hover {
    cursor: pointer;
    border-radius: 5px;
    box-shadow: inset 0 2px 4px rgba($textColor, 0.5);
    background: $grayColorLight;
  }
}
.header-nav-btn-task {
  margin-top: 9px;
  font-size: 1em;
  user-select: none;
  border-top: 1px solid $grayColor;
  width: 100%;
  &-link {
    font-size: 1em;
    text-align: start;
  }
  &:hover {
    cursor: default;
    border-bottom: none;
    box-shadow: none;
    background: none;
    border-radius: none;
  }
}
</style>