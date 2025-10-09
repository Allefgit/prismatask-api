import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Category - Post', async (group) => {
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

  test('should create category successfully', async ({ client }) => {
    const response = await client
      .post('/categories')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        categoryName: 'Teste Alterado',
      })

    response.assertStatus(201)
  })

  test('should fail when category already exists', async ({ client, assert }) => {
    await client.post('/categories').header('Authorization', `Bearer ${tokenString}`).json({
      name: 'Teste',
    })

    const response = await client
      .post('/categories')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        name: 'Teste',
      })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O campo CATEGORIA é obrigatório']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })
})
