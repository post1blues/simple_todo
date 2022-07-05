import axios from 'axios'
import { ITask } from '../interfaces/Task.interface'

const BASE_URL = process.env.BACKEND_URI || 'http://localhost:3000/tasks'

const tasksApi = {
  fetchTasks: async (): Promise<ITask[]> => {
    console.log(BASE_URL)
    const tasks = await axios.get(`${BASE_URL}`)

    return tasks.data
  },
  createTask: async (task: Omit<ITask, '_id'>): Promise<ITask> => {
    const newTask = await axios.post(`${BASE_URL}`, task)
    return newTask.data
  },
  patchTask: async (
    taskId: string,
    task: Omit<ITask, '_id'>
  ): Promise<ITask> => {
    const updatedTask = await axios.patch(`${BASE_URL}/${taskId}`, task)
    return updatedTask.data
  },
  removeTask: async (taskId: string): Promise<ITask> => {
    const deletedTask = await axios.delete(`${BASE_URL}/${taskId}`)
    return deletedTask.data
  },
}

export default tasksApi
