import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Auth - E-mail And Password', async (group) => {
  let userServices: UserServices

  group.setup(() => {
    userServices = new UserServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })
  })

  test('should login successfully', async ({ client, assert }) => {
    const response = await client.post('/login/email').json({
      email: 'teste@gmail.com',
      password: 'Teste123',
    })

    assert.containSubset(response.body(), {
      token: {},
      user: {},
    })

    response.assertStatus(200)
  })
})
