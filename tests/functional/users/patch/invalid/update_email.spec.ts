import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Patch E-mail: Invalid', (group) => {
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
      .patch('/users/email')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        email: 'emailInvalido',
        password: 'Teste123',
      })

    response.assertStatus(422)

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O valor não é um email válido']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })

  test('should fail when email is already in use', async ({ assert, client }) => {
    const response = await client
      .patch('/users/email')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        email: 'teste@gmail.com',
        password: 'Teste123',
      })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O campo E-MAIL já está vinculado em outro registro']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })

  test('should fail when password has less than 8 characters', async ({ assert, client }) => {
    const response = await client
      .patch('/users/email')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        email: 'emailValido@gmail.com',
        password: 'teste',
      })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O campo SENHA deve ter no mínimo 8 caracteres']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a: string, b: string) => a.localeCompare(b))
    )
  })
})
