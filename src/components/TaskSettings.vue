<template>
  <div>
    <h2>{{this.currentTask.title}}</h2>
    <div v-for="(note, index) in this.notesList" :key="index">
      <input type="text" v-model="currentTask[index].noteText" />
      <span @click="removeNoteHandler(index)">&times;</span>
    </div>
    <button @click="addNoteHandler">Add jeppa Handler</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "TaskSettings",
  data: function() {
    return {
      taskId: this.$route.path.substr(6),
      deletedNotesId: []
    };
  },
  computed: {
    ...mapGetters(["currentTask"]),
    notesLength: {
      get: function() {
        return Object.keys(this.notesList).length;
      }
    },
    notesList: function() {
      let notes = JSON.parse(JSON.stringify(this.currentTask));
      delete notes["id"];
      delete notes["title"];
      return notes;
    }
  },
  methods: {
    ...mapActions(["fetchTaskById"]),
    ...mapMutations(["addNote", "removeNote"]),
    addNoteHandler: function() {
      let parsedCurrentTask = JSON.parse(JSON.stringify(this.currentTask));
      let emptyNote = {};
      if (this.deletedNotesId.length === 0) {
        emptyNote[this.notesLength] = {
          noteStatus: false,
          noteText: ""
        };
      }
      if (this.deletedNotesId.length !== 0) {
        emptyNote[this.deletedNotesId[0]] = {
          noteStatus: false,
          noteText: ""
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
      // this.deletedNotesId.sort();
      this.removeNote(this.notesList);
    }
  },
  mounted() {
    this.fetchTaskById(this.taskId);
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
</style>