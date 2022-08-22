<template>
  <div
    class="menu"
    :class="{ active: showIconMenu, night: showDayNightStatus }">
    <hr :class="{ night: showDayNightStatus }" />
    <nav class="menu-items">
      <div v-if="getIsAdmin"><MenuList :Items="adminsItems" /></div>
      <div v-else><MenuList :Items="userItems" /></div>
    </nav>
    <hr :class="{ night: showDayNightStatus }" />
  </div>
</template>

<script lang="ts">
import MenuList from '@/modules/portal/components/MenuList.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Menu',
  components: {
    MenuList,
  },
  data() {
    return {
      adminsItems: [
        { id: 1, link: '#', title: 'Подтверждение обедов' },
        { id: 2, link: '#', title: 'Сформировать отчет' },
        { id: 3, link: '/CreateDishMenu', title: 'Заполнить меню' },
        { id: 4, link: '/Guide', title: 'Справочник'},
      ],
      userItems: [
        { id: 1, link: '/Menu', title: 'Меню' },
        { id: 2, link: '/OrderHistory', title: 'Мои заказы' },
      ],
    };
  },
  computed: {
    ...mapGetters(['showIconMenu', 'getIsAdmin', 'showDayNightStatus']),
  },
};
</script>
<style lang="scss" scoped>
.menu-items {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  align-items: center;
  text-align: center;
}
hr {
  background-color: $day-color-text;
  padding-top: 3px;
  border-radius: 20px;
  height: 3px;
  margin: 20px 20px;
  @include breakpoint-mobile() {
    background-color: $white;
  }
}
hr.night {
  background-color: $white;
}
.menu {
  margin: 110px 20px auto 20px;
  width: 20%;
  background-color: $background-day-blocks;
  border-radius: 15px;
  @include breakpoint-mobile() {
    margin-top: 0;
    position: fixed;
    top: 0;
    left: -120%;
    width: 100%;
    height: 100%;
    background-color: $background-icon-menu;
    padding: 100px 30px 30px 30px;
    transition: left 0.3s ease 0s;
    border-radius: 0;
    z-index: 2;
  }

  @include breakpoint-tablet() {
    font-size: 24px;
    width: 90%;
    height: auto;
    margin: 0 auto;
    margin-top: 110px;
  }
}
.night {
  background-color: $background-night-blocks;
  @include breakpoint-mobile() {
    background-color: $background-icon-menu;
  }
}
.menu.active {
  @include breakpoint-mobile() {
    left: 0;
    margin-left: 0;
  }
}
.menu-items > a {
  @include breakpoint-mobile() {
    margin: 0px 0px 30px 0px;
  }
}
.menu-items > a:last-child {
  @include breakpoint-mobile() {
    margin-bottom: 0;
  }
}
</style>
