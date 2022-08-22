<template>
  <div>
    <el-card
      class="box-card"
      shadow="hover"
      :body-style="backgroundColor">
      <template #header>
        <div class="card-header">
          <span>{{ cardName }}</span>
        </div>
      </template>

      <div class="text item">
        {{ orderDate }}
      </div>

      <dish-item
        @input-changed="inputChanged"
        @dish-clicked="dishClicked"
        :disabled="disabled"
        :dish-menu="dishMenu">
      </dish-item>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import DishItem from "@/modules/order/components/DishItem.vue";
import { DishType, Dish } from "@/modules/order/models/dishInterfaces";

export default defineComponent({
  name: "DishCard",
  components: {
    DishItem,
  },
  props: {
    //Dish menu for the selected day
    dishMenu: {
      type: Array as PropType<Array<DishType>>,
      reqiered: true,
    },
    // The day where the user is going to make an order
    orderDate: {
      type: String,
      default: "Меню на сегодня",
    },
    // The name of the dish menu type(common, diet, premium)
    cardName: {
      type: String,
      default: "DishMenu card",
    },
    // Disables dish menu items
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["inputChanged", "dishClicked"],
  setup(props, { emit }) {
    const backgroundColor = computed(() => "background-color: #d9f0f0");
    const inputChanged = (orderedDish: Dish) => {
      emit("inputChanged", orderedDish);
    };

    const dishClicked = (dishName: string) => {
      emit("dishClicked", dishName);
    };
    return {
      backgroundColor,
      inputChanged,
      dishClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 0px;
  padding: 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  min-width: 300px;
  margin: 10px;
}

.box-card {
  @include breakpoint-mobile() {
    min-width: 200px;
  }
}
</style>
