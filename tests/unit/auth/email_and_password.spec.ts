import AuthServices from '#services/auth_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Categories - Create', (group) => {
  let authServices: AuthServices
  let userServices: UserServices

  group.setup(() => {
    authServices = new AuthServices()
    userServices = new UserServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    await userServices.createUser({
      name: 'Teste',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })
  })

  test('should create a category successfully', async ({ assert }) => {
    const user = await authServices.loginWithEmail({
      email: 'teste@gmail.com',
      password: 'Teste123',
    })

    assert.isTrue(user.id === 1 && user.name === 'Teste')
  })

  test('should fail when email is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        authServices.loginWithEmail({
          email: 'email.errado@gmail.com',
          password: 'Teste123',
        }),
      'Usuário não encontrada'
    )
  })

  test('should fail when password is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        authServices.loginWithEmail({
          email: 'teste@gmail.com',
          password: 'SenhaErrada',
        }),
      'Credenciais inválidas'
    )
  })
})
