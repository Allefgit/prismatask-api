import Task from '#models/task'
import { DateTime } from 'luxon'
import CategoryServices from './category_services.js'
import User from '#models/user'
import NotFoundException from '#exceptions/not_found_exception'
import LogServices from './log_services.js'
import AuditHelper from '../utilities/audit_helper.js'

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
  userId: number
  categoryName?: string | null
  targetDate?: Date | null
}

interface DeleteTaskData {
  id: number
  userId: number
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
    const user = await User.findBy('id', userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const categoryServices = new CategoryServices()
    const { id: categoryId } = await categoryServices.verifyAndCreateCategory({
      userId,
      name: category,
    })

    const task = new Task()
    task.description = description
    task.especification = especification ?? null
    task.priority = priority
    task.status = status
    task.targetDate = DateTime.fromJSDate(targetDate)
    task.userId = userId
    task.categoryId = categoryId

    await task.save()

    const logServices = new LogServices()
    await logServices.createLog({
      action: 'CREATE',
      entity: 'TASK',
      entityId: task.id,
      userId,
    })

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
    userId,
  }: UpdateTaskData) {
    const task = await Task.findBy('id', id)
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }

    const oldTask = task.toJSON()

    if (categoryName) {
      const categoryServices = new CategoryServices()
      const { id: categoryId } = await categoryServices.verifyAndCreateCategory({
        name: categoryName,
        userId,
      })

      task.categoryId = categoryId
    }

    task.description = description ?? task.description
    task.priority = priority ?? task.priority
    task.status = status ?? task.status
    task.targetDate = targetDate ? DateTime.fromJSDate(targetDate) : task.targetDate
    task.especification = especification ?? task.especification
    task.updatedAt = DateTime.now()

    await task.save()

    await AuditHelper.logChanges('TASK', task.id, userId, oldTask, task.toJSON())

    return task
  }

  async deleteTask({ id, userId }: DeleteTaskData) {
    const task = await Task.findBy('id', id)
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada')
    }

    const logServices = new LogServices()
    await logServices.createLog({
      action: 'DELETE',
      entity: 'TASK',
      entityId: task.id,
      userId,
    })

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
