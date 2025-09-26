import { Exception } from '@adonisjs/core/exceptions'

export default class ConflictException extends Exception {
  static alreadyExists(message: string = 'Registro já existe') {
    return new ConflictException(message, {
      status: 409,
      code: 'E_ROW_ALREADY_EXISTS',
    })
  }
}
