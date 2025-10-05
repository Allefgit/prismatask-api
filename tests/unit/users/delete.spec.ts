import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User - Delete', async (group) => {
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

  test('should delete user successfully', async ({ assert }) => {
    await assert.doesNotReject(
      () =>
        userServices.deleteUser({
          id: 1,
          email: 'teste@gmail.com',
          password: 'Teste123',
        }),
      'Credenciais Incorretas'
    )
  })

  test('should fail when the ID is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.deleteUser({
          id: 2,
          email: 'teste@gmail.com',
          password: 'Teste123',
        }),
      'Usuário não encontrado'
    )
  })

  test('should fail when the password is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.deleteUser({
          id: 1,
          email: 'teste@gmail.com',
          password: 'SenhaErrada',
        }),
      'Credenciais Incorretas'
    )
  })

  test('should fail when the e-mail is incorrect', async ({ assert }) => {
    await assert.rejects(
      () =>
        userServices.deleteUser({
          id: 1,
          email: 'email.errado@gmail.com',
          password: 'Teste123',
        }),
      'Credenciais Incorretas'
    )
  })
})
