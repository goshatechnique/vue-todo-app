<template>
  <div class="note-field">
    <input type="checkbox" class="note-field-input-checkbox" v-model="value.noteStatus" />
    <input class="note-field-input-text" placeholder="note" type="text" v-model="value.noteText" />
    <span class="note-field-btn-remove" @click="$emit('delete')">&times;</span>
  </div>
</template>

<script>
export default {
  name: "NoteField",
  props: {
    value: Object
  }
};
</script>

.<style lang="scss" scoped>
$textColor: #314252;
$whiteColor: #ffffff;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #3fba83;
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;
$redColor: #fc6f6f;

.note-field {
  display: flex;
  justify-content: space-between;
  width: 90%;
  box-sizing: border-box;
  border-bottom: 1px solid $grayColor;
  margin-bottom: 3px;
}

.note-field-input-checkbox {
  outline: none;
  border: none;
}

.note-field-input-text {
  padding-left: 10px;
  font-size: 0.7em;
  width: 340px;
  border: none;
  outline: none;
}

.note-field-btn-remove {
  width: 30px;
  height: 30px;
  font-size: 30px;
  transition: 0.2s;
  color: $grayColor;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  &:hover {
    color: $redColor;
    cursor: pointer;
  }
}
</style>
