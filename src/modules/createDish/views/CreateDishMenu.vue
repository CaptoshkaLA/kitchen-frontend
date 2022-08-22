<template>
  <div class="wrapper">
    <div class="topper">
      <div class="left">
        <div class="datepicker">
          <span>Показать меню на:</span>
          <calendar @get="getDailyDishMenu" />
        </div>
      </div>
      <div class="right">
        <div class="cards">
          <dish-menu-type-card :Selected="selected" />
        </div>
        <save-discard-buttons @save="SaveDishMenu(selected)" />
      </div>
    </div>
    <div class="bottom">
      <dish-menu-table
        :Dishes="store.getters.getAllDishes"
        :Selected="selected"
        @add="addSelected" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import DishMenuTable from '@/modules/createDish/components/DishMenuTable.vue';
import DISHCATEGORY from '@/modules/createDish/models/DishCategory.enum';
import DISHMENUTYPE from '@/modules/createDish/models/DishMenuType.enum';
import DishMenuTypeCard from '@/modules/createDish/components/DishMenuTypeCard.vue';
import Calendar from '@/modules/createDish/components/Calendar.vue';
import Dish from '@/modules/createDish/models/DishInterface';
import SaveDiscardButtons from '../components/SaveDiscardButtons.vue';
import DishMenu from '@/modules/createDish/models/DishMenuByDate';
import { useStore } from 'vuex';

export default {
  name: 'CreateDishMenu',
  components: {
    DishMenuTable,
    DishMenuTypeCard,
    Calendar,
    SaveDiscardButtons,
  },
  setup() {
    const store = useStore();

    const catSelected = ref<Array<Dish>>([]);
    const selected = ref<Array<Dish>>([]);

    const dishMenuPerDay = ref<DishMenu>({
      date: '',
      ids: [],
    });

    const date = ref<string>('');

    const addSelected = (val: Dish[]) => {
      catSelected.value = [];
      for (let i = 0; i < val.length; i++) {
        catSelected.value.push(val[i]);
      }
      for (let i = 0; i < catSelected.value.length; i++) {
        selected.value.push(catSelected.value[i]);
      }
      selected.value = selected.value.filter((v, i, a) => a.indexOf(v) === i);
    };

    const SaveDishMenu = (val: Dish[]) => {
      dishMenuPerDay.value.date = date.value;
      for (let i = 0; i < val.length; i++)
        dishMenuPerDay.value.ids.push(val[i].id);
      store.dispatch('postDailyDish', dishMenuPerDay.value);
    };

    onMounted(() => {
      store.dispatch('getAllDishes');
      store.dispatch('getDailyDishMenu');
    });

    const dateSelected = ref<Array<Dish>>([
      {
        menuId: 19,
        id: 1,
        date: '2022-07-30T00:00:00.000',
        name: 'Окрошка',
        category: DISHCATEGORY.SOUP,
        menu_type: DISHMENUTYPE.DIET,
        description: '',
        price: 456,
      },
    ]);

    const getDailyDishMenu = (getDate: string) => {
      date.value = getDate;
      for (let i = 0; i < dateSelected.value.length; i++) {
        if (
          new Date(dateSelected.value[i].date!).getTime() ===
          new Date(date.value).getTime()) {
          selected.value.push(dateSelected.value[i]);
        }
      }
      for (let i = 0; i < store.getters.getDishMenuPerMonth.data.length; i++) {
        if (
          new Date(store.getters.getDishMenuPerMonth.data[i].date).getTime() ===
          new Date(date.value).getTime() + 3 * 60 * 60 * 1000
        ) {
          selected.value.push(store.getters.getDishMenuPerMonth.data[i]);
        }
      }
      return selected.value;
    };

    return {
      addSelected,
      catSelected,
      selected,
      SaveDishMenu,
      date,
      store,
      getDailyDishMenu,
      dateSelected,
    };
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
}
.topper {
  display: flex;
  float: left;
}
.right {
  margin: 20px;
  --div-width: 100%;
  width: var(--div-width);
}
.cards {
  display: flex;
}
.bottom {
  margin: 20px;
}
.left {
  margin: 20px;
}
.datepicker {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
