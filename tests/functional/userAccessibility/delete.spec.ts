import User from '#models/user'
import UserAccessibilityServices from '#services/user_accessibility_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User Accessibility - Delete', async (group) => {
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

  test('should delete user accessibility successfully', async ({ client }) => {
    const response = await client
      .delete('/userAccessibility/1')
      .header('Authorization', `Bearer ${tokenString}`)

    response.assertStatus(200)
  })

  test('should fail user accessibility does not exist', async ({ client, assert }) => {
    const response = await client
      .delete('/userAccessibility/2')
      .header('Authorization', `Bearer ${tokenString}`)

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O campo IDENTIFICADOR não possui registro']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })
})
