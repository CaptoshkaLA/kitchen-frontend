import DISHCATEGORY from "@/modules/createDish/models/DishCategory.enum";
import DISHMENUTYPE from "@/modules/createDish/models/DishMenuType.enum";
import { Module } from 'vuex'

export const selectDishMenuModule: Module<any, any> = {
  state: {
    allDishes: [],
    dishMenuPerMonth: [],
    dishPerDay: {
      id: null,
      date: '',
      name: '',
      menu_type: DISHMENUTYPE.COMMON,
      category: DISHCATEGORY.SOUP,
    }
  },
  getters: {
    getAllDishes(state) {
      return state.allDishes;
    },
    getDishMenuPerMonth(state) {
      return state.dishMenuPerMonth;
    },
    getDishMenuPerDay(state) {
      return state.dishPerDay;
    },
  },
  mutations: {
    setDishes(state, Dishes) {
      state.allDishes = Dishes;
    },
    setDishMenuPerMonth(state, Dishes) {
      state.dishMenuPerMonth = Dishes;
    },
  },
  actions: {
    getAllDishes: async ({ commit }) => {
      try {
        const response = await fetch(
          'http://localhost:80/dish/getDishes', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        for (let i = 0; i < data.length; i++) {
          switch (data[i].menu_type) {
            case "PREMIUM": {
              data[i].menu_type = DISHMENUTYPE.PREMIUM;
              break;
            }
            case "DIET": {
              data[i].menu_type = DISHMENUTYPE.DIET;
              break;
            }
            case "COMMON": {
              data[i].menu_type = DISHMENUTYPE.COMMON;
              break;
            }
          }
          switch (data[i].category) {
            case "SOUP": {
              data[i].category = DISHCATEGORY.SOUP;
              break;
            }
            case "DRINK": {
              data[i].category = DISHCATEGORY.DRINK;
              break;
            }
            case "GARNISH": {
              data[i].category = DISHCATEGORY.GARNISH;
              break;
            }
            case "MEAT": {
              data[i].category = DISHCATEGORY.MEAT;
              break;
            }
            case "FISH": {
              data[i].category = DISHCATEGORY.FISH;
              break;
            }
          }
        }
        commit('setDishes', data);
      } catch (error) {
        console.log(error);
      }
    },

    getDailyDishMenu: async ({ commit }, getters) => {
      try {
        const response = await fetch(
          'http://localhost:80/daily/daily-dishes/?dateFrom=2022-07-01&dateTo=2022-07-30"',
          {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        commit('setDishMenuPerMonth', data)
      } catch (error) {
        console.log(error);
      }
    },

    postDailyDish: async (state, day) => {
      try {
        const request = await fetch(
          'http://localhost:80/daily/daily-dishes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(day),
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },

}

export default selectDishMenuModule;
