import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  static fieldError(message: string = 'Registro não encontrado') {
    return new NotFoundException(message, {
      status: 404,
      code: 'E_NOT_FOUND',
    })
  }
}
