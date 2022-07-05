import { defineStore } from 'pinia'
import tasksApi from '../api/tasks'
import { ITask } from '../interfaces/Task.interface'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as ITask[],
  }),
  getters: {
    completedTasks(state) {
      return state.tasks.filter((task: ITask) => task.isCompleted)
    },
    uncompletedTasks(state) {
      return state.tasks.filter((task: ITask) => !task.isCompleted)
    },
  },
  actions: {
    async fetchTasks() {
      this.tasks = await tasksApi.fetchTasks()
    },
    async addTask(text: string) {
      if (!!text) {
        const newTask: ITask = await tasksApi.createTask({
          text,
          isCompleted: false,
        })
        this.tasks = [newTask as ITask, ...this.tasks]
      }
    },
    async removeTask(taskId: string) {
      const deletedTask = await tasksApi.removeTask(taskId)
      this.tasks = this.tasks.filter((t: ITask) => t._id !== deletedTask._id)
    },
    async editTask(taskId: string, text: string) {
      const task = this.tasks.find((t) => t._id === taskId)
      if (!task) {
        return
      }
      const updatedTask = await tasksApi.patchTask(task._id, {
        text,
        isCompleted: task.isCompleted,
      })
      const updatedTaskIndex = this.tasks.findIndex(
        (t) => t._id === updatedTask._id
      )
      this.tasks[updatedTaskIndex] = updatedTask
    },
    async toggleTask(taskId: string) {
      const task = this.tasks.find((t) => t._id === taskId)
      if (!task) {
        return
      }
      const updatedTask = await tasksApi.patchTask(task._id, {
        text: task.text,
        isCompleted: !task.isCompleted,
      })
      const updatedTaskIndex = this.tasks.findIndex(
        (t) => t._id === updatedTask._id
      )
      this.tasks[updatedTaskIndex] = updatedTask
    },
  },
})
