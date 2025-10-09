import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Task - Post: Success', async (group) => {
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

  test('should create task successfully', async ({ client }) => {
    const response = await client
      .post('/tasks')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        description: 'Alterado',
        priority: 'LOW',
        status: 'IN_PROGRESS',
        category: 'Manteiga',
        targetDate: new Date('2025-10-06'),
      })

    response.assertStatus(201)
  })
})
