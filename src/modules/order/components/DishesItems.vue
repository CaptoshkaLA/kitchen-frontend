<template>
  <div>
    <div
      class="dish-item"
      v-for="(dish, index) in dishes"
      :key="index">
      <input
        class="dish-counter"
        name="dishCounter"
        type="number"
        v-model="dish.quantity"
        min="0"
        max="20"
        :disabled="disabled"
        @change="inputChanged(dish)" />
      <label
        for="dish-counter"
        class="dish-label"
        @click="dishClicked(dish.name)">{{ dish.name }} - {{ dish.price }}₽</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Dish } from "@/modules/order/models/dishInterfaces";

export default defineComponent({
  name: "DishesItems",
  props: {
    //Dishes in current dish type
    dishes: {
      type: Array as PropType<Array<Dish>>,
      reqiered: true,
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
      if (orderedDish.quantity < 0) {
        orderedDish.quantity = 0;
      };
      if (orderedDish.quantity > 20) {
        orderedDish.quantity = 20;
      };
      if (orderedDish.quantity % Math.floor(orderedDish.quantity) != 0) {
        orderedDish.quantity = Math.floor(orderedDish.quantity);
      }
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
.dish-counter {
  width: 35px;
  margin-right: 7px;
}

.dish-item {
  text-align: left;
  margin-bottom: 3px;
}

.dish-label {
  cursor: pointer;
}

.dish-label:hover {
  color: blue;
}
</style>
