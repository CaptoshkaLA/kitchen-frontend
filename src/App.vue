<template>
  <Home />
</template>
<script lang="ts">
import LoginForm from '@/modules/login/views/LoginForm.vue';
import Home from '@/modules/portal/views/Home.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    Home,
    LoginForm,
  },
  computed: {
    ...mapGetters(['getUser']),
  },
};
</script>
<style lang="scss">
@import '@/common/scss/style.scss';
#app {
  font-family: 'Roboto Slab', 'Bebas Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
