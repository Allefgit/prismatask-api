import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class UnAuthorizedException extends Exception {
  constructor(message: string = 'Acesso negado!') {
    super(message, { status: 401, code: 'E_UNAUTHORIZED' })
  }

  async handle(error: this, ctx: HttpContext) {
    return ctx.response.status(error.status).send({
      error: error.code,
      message: error.message,
    })
  }
}
