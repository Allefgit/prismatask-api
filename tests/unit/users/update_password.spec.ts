import UserServices from '#services/user_services'
import hash from '@adonisjs/core/services/hash'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User - Update password', async (group) => {
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

  test('should update the user password successfully', async ({ assert }) => {
    const user = await userServices.updateUserPassword({
      id: 1,
      newPassword: 'SenhaAlterada',
      oldPassword: 'Teste123',
    })

    assert.isTrue(await hash.verify(user.passwordHash!, 'SenhaAlterada'))
  })

  test('should fail when the ID is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.updateUserPassword({
          id: 2,
          newPassword: 'SenhaAlterada',
          oldPassword: 'Teste123',
        }),
      'Usuário não encontrado'
    )
  })

  test('should fail when the passwords is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.updateUserPassword({
          id: 1,
          newPassword: 'SenhaAlterada',
          oldPassword: 'SenhaErrada',
        }),
      'Senha incorreta'
    )
  })
})
