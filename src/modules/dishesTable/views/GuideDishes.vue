<template>
  <el-table
    class="table"
    :data="filterTableData"
    :table-layout="tableLayout"
    border
    height="80vh"
  >
    <el-table-column type="expand" fixed>
      <template #default="props">
        <div class="desc">
          <el-image v-if="props.row.image!=null" class="image" :src="props?.row?.image" />
          <p v-if="props.row.pfc!=null"><b>КБЖУ:</b> {{ props?.row?.pfc }}</p>
          <p><b>Описание:</b> {{ props?.row?.description }}</p>
          <p v-if="props.row.note!=null"><b>Заметки:</b> {{ props?.row?.note }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      column-key="name"
      fixed
      prop="name"
      label="Название"
    />
    <el-table-column
      label="Кагегория"
      prop="category"
      :filters="filterCategor"
      :filter-method="filterHandlerCategor"
    />
    <el-table-column
      label="Тип меню"
      prop="menu_type"
      :filters="filterMenu"
      :filter-method="filterHandlerMenu"
    />
    <el-table-column
      label="Цена (Rub)"
      prop="price"
      sortable
      column-key="price"
    />
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="small"
          placeholder="Нажмите для поиска"
        />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          :icon="Delete"
          @click="handleDelete(scope.$index, scope.row)"
          circle
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { Dish } from "@/modules/dishesTable/modeles/dish-model";
import { useStore } from "vuex";

export default defineComponent({
  name: "GuideDishes",

  setup() {
    const store = useStore();
    //Для автовыравнивания таблицы
    const tableLayout = ref("auto");
    //Функция поиска по имени
    const search = ref("");
    const filterTableData = computed(() =>
      store.getters.getTableData.filter(
        (data: Dish) =>
          !search.value ||
          data.name.toLowerCase().includes(search.value.toLowerCase())
      )
    );
    //Кнопки редактировать и удалить
    const handleEdit = async (index: number, row: Dish) => {
      console.log("Edit");
    };
    const handleDelete = async (index: number, row: Dish) => {
      store.dispatch("deleteItem", { index, row });
    };
    const filterMenu = [
      { text: "Диетическое", value: "Диетическое" },
      { text: "Общее", value: "Общее" },
      { text: "Премиум", value: "Премиум" },
    ];
    const filterCategor = [
      { text: "Суп", value: "Суп" },
      { text: "Гарнир", value: "Гарнир" },
      { text: "Мясо", value: "Мясо" },
      { text: "Рыба", value: "Рыба" },
      { text: "Напитки", value: "Напитки" },
    ];
    //Фильтр отдельный для типов меню
    const filterHandlerMenu = (value: string, row: Dish) => {
      return row.menu_type === value;
    };
    const filterHandlerCategor = (value: string, row: Dish) => {
      return row.category === value;
    };
    onMounted(async () => {
      await store.dispatch("getDishes");
    });
    

    return {
      filterTableData,
      filterHandlerMenu,
      filterHandlerCategor,
      handleEdit,
      Delete,
      handleDelete,
      search,
      tableLayout,
      onMounted,
      filterMenu,
      filterCategor,
    };
  },
});
</script>

<style scoped>
.guide-dish-table {
  position: auto;
}
.table {
  width: 100%;
  background: #424753;
  z-index: 1;
}
.image {
  width: 100px;
  height: 100px;
}
.desc {
  margin-left: 20px;
}
el-table-column {
  width: 125px;
}
</style>
