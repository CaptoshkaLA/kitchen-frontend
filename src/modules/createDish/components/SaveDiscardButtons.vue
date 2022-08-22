<template>
  <div class="save-discard-buttons">
    <el-row class="mb-4">
      <el-button
        type="primary"
        @click="saveDishMenu(Dishes)"
        :disabled="disabled"
        >Сохранить
      </el-button>
      <el-button @click="clearDishMenu" :disabled="disabled"
        >Очистить
      </el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dish from "@/modules/createDish/models/DishInterface";

export default defineComponent({
  name: "SaveDiscardButtons",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    Dishes: Array as PropType<Dish[]>,
  },
  emits: ["save", "clear"],
  setup(props, { emit }) {
    const saveDishMenu = (dishes?: Dish[]) => {
      emit("save", dishes!);
    };

    const clearDishMenu = () => {
      emit("clear");
    };

    return {
      saveDishMenu,
      clearDishMenu,
    };
  },
});
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.save-discard-buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
