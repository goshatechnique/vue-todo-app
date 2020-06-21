<template>
  <div class="initial">
    <transition-group css name="list" tag="div" class="transition-group">
      <TaskCard v-for="(task, index) in allTasks" :key="index" :task="task" />
    </transition-group>
    <TaskForm :isVisible="isVisible" :switchTaskForm="switchTaskForm" />
    <button class="initial-btn-create-task" @click="switchTaskForm">Add task</button>
  </div>
</template>

<script>
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Initial",
  components: {
    TaskForm,
    TaskCard
  },
  data: function() {
    return {
      isVisible: false
    };
  },
  methods: {
    ...mapActions(["fetchTasks"]),
    switchTaskForm: function() {
      this.isVisible = !this.isVisible;
    }
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    ...mapGetters(["allTasks"])
  }
};
</script>

<style lang="scss" scoped>
$textColor: #314252;
$whiteColor: #ffffff;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #3fba83;
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;

.initial {
  grid-area: main;
  background: $grayColorLight;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.transition-group {
  width: 100%;
}

.initial-btn-create-task {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background: $whiteColor;
  border: none;
  border-bottom: 1px solid $grayColor;
  outline: none;
  &:hover {
    cursor: pointer;
    text-shadow: 0 2px 4px rgba($greenColorLight, 1);
  }
}

.list-enter-active,
.list-leave-active {
  transition: 0.5s;
}
.list-enter {
  opacity: 0;
  transform: translateY(-50px);
}
.list-leave-to {
  opacity: 0;
}
</style>
