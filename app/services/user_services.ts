import NotFoundException from '#exceptions/not_found_exception'
import ValidationException from '#exceptions/validation_exception'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

interface CreateUserData {
  email: string
  password: string
  confirmPassword: string
  name: string
}

interface UpdateUserNameData {
  id: number
  name: string
}

interface UpdateUserEmailData {
  id: number
  email: string
  password: string
}

interface UpdatePasswordData {
  id: number
  oldPassword: string
  newPassword: string
}

interface DeleteUserData {
  id: number
  email: string
  password: string
}

export default class UserServices {
  async createUser({ name, email, password, confirmPassword }: CreateUserData) {
    if (confirmPassword !== password) {
      throw new ValidationException('A Senha e a Confirmação devem ser idênticas!')
    }

    const user = new User()

    user.name = name
    user.email = email
    user.passwordHash = await hash.make(password)

    await user.save()
    return user
  }

  async updateUserName({ id, name }: UpdateUserNameData) {
    const user = await User.findBy('id', id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    user.name = name
    user.updatedAt = DateTime.now()

    user.save()
    return user
  }

  async updateUserEmail({ id, email, password }: UpdateUserEmailData) {
    const user = await User.findBy('id', id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const isPasswordCorrect = await hash.verify(user.passwordHash!, password)
    if (!isPasswordCorrect) {
      throw new ValidationException('Senha incorreta')
    }

    user.email = email

    user.save()
    user.updatedAt = DateTime.now()
    return user
  }

  async updateUserPassword({ id, oldPassword, newPassword }: UpdatePasswordData) {
    const user = await User.findBy('id', id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const isPasswordCorrect = await hash.verify(user.passwordHash!, oldPassword)
    if (!isPasswordCorrect) {
      throw new ValidationException('Senha incorreta')
    }

    user.passwordHash = await hash.make(newPassword)
    user.updatedAt = DateTime.now()
    user.save()

    return user
  }

  async deleteUser({ id, email, password }: DeleteUserData) {
    const user = await User.findBy('id', id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const isPasswordCorrect = await hash.verify(user.passwordHash!, password)
    const isEmailCorrect = user.email === email

    if (!(isPasswordCorrect || isEmailCorrect)) {
      throw new ValidationException('Credenciais Incorretas')
    }

    await user.delete()
  }

  async getUserById(id: number) {
    const user = await User.findBy('id', id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  async getUserByEmail(email: string) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }
}
