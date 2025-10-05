import UserAccessibilityServices from '#services/user_accessibility_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users Accessibility - Create', (group) => {
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
  })

  test('should create a user accessibility successfully', async ({ assert }) => {
    const userAccessibility = await userAccessibilityServices.createUserAccessibility({
      userId: 1,
      fontSize: 12,
    })

    assert.isTrue(userAccessibility.id === 1 && userAccessibility.font_size === 12)
  })

  test('should fail when there is not user created', async ({ assert }) => {
    await assert.rejects(
      () =>
        userAccessibilityServices.createUserAccessibility({
          userId: 2,
        }),
      'Usuário não encontrado'
    )
  })

  test('should fail when there is user accessibility created yet', async ({ assert }) => {
    await userAccessibilityServices.createUserAccessibility({
      userId: 1,
      fontSize: 12,
    })

    await assert.rejects(
      () =>
        userAccessibilityServices.createUserAccessibility({
          userId: 1,
        }),
      'Esse usuário já possui opções de acessibilidade'
    )
  })
})
