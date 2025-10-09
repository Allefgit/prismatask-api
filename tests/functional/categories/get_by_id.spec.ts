import User from '#models/user'
import CategoryServices from '#services/category_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Category - Get By Id', async (group) => {
  let userServices: UserServices
  let tokenString: string
  let categoryServices: CategoryServices

  group.setup(() => {
    userServices = new UserServices()
    categoryServices = new CategoryServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    const user = await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })

    await categoryServices.createCategory({
      name: 'TESTE',
      userId: user.id,
    })

    const accessToken = await User.accessTokens.create(user)
    tokenString = accessToken.value!.release()
  })

  test('should get category successfully', async ({ client }) => {
    const response = await client
      .get('/categories/1')
      .header('Authorization', `Bearer ${tokenString}`)

    response.assertStatus(200)
  })

  test('should fail when category does not exist', async ({ client, assert }) => {
    const response = await client
      .get('/categories/2')
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
