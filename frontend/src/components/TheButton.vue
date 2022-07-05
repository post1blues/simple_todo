<template>
  <button class="btn">
    <img src="../assets/icons/checkmark.svg" class="check-mark" />
    Completed
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({})
</script>

<style scoped>
  .btn {
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 8px;
    width: 114px;
    height: 29px;
    background: #1e446e;
    border: none;
    border-radius: 4px;
    color: #4ea2ff;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }

  .check-mark {
    margin-left: 5px;
  }

  .btn:hover {
    cursor: pointer;
  }
</style>
