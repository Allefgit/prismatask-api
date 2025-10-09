import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Patch Password: Invalid', (group) => {
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

  test('should fail when password has less than 8 characters', async ({ assert, client }) => {
    const response = await client
      .patch('/users/password')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        oldPassword: 'Teste',
        newPassword: 'Teste',
      })

    const { errors } = response.body()
    assert.lengthOf(errors, 2)

    const expectedMessages = [
      'O campo NOVA SENHA deve ter no mínimo 8 caracteres',
      'O campo SENHA ANTIGA deve ter no mínimo 8 caracteres',
    ]
    const returnedMessages = errors.map((error: any) => error.message)
    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a: string, b: string) => a.localeCompare(b))
    )
  })
})
