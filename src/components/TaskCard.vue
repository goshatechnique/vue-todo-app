<template>
  <div class="task-card">
    <PopupRemove
      v-bind:isPopupVisible="isPopupVisible"
      v-bind:switchPopupVisible="switchPopupVisible"
      v-bind:callbackPopupEvent="callbackPopupEvent"
      v-bind:popupHeader="'Confirm Taks delete'"
      v-bind:popupMessage="'Are you sure you want delete task?'"
    />
    <div class="task-card-control-panel">
      <router-link
        tag="span"
        :to="`/task/${task.id}`"
        class="task-card-btn"
        alt="#"
        @click.native="fetchTaskByIdHandler(task.id)"
        >&#9998;</router-link
      >
      <span @click="switchPopupVisible" class="task-card-btn btn-close"
        >&times;</span
      >
    </div>

    <div class="task-card-title">
      <div class="task-card-title-text">{{ task.title }}</div>
    </div>

    <div class="task-card-notes">
      <div
        v-for="(note, index) in notes"
        v-bind:key="index"
        class="task-card-notes-record"
      >
        <span
          class="task-card-notes-record"
          :class="{ finished: note.noteStatus }"
          >{{ note.noteText.trim() }}</span
        >
        <span
          class="task-card-notes-record-divider"
          v-if="index < Object.keys(notes).length - 1"
          >&bull;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import firebaseAPI from '../firebase';
import PopupRemove from './Popup';
export default {
  name: 'TaskCard',
  components: {
    PopupRemove,
  },
  data: function() {
    return {
      isPopupVisible: false,
    };
  },
  props: {
    task: Object,
  },
  methods: {
    ...mapActions(['removeTask', 'fetchTaskById']),
    fetchTaskByIdHandler: function(id) {
      this.fetchTaskById(id);
    },
    deleteTask() {
      this.removeTask(this.task.id);
    },
    switchPopupVisible: function() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    callbackPopupEvent: function() {
      this.deleteTask();
      this.switchPopupVisible();
    },
  },
  computed: {
    notes: function() {
      let notes = JSON.parse(JSON.stringify(this.task));
      delete notes['id'];
      delete notes['title'];
      return notes;
    },
  },
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
$redColor: #fc6f6f;

.task-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 270px;
  background: $whiteColor;
  border-bottom: 1px solid $grayColor;
}

.task-card-control-panel {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.task-card-btn {
  user-select: none;
  padding-right: 5px;
  height: 20px;
  width: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  transition: 0.2s;
  &:hover {
    color: orange;
    cursor: pointer;
  }
}

.btn-close {
  font-size: 28px;
  &:hover {
    color: $redColor;
    cursor: pointer;
  }
}

.task-card-title {
  width: 100%;
}

.task-card-notes {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.task-card-title-text {
  font-size: 0.9em;
  padding-left: 60px;
}

.task-card-notes-record {
  margin-left: 10px;
  font-size: 16px;
  line-height: 32px;
  color: rgba($textColor, 0.8);
}

.task-card-notes-record-divider {
  width: 8px;
  margin-left: 18px;
  font-size: 16px;
  line-height: 32px;
  color: rgba($textColor, 0.8);
}

.finished {
  color: rgba($textColor, 0.5);
  text-decoration: line-through;
}
</style>
