<template>
  <div class="add-task_wrapper">
    <img src="../assets/icons/plus_24px.svg" class="add-task_plus" alt="plus" />
    <input
      class="add-task"
      type="text"
      placeholder="Add a task"
      @keyup.enter="addTaskAndClean"
      v-model.trim="newTask"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapActions } from 'pinia'
  import { useTasksStore } from '../store/tasks'

  export default defineComponent({
    data() {
      return {
        newTask: '' as string,
      }
    },
    methods: {
      ...mapActions(useTasksStore, ['addTask']),
      addTaskAndClean() {
        this.addTask(this.newTask)
        this.newTask = ''
      },
    },
  })
</script>

<style scoped>
  .add-task_wrapper {
    display: flex;
    align-content: center;
    position: relative;
    margin-top: 20px;
  }

  .add-task_plus {
    position: absolute;
    left: 20px;
    top: 20px;
  }

  .add-task {
    padding-left: 60px;
    gap: 20px;
    width: 800px;
    height: 60px;
    border: 1px solid #535568;
    border-radius: 10px;
    background: #222435;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #fafafd;
  }
  .add-task:hover {
    color: #ffffff;
    border-color: #67697a;
  }

  .add-task:focus {
    background: #383a4c;
    border: 2px solid #535568;
    border-radius: 10px;
  }
</style>
