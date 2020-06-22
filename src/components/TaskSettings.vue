<template>
  <div class="task-settings">
    <Popup
      v-bind:isPopupVisible="isPopupVisible"
      v-bind:switchPopupVisible="switchPopupVisible"
      v-bind:callbackPopupEvent="callbackPopupEvent"
      v-bind:popupHeader="'Confirm Taks delete'"
      v-bind:popupMessage="'Are you sure you want delete task?'"
    />
    <div class="task-settings-title">
      <label for="title" class="task-settings-title-label"
        >What is task name?</label
      >
      <input
        type="text"
        placeholder="For example: Read"
        id="title"
        class="task-settings-title-input"
        v-model="currentTask.title"
      />
    </div>
    <div class="task-settings-control-panel">
      <button class="task-settings-control-panel-btn" @click="addNoteHandler">
        Add note
      </button>
      <button class="task-settings-control-panel-btn" @click="saveChanges">
        Save
      </button>
      <button
        class="task-settings-control-panel-btn"
        @click="switchPopupVisible"
      >
        Delete
      </button>
    </div>
    <div class="task-settings-notes">
      <div
        class="task-settings-notes-item"
        v-for="(note, index) in this.notesList"
        :key="index"
      >
        <input
          class="task-settings-notes-item-checkbox"
          type="checkbox"
          v-model="currentTask[index].noteStatus"
        />
        <input
          class="task-settings-notes-item-input"
          type="text"
          v-model="currentTask[index].noteText"
        />
        <span
          class="task-settings-notes-item-span"
          type="text"
          @click="removeNoteHandler(index)"
          >&times;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Popup from './Popup';
import firebaseAPI from '../firebase';
export default {
  name: 'TaskSettings',
  components: {
    Popup,
  },
  data: function() {
    return {
      taskId: this.$route.path.substr(6),
      deletedNotesId: [],
      isPopupVisible: false,
    };
  },
  computed: {
    ...mapGetters(['currentTask']),
    notesLength: {
      get: function() {
        return Object.keys(this.notesList).length;
      },
    },
    notesList: function() {
      let notes = JSON.parse(JSON.stringify(this.currentTask));
      delete notes['id'];
      delete notes['title'];
      return notes;
    },
  },
  methods: {
    ...mapActions(['fetchTaskById', 'removeTask']),
    ...mapMutations(['addNote', 'removeNote']),
    addNoteHandler: function() {
      let parsedCurrentTask = JSON.parse(JSON.stringify(this.currentTask));
      let emptyNote = {};
      if (this.deletedNotesId.length === 0) {
        emptyNote[this.notesLength] = {
          noteStatus: false,
          noteText: '',
        };
      }
      if (this.deletedNotesId.length !== 0) {
        emptyNote[this.deletedNotesId[0]] = {
          noteStatus: false,
          noteText: '',
        };
        this.deletedNotesId.splice(0, 1);
      }
      let newState = Object.assign(parsedCurrentTask, emptyNote);
      this.addNote(newState);
    },
    removeNoteHandler: function(id) {
      window.a = this.deletedNotesId;
      delete this.notesList[id];
      this.deletedNotesId.push(id);
      this.removeNote(
        Object.assign(this.notesList, {
          title: this.currentTask.title,
          id: this.taskId,
        })
      );
    },
    saveChanges: function() {
      firebaseAPI
        .database()
        .ref(`tasks/${this.taskId}`)
        .set(
          Object.assign(this.notesList, {
            title: this.currentTask.title,
            id: this.taskId,
          })
        );
      this.$router.push('/');
    },
    switchPopupVisible: function() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    callbackPopupEvent: function() {
      this.$router.push('/');
      this.removeTask(this.currentTask.id);
    },
  },
  created() {
    this.fetchTaskById(this.taskId);
  },
};
</script>

<style lang="scss" scoped>
$textColor: #314252;
$whiteColor: #ffffff;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #3fba83;
$greenColorLight: #79ccac;
$greenColorLight2: #baebda;
$redColor: #ff4e4e;

.task-settings {
  display: flex;
  flex-direction: column;
}

.task-settings-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-top: 10px;
}

.task-settings-title-label {
  font-size: 1.2em;
}

.task-settings-title-input {
  margin-left: 5px;
  font-size: 1.2em;
  outline: none;
  border: none;
  border-bottom: 1px solid $grayColorDark;
  background: none;
}

.task-settings-control-panel {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-top: 10px;
}

.task-settings-control-panel-btn {
  outline: none;
  margin-left: 10px;
  border: 1px solid $grayColorDark;
  font-size: 0.75em;
  width: 128px;
  height: 36px;
  border-radius: 3px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background: $grayColorDark;
    color: $whiteColor;
  }
}

.task-settings-notes {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.task-settings-notes-item {
  box-sizing: border-box;
  border-bottom: 1px solid $grayColorDark;
  margin-bottom: 3px;
  &-input {
    border: none;
    background: none;
    outline: none;
    width: 400px;
  }
  &-span {
    font-size: 30px;
    color: rgba($textColor, 0.5);
    transition: 0.2s;
    &:hover {
      color: $redColor;
      cursor: pointer;
    }
  }
}
@media all and (max-width: 768px) {
  .task-settings-title-label {
    font-size: 1em;
  }
  .task-settings-title-input {
    font-size: 1em;
  }
  .task-settings-notes-item {
    &-input {
      width: 300px;
    }
    &-span {
      font-size: 30px;
      color: rgba($textColor, 0.5);
      transition: 0.2s;
      &:hover {
        color: $redColor;
        cursor: pointer;
      }
    }
  }
}
@media all and (max-width: 600px) {
  .task-settings-title-label {
    font-size: 0.9em;
  }
  .task-settings-title-input {
    font-size: 0.9em;
  }
  .task-settings-notes-item {
    &-input {
      width: 200px;
    }
  }
  .task-settings-control-panel-btn {
    width: 96px;
  }
}
@media all and (max-width: 500px) {
  .task-settings-title {
    display: flex;
    flex-direction: column;
  }
  .task-settings-notes-item-input {
    font-size: 0.8em;
  }
  .header-nav-btn {
    height: 30px;
    font-size: 0.9em;
    line-height: 30px;
  }
  .task-settings-control-panel-btn {
    width: 64px;
    height: 36px;
    font-size: 0.7em;
  }
}
</style>
