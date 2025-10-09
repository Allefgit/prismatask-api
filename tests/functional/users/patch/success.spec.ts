import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Patch: Success', async (group) => {
  let userServices: UserServices
  let tokenString: string

  group.setup(() => {
    userServices = new UserServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    const user = await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })

    const accessToken = await User.accessTokens.create(user)
    tokenString = accessToken.value!.release()
  })

  test('should update a user name successfully', async ({ client }) => {
    const response = await client
      .patch('/users/name')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        name: 'Teste Alterado',
      })

    response.assertStatus(200)
    response.assertBodyContains({ name: 'Teste Alterado' })
  })

  test('should update a user email successfully', async ({ client }) => {
    const response = await client
      .patch('/users/email')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        email: 'novoemail@gmail.com',
        password: 'Teste123',
      })

    response.assertStatus(200)
    response.assertBodyContains({ email: 'novoemail@gmail.com' })
  })

  test('should update a user password successfully', async ({ client }) => {
    const response = await client
      .patch('/users/password')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        newPassword: 'SenhaTrocada',
        oldPassword: 'Teste123',
      })

    response.assertStatus(204)
  })
})
