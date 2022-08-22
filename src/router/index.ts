import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LunchOrdering from '@/modules/order/views/LunchOrdering.vue';
import LoginForm from '@/modules/login/views/LoginForm.vue';
import CreateDishMenu from '@/modules/createDish/views/CreateDishMenu.vue';
import OrderHistory from '@/modules/order/views/OrderHistory.vue';
import GuideDishes from '@/modules/dishesTable/views/GuideDishes.vue';

import store from '@/store';

let isAdmin = store.getters['getIsAdmin'];
let mainPage;
if (isAdmin) {
  mainPage = CreateDishMenu;
} else mainPage = LunchOrdering;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Main',
    name: 'main',
    component: mainPage,
    alias: '/',
  },
  {
    path: '/Menu',
    name: 'lunchOrdering',
    component: LunchOrdering,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/CreateDishMenu',
    name: 'CreateDishMenu',
    component: CreateDishMenu,
    alias: '/',
  },
  {
    path: '/OrderHistory',
    name: 'orderHistory',
    component: OrderHistory,
  },
  {
    path: '/Guide',
    name: 'guide',
    component: GuideDishes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
