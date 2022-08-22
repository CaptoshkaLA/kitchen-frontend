<template>
  <div>
    <button
      class="date-button"
      :disabled="disabled"
      :style="{ outlineOffset: dayWithOrderStyle }">
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CalendarButton",
  props: {
    // The day where the user made an order
    dayWithOrderStyle: {
      type: String,
      default: "0px",
    },
    // Text inside the button
    text: {
      type: String,
      default: "text",
    },
    // Makes button disabled
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.date-button {
  min-width: 30px;
  max-width: 60px;
  height: 40px;
  border-radius: 4px;
  outline: 1px dashed white;
  margin: 0px;
  padding: 5px;
  border: white solid 0.5px;
  background-color: $calendar-button-background-color;
  text-align: center;
  font-size: 14px;
  color: white;
  cursor: pointer;
}

.date-button:focus {
  background-color: $calendar-button-focus-hover;
}

.date-button:hover {
  background-color: $calendar-button-focus-hover;
}

.date-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dateb-utton:disabled:hover {
  background-color: $calendar-button-disabled-color ;
}

.date-button {
  @include breakpoint-mobile() {
    min-width: 20px;
    max-width: 60px;
    height: 30px;
    border-radius: 2px;
    margin: 0px;
    padding: 3px;
    font-size: 10px;
  }
}
</style>
