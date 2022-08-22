<template>
  <div>
    <div class="save-reset-buttons">
      <el-row class="mb-4">
        <el-button
          type="primary"
          @click="showSaveDialog"
          :disabled="disabled">Сохранить</el-button>

        <el-button
          @click="showClearDialog"
          :disabled="disabled">Очистить</el-button>
      </el-row>
    </div>

    <el-dialog
      class="el-dialog"
      v-model="dialogSaveVisible"
      title="Подтвердите действие">
      <span class="el-dialog__body">{{ formedOrder }}</span>

      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="dialog-button"
            @click="hideSaveDialog">Отмена</el-button>
          <el-button
            class="dialog-button"
            type="primary"
            @click="saveOrder">Ок</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogClearVisible"
      title="Подтвердите действие"
      width="330px">
      <span>Вы хотите очистить заказ?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="dialog-button"
            @click="hideClearDialog">Отмена</el-button>
          <el-button
            class="dialog-button"
            type="primary"
            @click="clearOrder">Очистить</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SaveResetButtons",
  props: {
    //Disable Clear and Save buttons
    disabled: {
      type: Boolean,
      default: false,
    },
    //The order user formed and is going to save
    formedOrder: {
      type: String,
      default: "formed order",
    },
  },
  emits: [
    "saveButtonClicked",
    "clearButtonClicked",
    "savingConfirmed",
    "clearingConfirmed",
  ],
  setup(props, { emit }) {
    const dialogSaveVisible = ref(false);
    const showSaveDialog = () => {
      dialogSaveVisible.value = true;
      emit("saveButtonClicked");
    };
    const hideSaveDialog = () => {
      dialogSaveVisible.value = false;
    };

    const dialogClearVisible = ref(false);
    const showClearDialog = () => {
      dialogClearVisible.value = true;
    };
    const hideClearDialog = () => {
      dialogClearVisible.value = false;
    };

    const saveOrder = () => {
      hideSaveDialog();
      emit("savingConfirmed");
    };

    const clearOrder = () => {
      hideClearDialog();
      emit("clearingConfirmed");
    };

    return {
      dialogSaveVisible,
      showSaveDialog,
      hideSaveDialog,
      dialogClearVisible,
      showClearDialog,
      hideClearDialog,
      saveOrder,
      clearOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-dialog__body {
  word-break: keep-all;
}

.dialog-footer button:first-child {
  margin-right: 10px;
  padding: 5px;
}

.save-reset-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 30px;

}

.dialog-button {
  margin: 0px;
  padding: 10px;
  word-wrap: unset;
}
</style>
