import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User - Get By Id', async (group) => {
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

  test('should find user successfully', async ({ assert }) => {
    const user = await userServices.getUserById(1)

    assert.isTrue(user.id === 1 && user.email === 'teste@gmail.com')
  })

  test('should fail when the ID is incorrect', async ({ assert }) => {
    await assert.rejects(() => userServices.getUserById(2), 'Usuário não encontrado')
  })
})
