import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Log from '#models/log'

export default class LogMiddleware {
  public async handle(ctx: HttpContext, next: NextFn) {
    const { request, auth } = ctx

    const payload = request.only(['newValue', 'oldValue', 'taskId'])

    const userId = auth.user!.id
    const method = request.method()
    const url = request.url()

    const response = await next()

    try {
      await Log.create({
        userId,
        action: `${method} ${url}`,
        newValue: payload.newValue,
        oldValue: payload.oldValue,
        taskId: payload.taskId,
      })
    } catch (error) {
      console.error('Erro ao salvar log:', error)
    }

    return response
  }
}
