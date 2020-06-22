<template>
  <transition name="popup">
    <div v-if="isVisible" class="overlay">
      <form class="task-form" @submit.prevent="submitHandler">
        <span @click="closeFormHandler" class="task-form-btn-close"
          >&times;</span
        >
        <label class="task-form-label-header" for="title">Task name</label>
        <input
          placeholder="Example: Wake up"
          class="task-form-input-title"
          v-model="title"
          id="title"
          type="text"
        />
        <label class="task-form-label-header task-form-label-header-notes"
          >Notes</label
        >
        <button class="task-form-btn" @click.prevent="add">
          Type here to add note
        </button>
        <NoteField
          v-for="(note, index) in notes"
          v-model="notes[index]"
          @delete="notes.splice(index, 1)"
          :key="index"
        ></NoteField>
        <button class="task-form-btn" type="submit">Create task</button>
      </form>
    </div>
  </transition>
</template>

<script>
import NoteField from './NoteField';
import Swal from 'sweetalert2';
import firebaseAPI from '../firebase';
export default {
  components: {
    NoteField,
  },
  props: {
    isVisible: Boolean,
    switchTaskForm: Function,
  },
  data: function() {
    return {
      notes: [],
      title: '',
    };
  },
  methods: {
    add() {
      this.notes.push({
        noteText: '',
        noteStatus: false,
      });
    },
    closeFormHandler() {
      this.notes = [];
      this.title = '';
      this.add();
      this.switchTaskForm();
    },
    submitHandler() {
      try {
        if (!this.title) {
          Swal.fire('Warning!', "Title wont't be empty!", 'warning');
          return;
        }
        if (!this.notes[0].noteText) {
          Swal.fire('Warning!', "Note wont't be empty!", 'warning');
          return;
        }
        this.switchTaskForm();
        let uid = Date.now();
        firebaseAPI
          .database()
          .ref(`tasks/${uid}`)
          .set({ title: this.title, id: uid, ...this.notes });
        this.notes = [];
        this.title = '';
        this.add();
      } catch (e) {
        Swal.fire('Warning!', "Note wont't be empty!", 'warning');
      }
    },
  },
  mounted() {
    this.add();
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
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;
$redColor: #fc6f6f;

.overlay {
  position: fixed;
  background: rgba(black, 0.5);
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  background: $whiteColor;
  box-shadow: 0 2px 4px rgba($textColor, 0.5);
}

.task-form-input-title {
  padding-left: 10px;
  border: none;
  outline: none;
  height: 30px;
  width: 300px;
  font-size: 0.7em;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba($textColor, 0.5);
}

.task-form-label-header {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 0.8em;
  align-self: flex-start;
  margin-left: 50px;
}

.task-form-label-header-notes {
  margin-bottom: 0px;
}

.task-form-btn {
  outline: none;
  height: 30px;
  font-size: 0.7em;
  width: 300px;
  border: 1px solid $greenColor;
  font-size: 0.8em;
  border-radius: 3px;
  background: $whiteColor;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background: $greenColorLight;
    border: 1px solid $greenColorLight;
  }
}

.task-form-btn-close {
  margin-right: 5px;
  margin-top: 5px;
  height: 20px;
  width: 20px;
  font-size: 28px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  transition: 0.2s;
  &:hover {
    color: $redColor;
    cursor: pointer;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.5s;
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
  transform: scale(1);
}
</style>
