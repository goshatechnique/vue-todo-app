<template>
  <div class="task">
    <TaskSettings />
  </div>
</template>

<script>
import TaskSettings from "../components/TaskSettings";

export default {
  name: "Task",
  components: {
    TaskSettings
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
$greemColorLight: #bae6d5;
$greemColorLight2: #c7ebdf;

.task {
  grid-area: main;
  background: $grayColorLight;
}

.task-edit-form-record {
  background: $whiteColor;
  margin-top: 5px;
}

.task-edit-form {
  width: 300px;
  box-shadow: 0 2px 4px rgba($textColor, 0.5);
}

.task-edit-form-input {
  outline: none;
  border: none;
  border-left: 2px solid $greenColor;
  background: $whiteColor;
}

.task-edit-form-remove {
  height: 25px;
  line-height: 25px;
}
</style>