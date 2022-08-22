<template>
  <div class="container">
    <el-table
      class="block"
      v-for="cat in category"
      :key="cat"
      :data="categoryFilter(cat)"
      :row-class-name="tableRowClassName"
      ref="multipleTableRef"
      height="200px"
      border
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column
        prop="name"
        :label="cat"
        sortable
        :filters="filters"
        :filter-method="filterTag" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Dish from '@/modules/createDish/models/DishInterface';
import DISHCATEGORY from '@/modules/createDish/models/DishCategory.enum';
import { ElTable } from 'element-plus';
import DISHMENUTYPE from '@/modules/createDish/models/DishMenuType.enum';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DishMenuTable',
  props: {
    Dishes: Array as PropType<Dish[]>,
    Selected: Array as PropType<Dish[]>,
  },
  emits: ['add'],
  setup(props, { emit }) {
    const store = useStore();

    const category = ref(DISHCATEGORY);
    const categories = ref<Array<Dish>>([]);

    const selected = ref<Array<Dish>>([]);

    const filters = ref([
      { text: 'Основное', value: 'DISHMENUTYPE.COMMON' },
      { text: 'Диетическое', value: 'DISHMENUTYPE.DIET' },
      { text: 'Премиум', value: 'DISHMENUTYPE.PREMIUM' },
    ]);

    const tableRowClassName = (row: Dish) => {
      switch (row.menu_type) {
        case DISHMENUTYPE.COMMON:
          return 'common-row';
        case DISHMENUTYPE.DIET:
          return 'diet-row';
        case DISHMENUTYPE.PREMIUM:
          return 'premium-row';
      }
    };

    const filterTag = (row: Dish, value: DISHMENUTYPE) => {
      return row.menu_type === value;
    };

    const categoryFilter = (cat: DISHCATEGORY) => {
      categories.value = [];
      for (let i = 0; i < props.Dishes!.length; i++)
        if (props.Dishes![i].category === cat)
          categories.value.push(props.Dishes![i]);
      return categories.value;
    };

    const multipleSelection = ref<Dish[]>([]);

    const handleSelectionChange = (val: Dish[]) => {
      emit('add', val);
    };

    const multipleTableRef = ref<InstanceType<typeof ElTable>>(); //ElementPlus type

    const toggleSelection = () => {
      for (let i = 0; i < props.Dishes!.length; i++) {
        for (let j = 0; j < props.Selected!.length; j++)
          if (props.Dishes![i].id === props.Selected![j].id)
            multipleTableRef.value!.toggleRowSelection(
              props.Selected![j],
              true
            );
      }
      return multipleTableRef.value;
    };

    return {
      selected,
      filters,
      tableRowClassName,
      filterTag,
      category,
      categories,
      categoryFilter,
      handleSelectionChange,
      multipleTableRef,
      toggleSelection,
      multipleSelection,
      store,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
}
.container .block {
  width: 20%;
  float: left;
  min-height: 200px;
  border-radius: 5px;
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
</style>
