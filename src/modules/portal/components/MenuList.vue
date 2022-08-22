<template>
  <div>
    <ul>
      <MenuItem v-for="item in Items" :key="item.id" :item="item" />
    </ul>
  </div>
</template>
<script lang="ts">

import MenuItem from '@/modules/portal/components/MenuItem.vue'
export default {
  props: ['Items'],
  components: {
    MenuItem,
  },
  
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
