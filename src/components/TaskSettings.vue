<template>
  <div>
    <h2>{{this.currentTask.title}}</h2>
    <div v-for="(note, index) in this.currentNotes" :key="index">
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
      taskId: this.$route.path.substr(6)
    };
  },
  computed: {
    ...mapGetters(["currentTask"]),
    currentNotes: function() {
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
      let a = JSON.parse(JSON.stringify(this.currentTask));
      let b = {};
      b[Object.keys(this.currentNotes).length] = {
        noteStatus: false,
        noteText: ""
      };
      let c = Object.assign(a, b);
      this.addNote(Object.assign(a, b));
    },
    removeNoteHandler: function(id) {
      console.log(id);
      delete this.currentNotes[id];
      this.removeNote(this.currentNotes);
    }
  },
  created() {
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