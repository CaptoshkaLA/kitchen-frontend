<template>
  <el-date-picker
    v-model="value"
    type="date"
    placeholder="Выберите день"
    :disabled-date="disabledDate"
    @change="getDailyDishMenu"
    format="D.MM.YYYY"
    value-format="YYYY-MM-DDTHH:mm:ss"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Calendar",
  emit: ["get"],
  setup(props, { emit }) {
    const value = ref("");

    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now();
    };

    const getDailyDishMenu = () => {
      emit("get", value.value);
    };

    return {
      value,
      disabledDate,
      getDailyDishMenu,
    };
  },
});
</script>