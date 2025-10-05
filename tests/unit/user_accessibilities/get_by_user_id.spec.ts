import UserAccessibilityServices from '#services/user_accessibility_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users Accessibility - Get By User Id', (group) => {
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
    const userAccessibility = await userAccessibilityServices.getUserAccessibilityByUserId(1)

    assert.isTrue(userAccessibility.id === 1 && userAccessibility.font_size === 12)
  })

  test('should fail when there is not user accessibility created', async ({ assert }) => {
    await userAccessibilityServices.deleteUserAccessibility({ id: 1, userId: 1 })

    await assert.rejects(
      () => userAccessibilityServices.getUserAccessibilityByUserId(1),
      'Esse usuário não possui opções de acessibilidade'
    )
  })

  test('should fail when there is not user created', async ({ assert }) => {
    await assert.rejects(
      () => userAccessibilityServices.getUserAccessibilityByUserId(2),
      'Usuário não encontrado'
    )
  })
})
