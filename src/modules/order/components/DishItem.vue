<template>
  <div>
    <details
      v-for="(dishType, index) in dishMenu"
      class="dish-type"
      :key="index"
      open>
      <summary class="dish-item"
        :style="{ color: dishType.textColor }">
        {{ dishType.typeName }}
      </summary>
      <dishes-items
        :dishes="dishType.dishes"
        :disabled="disabled"
        @input-changed="inputChanged"
        @dish-clicked="dishClicked" />
    </details>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DishesItems from "@/modules/order/components/DishesItems.vue";
import { DishType, Dish } from "@/modules/order/models/dishInterfaces";

export default defineComponent({
  name: "DishItem",
  components: {
    DishesItems,
  },
  props: {
    //Dish menu on selected day
    dishMenu: {
      type: Array as PropType<Array<DishType>>,
      reqiered: true,
    },
    //Color of dish type name
    dishTypeColor: {
      type: String,
      default: "black",
    },
    // Makes inputs disabled
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["inputChanged", "dishClicked"],
  setup(props, { emit }) {
    const inputChanged = (orderedDish: Dish) => {
      emit("inputChanged", orderedDish);
    };

    const dishClicked = (dishName: string) => {
      emit("dishClicked", dishName);
    };
    return {
      inputChanged,
      dishClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
.dish-type {
  cursor: pointer;
}

.dish-item {
  text-align: left;
}
</style>
