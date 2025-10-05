import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User - Update e-mail', async (group) => {
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

  test('should update the user email successfully', async ({ assert }) => {
    const user = await userServices.updateUserEmail({
      id: 1,
      email: 'novoemail@gmail.com',
      password: 'Teste123',
    })

    assert.isTrue(user.email === 'novoemail@gmail.com')
  })

  test('should fail when the ID is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.updateUserEmail({
          id: 2,
          email: 'novoemail@gmail.com',
          password: 'Teste123',
        }),
      'Usuário não encontrado'
    )
  })

  test('should fail when the passwords do not match', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.updateUserEmail({
          id: 1,
          email: 'novoemail@gmail.com',
          password: 'SenhaIncorreta',
        }),
      'Senha incorreta'
    )
  })
})
