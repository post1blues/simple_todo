<template>
  <div class="todo-item">
    <span
      class="ellipse"
      :class="task.isCompleted ? 'ellipse-completed' : ''"
      @click="toggleTask(task._id)"
    >
      <img
        src="../assets/icons/checkmark_completed.svg"
        class="check-mark"
        v-if="task.isCompleted"
      />
    </span>

    <input
      v-if="isEditable"
      @blur="editCurrentTask"
      @keyup.enter="editCurrentTask"
      v-model.trim="text"
      class="task editable"
    />
    <div
      v-else
      class="task"
      :class="task.isCompleted ? 'task-completed' : ''"
      @dblclick="showInput"
      ref="textInput"
    >
      {{ task.text }}
    </div>

    <img
      class="close"
      src="../assets/icons/close_24px.svg"
      @click="removeTask(task._id)"
    />
  </div>
</template>

<script lang="ts">
  import { mapActions } from 'pinia'
  import { PropType, defineComponent } from 'vue'
  import { useTasksStore } from '../store/tasks'
  import { ITask } from '../interfaces/Task.interface'

  export default defineComponent({
    props: {
      task: {
        required: true,
        type: Object as PropType<ITask>,
      },
    },
    data() {
      return {
        isEditable: false as boolean,
        text: '' as string,
      }
    },
    methods: {
      ...mapActions(useTasksStore, ['removeTask', 'editTask', 'toggleTask']),
      editCurrentTask(): void {
        if (this.text !== this.task.text) {
          this.editTask(this.task._id, this.text)
        }
        this.isEditable = false
      },
      showInput(): void {
        this.isEditable = true
        this.focusInput()
      },
      focusInput() {
        ;(this.$refs.textInput as HTMLInputElement).focus()
      },
    },
    mounted() {
      this.text = this.task.text
    },
  })
</script>

<style scoped>
  .todo-item {
    margin-top: 10px;
    display: flex;
    background: #383a4c;
    border-radius: 10px;
    max-width: 800px;
    height: 60px;
    align-items: center;
    border: none;
  }

  .ellipse {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    left: 20px;
    top: 20px;
    border: 2px solid #67697a;
    margin-left: 20px;
    border-radius: 10px;
  }

  .ellipse:hover {
    cursor: pointer;
  }

  .task {
    margin-left: 20px;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  .editable {
    background-color: #383a4c;
    border: 1px solid #535568;
    border-radius: 2px;
    height: 30px;
    color: #fafafd;
  }

  .close {
    margin-left: auto;
    margin-right: 20px;
  }

  .close:hover {
    cursor: pointer;
  }

  .ellipse-completed {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4ea2ff;
    border: none;
  }

  .task-completed {
    color: #9799ad;
    text-decoration-line: line-through;
  }
</style>
