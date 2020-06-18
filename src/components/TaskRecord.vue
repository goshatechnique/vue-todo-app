<template>
  <div class="task-record">
    <input class="task-record-input" v-model="taskState" type="checkbox" />
    <input class="task-record-input" v-model="taskText" type="text" />
    <span v-on:click="removeNoteEmit" class="task-record-btn-remove"
      >&times;</span
    >
  </div>
</template>

<script>
// import { mapMutations } from 'vuex';
export default {
  name: 'TaskRedord',
  props: {
    note: Number,
  },
  methods: {
    removeNoteEmit: function() {
      this.$emit('removeNote', this.note);
    },
    // postNote() {
    //   this.collectNotes({
    //     id: this.note,
    //     status: this.taskState,
    //     text: this.taskText,
    //   });
    // },
    // ...mapMutations(['collectNotes']),
  },
  data: function() {
    return {
      taskState: '',
      taskText: '',
    };
  },
};
</script>

<style lang="scss" scoped>
$mainColorLightGreen: #c7ebdf;
$mainColorLightGreenLogo: #bae6d5;
$mainColorWhite: #ffffff;
$mainColorWhiteActive: #f9f7f8;
$mainTextColor: #314252;
$mainTextColorActive: #3fba83;
.task-record {
  padding-top: 5px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}
.task-record-input {
  height: 1em;
}
.task-record-btn-remove {
  display: flex;
  justify-content: center;
  width: 1em;
  height: 1.4em;
  line-height: 1.4em;
  &:hover {
    cursor: pointer;
    text-shadow: 0 2px 4px rgba($mainTextColor, 0.5);
  }
}
</style>
