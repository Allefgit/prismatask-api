import { Exception } from '@adonisjs/core/exceptions'

export default class ValidationException extends Exception {
  static fieldError(message: string = 'Erro de validação') {
    return new ValidationException(message, {
      status: 422,
      code: 'E_VALIDATION_ERROR',
    })
  }
}
