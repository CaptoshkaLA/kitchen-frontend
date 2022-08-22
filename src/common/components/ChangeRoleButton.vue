<!-- TODO: Использовать этот компонет в случае неработающей авторизации -->

<template>
  <div>
    <button class="btn" @click="btnClick"><h4>Сменить роль</h4></button>
  </div>
</template>
<script lang="ts">
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['changeRole']),

    btnClick() {
      this.changeRole();
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  padding: 10px;
  background-color: rgb(231, 29, 29);
  border: 1px solid rgb(111, 111, 111);
  border-radius: 15px;
  color: white;
  position: absolute;
  left: 30px;
  bottom: 30px;
}
</style>
