<template>
  <div>
    <div class="date-button-group">
      <calendar-button
        @click="leftCalendarButtonClick"
        :disabled="disableLeftCalendarButton"
        :text="'<'" />

      <calendar-button
        v-for="(day, index) in getDays"
        :key="index"
        :text="day"
        @click="dateButtonClick(index)"
        :disabled="disabledButtons[index]"
        :day-with-order-style="markDaysWithOrder[index]" />

      <calendar-button
        :text="'>'"
        @click="rightCalendarButtonClick"
        :disabled="disableRightCalendarButton" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import CalendarButton from "@/modules/order/components/CalendarButton.vue";
import { WeekDays } from "@/modules/order/models/weekDaysEnum";

export default defineComponent({
  name: "OrderCalendar",
  components: { CalendarButton },
  props: {
    // Array with days where the dish menu is presents
    daysWithFormedDishMenu: {
      type: Array,
      required: true,
    },
    //  Array with days where the current user made an order
    daysWithOrder: {
      type: Array,
      required: true,
    },
  },
  emits: ["dateButtonClick"],
  setup(props, { emit }) {
    const tomorrowDate = ref("");
    const daysForOrder = ref([] as Array<string>);
    // deltaDate is the number of days by which the calendar is shifted
    const deltaDate = ref(0);
    // getDays returns array with days for calendar, and changes after scrolling
    const getDays = computed(() => {
      let currentDate = new Date();
      const weekDays = Object.values(WeekDays);
      let dayCounter = 0;
      const days: Array<string> = [];
      currentDate.setDate(currentDate.getDate() + deltaDate.value);
      currentDate.setHours(15);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      while (dayCounter < 5) {
        const dayMonthStr = currentDate
          .toLocaleDateString()
          .split(".")
          .slice(0, 2)
          .join(".");
        let currentDay = currentDate.getDay();
        if (currentDay > 0 && currentDay < 6) {
          daysForOrder.value[dayCounter] = currentDate.toISOString();
          days[dayCounter] = `${dayMonthStr} ${weekDays[currentDay]}`;
          dayCounter++;
          currentDate.setDate(currentDate.getDate() + 1);
        } else {
          currentDate.setDate(currentDate.getDate() + 2);
        }
      }
      return days;
    });
    // Calendar button last pressed
    const clickedButton = ref(0);
    const dateButtonClick = (buttonNumber: number) => {
      const clickedDate = getDays.value[buttonNumber].slice(0, 5);
      emit(
        "dateButtonClick",
        clickedDate,
        daysForOrder.value[buttonNumber],
        tomorrowDate.value
      );
      clickedButton.value = buttonNumber;
    };
    //Calendar button disables if the  dish menu in this day is absent
    const disabledButtons = computed(() => {
      const disabledButtons = [false, false, false, false, false];
      getDays.value.forEach((day, index) => {
        const isDisabled = props.daysWithFormedDishMenu.includes(
          day.slice(0, 5)
        );
        if (!isDisabled) {
          disabledButtons[index] = true;
        }
      });
      return disabledButtons;
    });
    // Days with order mark with white dashed line made via outline
    const markDaysWithOrder = computed(() => {
      const orderedDaysStyle = ["0px", "0px", "0px", "0px", "0px"];
      getDays.value.forEach((day, index) => {
        const isOrderedDay = props.daysWithOrder.includes(
          day.slice(0, 5)
        );
        if (isOrderedDay) {
          orderedDaysStyle[index] = "-4px";
        }
      });
      return orderedDaysStyle;
    });

    // LeftCalendarButton disables when the current date is present in the calendar
    const disableLeftCalendarButton = computed(() => {
      return deltaDate.value == 0 ? true : false;
    });
    const leftCalendarButtonClick = () => {
      deltaDate.value -= 5;
    };

    // RightCalendarButton disables when the dish menu is missing for 5 days in a row
    const disableRightCalendarButton = computed(() => {
      if (disabledButtons.value.includes(false)) {
        return false;
      } else return true;
    });
    const rightCalendarButtonClick = () => {
      deltaDate.value += 5;
    };

    onMounted(() => {
      tomorrowDate.value = getDays.value[1].slice(0, 5);
    });

    return {
      deltaDate,
      getDays,
      clickedButton,
      dateButtonClick,
      disabledButtons,
      markDaysWithOrder,
      disableLeftCalendarButton,
      leftCalendarButtonClick,
      disableRightCalendarButton,
      rightCalendarButtonClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.date-button-group {
  display: flex;
  justify-content: center;
}
</style>
