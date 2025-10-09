import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Get By E-mail: Invalid', (group) => {
  let userServices: UserServices
  let tokenString: string

  group.setup(() => {
    userServices = new UserServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    const user = await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })

    const accessToken = await User.accessTokens.create(user)
    tokenString = accessToken.value!.release()
  })

  test('should fail when e-mail is invalid', async ({ assert, client }) => {
    const response = await client
      .get('/users/email')
      .qs({ email: 'errado@gmail.com' })
      .header('Authorization', `Bearer ${tokenString}`)

    response.assertStatus(422)

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O campo E-MAIL não possui registro']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })
})
