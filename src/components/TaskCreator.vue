<template>
  <div v-if="formStatus" class="overlay">
    <form class="form-create-task" v-on:submit.prevent="submitHandler">
      <div class="form-create-task-head">
        <span v-on:click="switchForm" class="form-close-btn">&times;</span>
        <label for="title">Type note title:</label>
        <input
          v-model="title"
          type="text"
          id="title"
          class="form-create-task-input-title"
        />
        <span
          v-on:click="addNote"
          class="form-close-btn form-create-task-add-note"
          >+</span
        >
      </div>

      <div class="form-create-tasks-field">
        <TaskRecord
          v-for="note in notes"
          v-bind:key="note"
          v-bind:note="note"
          v-on:removeNote="removeNote"
        />
      </div>
      <button type="submit" class="form-create-task-button">Create task</button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import TaskRecord from './TaskRecord';
export default {
  name: 'TaskCreator',
  data: function() {
    return { title: '', notes: [1], noteUid: 1 };
  },
  components: {
    TaskRecord,
  },
  computed: {
    ...mapGetters(['formStatus']),
  },
  methods: {
    submitHandler: function() {
      if (!this.title) {
        return;
      }
      this.title = '';
      this.notes = [1];
      setTimeout(() => {
        this.switchForm();
      }, 300);
    },
    addNote: function() {
      this.noteUid++;
      this.notes.push(this.noteUid);
    },
    removeNote: function(noteId) {
      this.notes = this.notes.filter((note) => note !== noteId);
    },
    collectAllNotes: function() {},
    ...mapMutations(['switchForm', 'collectNotes']),
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

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: rgba(black, 0.5);
}

.form-create-task {
  box-sizing: border-box;
  min-height: 300px;
  width: 400px;
  background: $mainColorWhite;
  border: 1px solid $mainTextColor;
  border-radius: 5px;
}

.form-create-task-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-close-btn {
  align-self: flex-end;
  height: 20px;
  width: 20px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    text-shadow: 0 2px 4px rgba($mainTextColor, 0.5);
  }
}

.form-create-task-input-title {
  font-size: 1em;
  line-height: 1.4em;
  margin-top: 10px;
}

.form-create-task-add-note {
  align-self: center;
  margin-top: 10px;
}

.form-create-tasks-field {
  min-height: 143px;
}

.form-create-task-button {
  font-size: 1em;
  line-height: 1.4em;
  height: 2em;
  background: $mainColorLightGreenLogo;
  border: none;
  border-radius: 2px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background: $mainTextColorActive;
  }
}
</style>
