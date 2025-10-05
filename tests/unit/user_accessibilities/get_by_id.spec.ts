import UserAccessibilityServices from '#services/user_accessibility_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users Accessibility - Get By Id', (group) => {
  let userAccessibilityServices: UserAccessibilityServices
  let userServices: UserServices

  group.setup(() => {
    userAccessibilityServices = new UserAccessibilityServices()
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

    await userAccessibilityServices.createUserAccessibility({
      userId: 1,
      fontSize: 12,
    })
  })

  test('should get user accessibility successfully', async ({ assert }) => {
    const userAccessibility = await userAccessibilityServices.getUserAccessibilityById(1)

    assert.isTrue(userAccessibility.id === 1 && userAccessibility.font_size === 12)
  })

  test('should fail when there is not user accessibility created', async ({ assert }) => {
    await assert.rejects(
      () => userAccessibilityServices.getUserAccessibilityById(2),
      'Esse usuário não possui opções de acessibilidade'
    )
  })
})
