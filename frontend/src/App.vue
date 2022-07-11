<template>
  <div class="todo-list">
    <TheHeader />
    <TodoInput />
    <TodoList :taskList="uncompletedTasks" />
    <div class="breakline"></div>
    <TheButton @click="showCompleted = !showCompleted" />
    <TodoList :taskList="completedTasks" v-if="showCompleted" />
  </div>
</template>

<script lang="ts">
  import { mapActions, mapState } from 'pinia'
  import { defineComponent } from 'vue'
  import TheHeader from './components/TheHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoInput from './components/AddTodoInput.vue'
  import TheButton from './components/TheButton.vue'
  import { useTasksStore } from './store/tasks'

  export default defineComponent({
    components: {
      TheHeader, TodoList, TodoInput, TheButton,
    },
    data() {
      return {
        showCompleted: true as boolean,
      }
    },
    computed: {
      ...mapState(useTasksStore, ['completedTasks', 'uncompletedTasks']),
    },
    methods: {
      ...mapActions(useTasksStore, ['fetchTasks']),
    },
    created() {
      this.fetchTasks()
    },
  })
</script>

<style>
  .todo-list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    max-width: 800px;
  }

  .breakline {
    height: 1px;
    background: #383a4c;
    margin-top: 20px;
  }
</style>
