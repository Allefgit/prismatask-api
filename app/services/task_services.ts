import Task from '#models/task'
import { DateTime } from 'luxon'
import CategoryServices from './category_services.js'
import User from '#models/user'
import NotFoundException from '#exceptions/not_found_exception'

interface CreateTaskData {
  description: string
  especification?: string | null
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status:
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'ARCHIVED'
    | 'OVERDUE'
    | 'UNDER_REVIEW'
  userId: number
  category: string
  targetDate: Date
}

interface UpdateTaskData {
  id: number
  description?: string | null
  especification?: string | null
  priority?: 'HIGH' | 'MEDIUM' | 'LOW' | null
  status?:
    | 'PENDING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'ARCHIVED'
    | 'OVERDUE'
    | 'UNDER_REVIEW'
    | null
  categoryName?: string | null
  targetDate?: Date | null
}

export default class TaskServices {
  async createTask({
    description,
    especification,
    priority,
    status,
    targetDate,
    userId,
    category,
  }: CreateTaskData) {
    if (!userId) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const categoryServices = new CategoryServices()
    const { id: categoryId } = await categoryServices.verifyAndCreateCategory(category)

    const task = new Task()
    task.description = description
    task.especification = especification ?? null
    task.priority = priority
    task.status = status
    task.targetDate = DateTime.fromJSDate(targetDate)
    task.userId = userId
    task.categoryId = categoryId

    await task.save()

    return task
  }

  async updateTask({
    id,
    categoryName,
    description,
    priority,
    status,
    targetDate,
    especification,
  }: UpdateTaskData) {
    const task = await Task.findBy('id', id)
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }

    if (categoryName) {
      const categoryServices = new CategoryServices()
      const { id: categoryId } = await categoryServices.verifyAndCreateCategory(categoryName)

      task.categoryId = categoryId
    }

    task.description = description ?? task.description
    task.priority = priority ?? task.priority
    task.status = status ?? task.status
    task.targetDate = targetDate ? DateTime.fromJSDate(targetDate) : task.targetDate
    task.especification = especification ?? task.especification
    task.updatedAt = DateTime.now()

    await task.save()
    return task
  }

  async deleteTask(id: number) {
    const task = await Task.findBy('id', id)
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }
    task.delete()
  }

  async getTaskById(id: number) {
    const task = await Task.findBy('id', id)
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }
    return task
  }

  async getTaskByUserId(userId: number) {
    const user = await User.findBy('id', userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const tasks = await Task.findManyBy('userId', user.id)
    return tasks
  }
}
