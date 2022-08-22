<template>
  <div class="lunch-ordering-frame">
    <order-calendar
      @date-button-click="dateButtonClick"
      :days-with-order="daysWithOrder"
      :days-with-formed-dish-menu="daysWithFormedDishMenu" />

    <br />

    <div class="kitchen-dish-menu">
      <dish-card
        v-for="(dishMenuType, index) in dishMenuTypes"
        :key="index"
        :card-name="dishMenuType"
        :order-date="orderDate"
        :disabled="disableDishMenu"
        :dish-menu="dishMenu[index]"
        @input-changed="inputChanged"
        @dish-clicked="dishClicked" />
    </div>

    <save-reset-buttons
      :disabled="disableDishMenu"
      @save-button-clicked="saveButtonClicked"
      @saving-confirmed="savingConfirmed"
      @clearing-confirmed="clearingConfirmed"
      :formed-order="formedOrder" />

    <el-dialog
      v-model="dishDescriptionVisible"
      :title="dishTitle"
      width="350px">
      <div class="dish-description">
        <img
          class="description-item"
          :src="dishImage"
          alt="Dish picture" />
        <p class="description-item">{{ dishDescription }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import OrderCalendar from "@/modules/order/components/OrderCalendar.vue";
import DishCard from "@/modules/order/components/DishCard.vue";
import SaveResetButtons from "@/modules/order/components/SaveResetButtons.vue";
import { DishMenuType } from "@/modules/order/models/dishMenuTypesEnum";
import { DishType, Dish, Order } from "@/modules/order/models/dishInterfaces";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "LunchOrdering",
  components: {
    OrderCalendar,
    DishCard,
    SaveResetButtons,
  },
  setup() {
    const orderDate = ref("Меню на сегодня");
    const disableDishMenu = ref(false);
    const dishMenuTypes = Object.values(DishMenuType);

    const commonDishMenu = reactive([
      {
        typeName: "Суп",
        textColor: "",
        dishes: [
          {
            id: 1,
            name: "Окрошка",
            price: 100,
            quantity: 2,
            image: "https://img4.goodfon.ru/original/320x240/2/9e/okroshka-miska-redis-ukrop-ogurets.jpg",
            description: "Это окрошка, очень вкусная и полезная",
            pfc: "Углеводы 1",
          },
          {
            id: 2,
            name: "Борщ",
            price: 150,
            quantity: 0,
            image: "",
            description: "",
            pfc: "Углеводы 2",
          }
        ],
      },
      {
        typeName: "Салат",
        textColor: "",
        dishes: [
          {
            id: 3,
            name: "Цезарь",
            price: 130,
            quantity: 1,
            image: "",
            description: "",
            pfc: "Углеводы 3",
          },
          {
            id: 4,
            name: "Греческий",
            price: 160,
            quantity: 0,
            image: "",
            description: "",
            pfc: "Углеводы 4",
          }
        ],
      },
    ]);
    const dishMenu = reactive([commonDishMenu]);
    const daysWithFormedDishMenu = reactive([
      "21.07",
      "20.07",
      "22.07",
      "25.07",
      "26.07",
      "27.07",
      "29.07",
    ]);
    const daysWithOrder = reactive(["21.07", "20.07", "25.07", "26.07"]);
    let formedOrder = ref("");

    const activeDate = ref("");
    const activeDateForDB = ref("");
    const dateButtonClick = (
      clickedDate: string,
      dayForDB: string,
      tomorrowDate: string) => {
      activeDateForDB.value = dayForDB;

      activeDate.value = clickedDate;
      disableDishMenu.value = !isOrderTime(clickedDate, tomorrowDate);
      orderDate.value = "Заказ на: " + activeDate.value;
    };

    // If an order is not empty, editOrDelete=true, order will be edited or saved,
    // but if an order is empty editOrDelete=false, and order will be deleted
    let saveOrDelete = true;
    let messageText = "";
    const orderForDB = {
      userId: 1,
      lunchDate: "",
      orderDate: "",
      updateDate: "",
      orderPrice: 0,
      orderedDishes: [],
    } as Order;
    const saveButtonClicked = () => {
      let orderPrice = 0;
      let orderedDishes = "";
      orderForDB.orderedDishes = [];
      orderForDB.lunchDate = activeDateForDB.value;
      dishMenu.forEach((dishMenuType) => {
        dishMenuType.forEach((dishType) => {
          dishType.dishes.forEach((dish) => {
            if (dish.quantity != 0) {
              orderForDB.orderedDishes.push({
                dishId: dish.id,
                dishTypeName: dishType.typeName,
                orderedDishName: dish.name,
                dishPrice: dish.price,
                quantity: dish.quantity,
              });
              orderedDishes += `${dish.name}-${dish.quantity};  `;
              orderPrice += dish.price * dish.quantity;
            }
          });
        });
      });
      if (orderPrice == 0) {
        if (daysWithOrder.includes(activeDate.value)) {
          formedOrder.value = "Ваш заказ на этот день будет удален";
          saveOrDelete = false;
        } else {
          formedOrder.value = "Для сохранения заказа выберите блюдо";
        }
      } else {
        formedOrder.value = `Ваш заказ: ${orderedDishes}  Итого: ${orderPrice}₽`;
        orderForDB.orderPrice = orderPrice;
        saveOrDelete = true;
      }
    };
    const savingConfirmed = () => {
      let response = true;
      if (response) {
        if (saveOrDelete) {
          if (daysWithOrder.includes(activeDate.value)) {
            messageText = "Заказ изменен";
          } else {
            daysWithOrder.push(activeDate.value);
            messageText = "Заказ сохранен";
          }
          orderForDB.orderDate = new Date().toISOString();
        } else {
          daysWithOrder[daysWithOrder.indexOf(activeDate.value)] = "";
          messageText = "Заказ удален";
        }
        ElMessage({
          message: messageText,
          type: "success",
        });
      } else {
        messageText = "Что-то пошло не так";
        ElMessage({
          message: messageText,
          type: "warning",
        });
      }
    };
    const clearingConfirmed = () => {
      dishMenu.forEach((dishMenuType) => {
        dishMenuType.forEach((dishType) => {
          dishType.dishes.forEach((dish) => {
            dish.quantity = 0;
          });
        });
      });
      setDishTypeColor(dishMenu);
    };

    const inputChanged = (orderedDish: Dish) => {
      dishMenu.forEach((dishMenuType) => {
        dishMenuType.forEach((dishType) => {
          dishType.dishes.forEach((dish) => {
            if (dish.name == orderedDish.name) {
              dish.quantity = orderedDish.quantity;
            }
          });
        });
      });
      setDishTypeColor(dishMenu);
    };

    const dishDescriptionVisible = ref(false);
    const dishTitle = ref("");
    const dishImage = ref("");
    const dishDescription = ref("");
    const dishClicked = (clickedDish: string) => {
      dishTitle.value = clickedDish;
      dishMenu.forEach((dishMenuType) => {
        dishMenuType.forEach((dishType) => {
          dishType.dishes.forEach((dish) => {
            if (dish.name == clickedDish) {
              dishImage.value = dish.image;
              dishDescription.value = dish.description;
            }
          });
        });
      });
      dishDescriptionVisible.value = true;
    };

    const isOrderTime = (dishMenuDate: string, tomorrowDate: string) => {
      const currentDate = new Date();
      if (
        dishMenuDate == currentDate.toLocaleDateString().slice(0, 5) ||
        (tomorrowDate == dishMenuDate && currentDate.getHours() >= 12)
      ) {
        return false;
      } else return true;
    };

    const setDishTypeColor = (dishMenu: Array<Array<DishType>>) => {
      dishMenu.forEach((dishMenuType) => {
        dishMenuType.forEach((dishType) => {
          let counter = 0;
          dishType.dishes.forEach((dish) => {
            if (dish.quantity > 0) {
              counter++;
            }
          });
          if (counter > 0) {
            dishType.textColor = "blue";
          } else dishType.textColor = "black";
        });
      });
    };

    onMounted(() => {
      const date = new Date();
      disableDishMenu.value = true;
      activeDate.value = date.toLocaleDateString();
      setDishTypeColor(dishMenu);
    });

    return {
      orderDate,
      disableDishMenu,
      dishMenuTypes,
      dishMenu,
      daysWithFormedDishMenu,
      daysWithOrder,
      formedOrder,
      activeDate,
      dateButtonClick,
      saveButtonClicked,
      savingConfirmed,
      clearingConfirmed,
      inputChanged,
      dishDescriptionVisible,
      dishTitle,
      dishImage,
      dishDescription,
      dishClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
.kitchen-dish-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.lunch-ordering-frame {
  background-color: azure;
  border-radius: 15px;
  height: 100%;
  width: auto;
  padding: 20px;
}

.dish-description {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
}

.description-item {
  align-self: center;
}
</style>
