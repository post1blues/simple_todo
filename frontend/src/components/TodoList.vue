<template>
  <div>
    <TodoItem v-for="task in taskList" :key="task._id" :task="task" />
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue'
  import TodoItem from './TodoItem.vue'
  import { ITask } from '../interfaces/Task.interface'

  export default defineComponent({
    components: { TodoItem },
    props: {
      taskList: {
        type: Array as PropType<Array<ITask>>,
        required: true,
      },
    },
  })
</script>
