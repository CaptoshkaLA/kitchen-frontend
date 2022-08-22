<template>
  <div
    class="menu-icon"
    :class="{ night: showDayNightStatus }"
    @click="menuIconClick">
    <span></span>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'MenuIcon',
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['showDayNightStatus']),
  },
  methods: {
    ...mapActions(['toggleMenuIcon']),

    menuIconClick() {
      this.toggleMenuIcon();
    },
  },
};
</script>

<style lang="scss">
.menu-icon {
  display: none;
}

.menu-icon {
  @include breakpoint-mobile() {
    z-index: 6;
    display: block;
    position: relative;
    width: 30px;
    height: 18px;
    cursor: pointer;
    margin-right: 30px !important;
  }
}

.menu-icon span,
.menu-icon::before,
.menu-icon::after {
  @include breakpoint-mobile() {
    left: 0;
    position: absolute;
    height: 10%;
    width: 100%;
    transition: all 0.3s ease 0s;
    background-color: $black; 
  }
}
.menu-icon.night span,
.menu-icon.night::before,
.menu-icon.night::after {
  background-color: $white; 
}
.menu-icon::before,
.menu-icon::after {
  @include breakpoint-mobile() {
    content: '';
  }
}
.menu-icon::before {
  @include breakpoint-mobile() {
    top: 0;
  }
}

.menu-icon::after {
  @include breakpoint-mobile() {
    bottom: 0;
  }
}
.menu-icon span {
  @include breakpoint-mobile() {
    top: 50%;
    transform: scale(1) translate(0px, -50%);
  }
}
</style>
