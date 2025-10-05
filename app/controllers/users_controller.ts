import UserServices from '#services/user_services'
import {
  createUserValidator,
  deleteUserValidator,
  getUserByEmailValidator,
  updateUserEmailValidator,
  updateUserNameValidator,
  updateUserPasswordValidator,
} from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  private readonly userServices: UserServices

  constructor() {
    this.userServices = new UserServices()
  }

  async create({ request, response }: HttpContext) {
    const { confirmPassword, email, name, password } =
      await request.validateUsing(createUserValidator)
    const user = await this.userServices.createUser({ confirmPassword, email, name, password })

    return response.created(user)
  }

  async updateName({ auth, request, response }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const { name } = await request.validateUsing(updateUserNameValidator)

    const user = await this.userServices.updateUserName({ id, name })
    return response.ok({ name: user.name })
  }

  async updateEmail({ auth, request, response }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const { email, password } = await request.validateUsing(updateUserEmailValidator)

    const user = await this.userServices.updateUserEmail({ id, email, password })
    return response.ok({ email: user.email })
  }

  async updatePassword({ auth, request, response }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const { newPassword, oldPassword } = await request.validateUsing(updateUserPasswordValidator)

    await this.userServices.updateUserPassword({ id, newPassword, oldPassword })
    return response.noContent()
  }

  async delete({ auth, request, response }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const { email, password } = await request.validateUsing(deleteUserValidator)

    await this.userServices.deleteUser({
      id,
      email,
      password,
    })

    return response.noContent()
  }

  async getById({ auth, response }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const user = await this.userServices.getUserById(id)

    return response.ok(user)
  }

  async getByEmail({ params, request, response }: HttpContext) {
    const { email } = await request.validateUsing(getUserByEmailValidator, {
      data: params.email,
    })
    const user = await this.userServices.getUserByEmail(email)

    return response.ok(user)
  }
}
