<template>
  <div class="home" :class="{ night: showDayNightStatus }">
    <Header />
    <Menu />
    <div class="work-space" :class="{ night: showDayNightStatus }">
      <router-view></router-view>
    </div>
    <!-- Вырезать компонент ChangeRoleButtonVue при работающей авторизации-->
    <ChangeRoleButtonVue /> 
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import Menu from '@/modules/portal/components/Menu.vue';
import Header from '@/modules/portal/components/Header.vue';

import CreateDishMenu from '@/modules/createDish/views/CreateDishMenu.vue';

import ChangeRoleButtonVue from '@/common/components/ChangeRoleButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Menu,
    Header,
    CreateDishMenu,
    ChangeRoleButtonVue,
  },
  computed: {
    ...mapGetters(['showDayNightStatus']),
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  background-color: $background-day-main;
  min-height: 100vh;
}
.home.night {
  background-color: $background-night-main;
}
.work-space {
  margin-top: 110px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 80%;
  height: auto;
  background-color: $background-day-blocks;
  border-radius: 15px;
}
.work-space.night {
  background-color: $background-night-blocks;
}
.home {
  @include breakpoint-tablet-and-down() {
    flex-direction: column;
  }
}
.work-space {
  @include breakpoint-tablet-and-down() {
    width: 90%;
    margin: 20px auto;
  }
  @include breakpoint-mobile() {
    margin: 90px auto 20px;
  }
}
</style>
