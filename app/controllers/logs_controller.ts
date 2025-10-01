import LogServices from '#services/log_services'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogsController {
  private readonly logServices: LogServices

  constructor() {
    this.logServices = new LogServices()
  }

  async getByTaskId({ params, response }: HttpContext) {
    const id = params.id
    const logs = await this.logServices.taskAuditory(id)

    return response.ok(logs)
  }

  async getByCategoryId({ params, response }: HttpContext) {
    const id = params.id
    const logs = await this.logServices.caregoryAuditory(id)

    return response.ok(logs)
  }

  async getByUserId({ params, response }: HttpContext) {
    const id = params.id
    const logs = await this.logServices.userAuditory(id)

    return response.ok(logs)
  }

  async getByUserAccessibilityId({ params, response }: HttpContext) {
    const id = params.id
    const logs = await this.logServices.userAccessibilityAuditory(id)

    return response.ok(logs)
  }
}
