import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User - Update name', async (group) => {
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

  test('should update the username successfully', async ({ assert }) => {
    const user = await userServices.updateUserName({
      id: 1,
      name: 'Teste Alterado',
    })

    assert.isTrue(user.name === 'Teste Alterado')
  })

  test('should fail when the ID is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.updateUserName({
          id: 2,
          name: 'Teste Alterado',
        }),
      'Usuário não encontrado'
    )
  })
})
