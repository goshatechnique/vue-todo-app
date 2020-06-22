<template>
  <transition name="popup">
    <div v-if="isPopupVisible" class="overlay">
      <div class="popup-form">
        <h2 class="popup-h2">{{ this.popupHeader }}</h2>
        <p class="popup-p">{{ this.popupMessage }}</p>
        <div class="popup-btn-section">
          <button class="popup-btn popup-btn-cls" @click="switchPopupVisible">
            No
          </button>
          <button class="popup-btn" @click="callbackPopupEvent">Yes</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'popup',
  props: {
    isPopupVisible: Boolean,
    switchPopupVisible: Function,
    callbackPopupEvent: Function,
    popupHeader: String,
    popupMessage: String,
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

.popup-h2 {
  font-size: 1em;
}

.popup-p {
  font-size: 0.8em;
  font-weight: normal;
  color: rgba($textColor, 0.8);
}

.popup-btn-section {
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.popup-btn {
  outline: none;
  height: 30px;
  font-size: 0.7em;
  width: 150px;
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
  &-cls:hover {
    background: $redColor;
    border: 1px solid $redColor;
  }
}

.popup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  background: $whiteColor;
  box-shadow: 0 2px 4px rgba($textColor, 0.5);
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
