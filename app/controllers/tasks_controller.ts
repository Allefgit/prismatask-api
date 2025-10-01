import TaskServices from '#services/task_services'
import {
  createTaskValidator,
  deleteTaskValidator,
  getTaskByIdValidator,
  updateTaskBodyValidator,
  updateTaskParamsValidator,
} from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  private readonly taskService: TaskServices

  constructor() {
    this.taskService = new TaskServices()
  }

  async create({ request, response, auth }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()

    const { category, description, priority, status, targetDate, especification } =
      await request.validateUsing(createTaskValidator)

    const task = await this.taskService.createTask({
      userId,
      category,
      description,
      priority,
      status,
      targetDate,
      especification,
    })

    return response.created(task)
  }

  async update({ params, request, response, auth }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()

    const { category, description, priority, status, targetDate, especification } =
      await request.validateUsing(updateTaskBodyValidator)

    const { id } = await request.validateUsing(updateTaskParamsValidator, {
      data: params,
    })

    const task = await this.taskService.updateTask({
      userId,
      id,
      categoryName: category,
      description,
      priority,
      status,
      targetDate,
      especification,
    })

    return response.ok(task)
  }

  async getById({ request, params, response }: HttpContext) {
    const { id } = await request.validateUsing(getTaskByIdValidator, {
      data: params,
    })
    const task = await this.taskService.getTaskById(id)

    return response.ok(task)
  }

  async getByUserId({ auth, response }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()
    const task = await this.taskService.getTaskByUserId(userId)

    return response.ok(task)
  }

  async delete({ request, params, response, auth }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()
    const { id } = await request.validateUsing(deleteTaskValidator, {
      data: params,
    })
    await this.taskService.deleteTask({ id, userId })

    return response.noContent()
  }
}
