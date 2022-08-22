<template>
  <el-card
    class="box-card"
    height="200px"
    v-for="dishMenuType in type"
    :key="dishMenuType">
    <template #header>
      <div class="card-header">
        <span>{{ dishMenuType }}</span>
      </div>
    </template>
    <div class="container">
      <div v-for="cat in category" :key="cat" class="category_block">
        <b>{{ cat }}</b>
        <div
          v-for="dish in dishMenuTypeFilter(dishMenuType, categoryFilter(cat))"
          :key="dish.id"
          class="text-item">
          {{ dish.name }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onUpdated } from 'vue';
import Dish from '@/modules/createDish/models/DishInterface';
import DISHMENUTYPE from '@/modules/createDish/models/DishMenuType.enum';
import DISHCATEGORY from '@/modules/createDish/models/DishCategory.enum';

export default defineComponent({
  name: 'DishMenuTable',
  props: {
    Selected: Array as PropType<Dish[]>,
  },
  setup(props) {
    const type = ref(DISHMENUTYPE);
    const category = ref(DISHCATEGORY);

    const categories = ref<Array<Dish>>([]);
    const types = ref<Array<Dish>>([]);

    const dishMenuTypeFilter = (type: DISHMENUTYPE, table: Array<Dish>) => {
      types.value = [];
      for (let i = 0; i < table!.length; i++)
        if (table![i].menu_type === type) types.value.push(table![i]);
      return types.value;
    };

    const categoryFilter = (cat: DISHCATEGORY) => {
      categories.value = [];
      for (let i = 0; i < props.Selected!.length; i++) {
        if (props.Selected![i].category === cat)
          categories.value.push(props.Selected![i]);
      }
      return categories.value;
    };

    return {
      type,
      types,
      dishMenuTypeFilter,
      categoryFilter,
      categories,
      category,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.el-table .common-row {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
.el-table .diet-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .premium-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.card-header {
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  --card-width: calc(var(--div-width) / 3);
  width: var(--card-width);
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.save-reset-buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.text-item {
  text-align:left;
}
.category_block {
  text-align:center;
  padding: 10px;
}
</style>
