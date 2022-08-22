import { createStore } from 'vuex'
import iconMenu from './modules/icon-menu'
import toggleSwitchDayNigth from './modules/toggle-day-nigh'
import loginFormModule from './modules/login-form';
import guideDishesModule from "./modules/guide-dishes";
import selectDishModule from "./modules/select-dish"

export default createStore({
  modules: { iconMenu, toggleSwitchDayNigth, loginFormModule,  guideDishesModule, selectDishModule },
})
