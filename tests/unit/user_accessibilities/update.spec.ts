import UserAccessibilityServices from '#services/user_accessibility_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users Accessibility - Update', (group) => {
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

  test('should update a user accessibility successfully', async ({ assert }) => {
    const userAccessibility = await userAccessibilityServices.updateUserAccessibility({
      userId: 1,
      fontSize: 14,
    })

    assert.isTrue(userAccessibility.id === 1 && userAccessibility.font_size !== 12)
  })

  test('should fail when there is not user created', async ({ assert }) => {
    await assert.rejects(
      () =>
        userAccessibilityServices.updateUserAccessibility({
          userId: 2,
          fontSize: 14,
        }),
      'Usuário não encontrado'
    )
  })

  test('should fail when there is not user accessibility created yet', async ({ assert }) => {
    await userAccessibilityServices.deleteUserAccessibility({ id: 1, userId: 1 })

    await assert.rejects(
      () =>
        userAccessibilityServices.updateUserAccessibility({
          userId: 1,
          fontSize: 14,
        }),
      'O usuário não possui configurações de acessibilidade'
    )
  })
})
