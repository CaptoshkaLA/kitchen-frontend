<template>
  <li :class="{ night: showDayNightStatus }">
    <router-link :to="item.link" @click="menuItemClick">{{ item.title }} </router-link>
  </li>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['showDayNightStatus']),
  },
  methods: {
    ...mapActions(['toggleMenuIcon']),

    menuItemClick() {
      this.toggleMenuIcon()
    },
  },
}
</script>
<style lang="scss" scoped>
li {
  margin-bottom: 20px;
}
li:last-child {
  margin-bottom: 0px;
}
li > a {
  font-family: 'Roboto Slab';
  letter-spacing: normal;
  color: $day-color-text;
  transition: color 0.5s ease 0s;
  margin: 0px 0px 0px 0px;
   @include breakpoint-mobile() {
    color: $night-color-text;}
}
li > a:hover {
  color: $link-hover;
}

li.night > a {
  color: $night-color-text;
}
li.night > a:hover {
  color: $link-hover;
}
</style>
