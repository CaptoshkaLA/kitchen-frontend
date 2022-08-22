<template>
  <div class="order-history-frame">
    <div class="order-history-filters">
      <el-select v-model="monthValue" class="m-2" placeholder="Select">
        <el-option
          v-for="item in monthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-select v-model="yearValue" class="m-2" placeholder="Select">
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
    <div class="order-history-field">
      <el-card
        v-for="(order, index) in userOrders"
        :key="index"
        class="box-card"
        shadow="hover"
        :body-style="backgroundColor"
        @click="orderClick">
        <div class="text item">
          <span>Заказ на: {{ order.lunchDate }}</span>
          <br>
          <span>Заказ сделан: {{ order.orderDate }}</span>
          <br>
          <span>Сумма заказа: {{ order.orderPrice }}P</span>
        </div>

        <el-dialog
          v-model="orderDescriptionVisible"
          :title="order.lunchDate"
          width="350px">
          <div class="order-description">
            <p
              v-for="(dish, index) in order.orderedDishes"
              :key="index"
              class="description-item">{{
                  `${dish.dishTypeName}: ${dish.orderedDishName} - ${dish.dishPrice}₽ - ${dish.quantity} шт; `
              }}</p>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Order } from "@/modules/order/models/dishInterfaces";
import {
  SelectOptions,
  monthOptions,
  createYearOptions,
  months,
} from "@/modules/order/models/filterOptions";


export default defineComponent({
  name: "OrderHistory",

  setup() {
    const currentDate = new Date();
    const monthValue = ref(months[currentDate.getMonth()]);
    const yearValue = ref(currentDate.getFullYear());
    const firstOrderYear = ref(0);
    const yearOptions = ref([] as Array<SelectOptions>);
    const backgroundColor = computed(() => "background-color: #d9f0f0");
    const userOrders = [{
      lunchDate: "20.07",
      orderDate: "19.07",
      orderPrice: 300,
      orderedDishes: [
        {
          dishTypeName: "Суп",
          orderedDishName: "Окрошка",
          dishPrice: 100,
          quantity: 3
        }]
    }] as Array<Order>;
    const orderDescriptionVisible = ref(false);
    const orderClick = () => {
      orderDescriptionVisible.value = true;
    }
    onMounted(() => {
      firstOrderYear.value = 2020;
      yearOptions.value = createYearOptions(firstOrderYear.value);
    });
    return {
      monthValue,
      yearValue,
      monthOptions,
      yearOptions,
      backgroundColor,
      userOrders,
      orderDescriptionVisible,
      orderClick,

    };
  },
});
</script>

<style lang="scss" scoped>
.order-history-frame {
  background-color: azure;
  border-radius: 15px;
  height: 100%;
  width: auto;
  padding: 20px;
}

.order-history-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.order-history-field {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

}

.m-2 {
  margin-right: 4px;
  margin-bottom: 4px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.box-card {
  width: 200px;
  height: 100px;
  margin: 10px;
}
</style>
