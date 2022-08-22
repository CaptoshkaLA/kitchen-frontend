<template>
  <div class="logo" :class="{ night: showDayNightStatus }">
    <router-link to="/login"
      >RELEX
      <span class="logo-kitchen" :class="{ night: showDayNightStatus }">
        kitchen
      </span>
    </router-link>
    <DayNightToggleSwitchVue />
    <MenuIcon />
  </div>
</template>
<script lang="ts">
import { mapGetters } from 'vuex';
import MenuIcon from '@/modules/portal/components/MenuIcon.vue';
import DayNightToggleSwitchVue from '@/common/components/DayNightToggleSwitch.vue';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Logo',
  components: { MenuIcon, DayNightToggleSwitchVue },
  computed: {
    ...mapGetters(['showDayNightStatus']),
  },
});
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 5px;
  padding-left: 20px;
  display: flex;
  font-size: 48px;
  background-color: $background-day-blocks;
  border-radius: 0 0 10px 10px;
  transition: font-size 0.5s ease 0s;
  z-index: 5;
  justify-content: space-between;
  align-items: center;
}
.logo.night {
  background-color: $background-night-blocks;
}
.logo-kitchen {
  font-family: 'Bebas Neue', cursive;
  color: $day-color-text;
  transition: color 0.9s ease 0s;
}
.logo-kitchen.night {
  color: $night-color-text;
}

a {
  color: $link-hover;
  font-family: 'Pacifico', cursive;
  letter-spacing: 7px;
}

.logo {
  @include breakpoint-mobile() {
    font-size: 40px;
  }
}
.logo-kitchen {
  @include breakpoint-mobile() {
    display: none;
  }
}
</style>
