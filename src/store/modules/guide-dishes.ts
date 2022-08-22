import { Module} from "vuex";
import {useStore} from "vuex";
const store=useStore();
export const guideDishesModule: Module<any, any> = {
  state: {
    tableData: [],
  },
  getters: {
    getTableData(state) {
      return state.tableData;
    },
  },
  mutations: {
    setTableData: async (state) => {
      const res = await fetch(`${process.env.VUE_APP_BASE_URL}/dish/getDishes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (res.status.toString()==="401"){
        store.dispatch("setNullUser");
      }
      else{
      const data = await res.json();

      for (let i = 0; i < data.length; i++) {
        switch (data[i].menu_type) {
          case "PREMIUM": {
            data[i].menu_type = "Премиум";
            break;
          }
          case "DIET": {
            data[i].menu_type = "Диетическое";
            break;
          }
          case "COMMON": {
            data[i].menu_type = "Общее";
            break;
          }
        }
        switch (data[i].category) {
          case "SOUP": {
            data[i].category = "Суп";
            break;
          }
          case "DRINK": {
            data[i].category = "Напитки";
            break;
          }
          case "GARNISH": {
            data[i].category = "Гарнир";
            break;
          }
          case "MEAT": {
            data[i].category = "Мясо";
            break;
          }
          case "FISH": {
            data[i].category = "Рыба";
            break;
          }
        }
      }
      state.tableData = data;
      console.log(state.tableData)
    }
    },
      changeTableData: async (state, { index, row }) => {
         const res = await fetch(
           `${process.env.VUE_APP_BASE_URL}/dish/deleteDishById/${row.id}`,
           {
             method: "DELETE",
             headers: {
               "Content-Type": "application/json;charset=utf-8",
             },
           }
         );
         state.tableData.splice(index, 1);
    }
  },
    actions: {
        getDishes({ commit }) {
            commit("setTableData");
        },
        deleteItem({ commit }, { index, row }) {
            commit("changeTableData", { index, row });
        }
  },
};
export default guideDishesModule;
