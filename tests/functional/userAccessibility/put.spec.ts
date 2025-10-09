import User from '#models/user'
import UserAccessibilityServices from '#services/user_accessibility_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User Accessibility - Put', async (group) => {
  let userServices: UserServices
  let tokenString: string
  let userAccessibilityServices: UserAccessibilityServices

  group.setup(() => {
    userServices = new UserServices()
    userAccessibilityServices = new UserAccessibilityServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    const user = await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })

    await userAccessibilityServices.createUserAccessibility({
      userId: user.id,
      fontSize: 12,
    })

    const accessToken = await User.accessTokens.create(user)
    tokenString = accessToken.value!.release()
  })

  test('should create update accessibility successfully', async ({ client }) => {
    const response = await client
      .put('/userAccessibility')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        fontSize: 14,
      })

    response.assertStatus(201)
  })
})
