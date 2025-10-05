import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Create', (group) => {
  let userServices: UserServices

  group.setup(() => {
    userServices = new UserServices()
  })

  group.each.setup(() => testUtils.db().truncate())

  test('should create a user successfully', async ({ assert }) => {
    const user = await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })

    assert.isTrue(user.id === 1)
  })

  test('should fail when passwords do not match', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.createUser({
          name: 'Teste Testado',
          email: 'teste@gmail.com',
          confirmPassword: 'Teste123',
          password: 'SenhaErrada',
        }),
      'A Senha e a Confirmação devem ser idênticas!'
    )
  })
})
