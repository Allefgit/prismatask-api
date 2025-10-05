import AuthServices from '#services/auth_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { OAuth2Client } from 'google-auth-library'

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

  const mockVerifyIdToken = async () => ({
    getPayload: () => ({
      sub: 'google-1234567890',
      email: 'mockuser@gmail.com',
      name: 'Mock User',
    }),
  })

  test('should create a category successfully', async ({ assert }) => {
    OAuth2Client.prototype.verifyIdToken = mockVerifyIdToken as any

    const user = await authServices.loginWithGoogle('fake-id-token')

    assert.exists(user.id)
    assert.equal(user.email, 'mockuser@gmail.com')
    assert.equal(user.name, 'Mock User')
  })
})
