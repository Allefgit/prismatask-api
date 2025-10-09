import User from '#models/user'
import TaskServices from '#services/task_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Task - Put: Success', async (group) => {
  let userServices: UserServices
  let tokenString: string
  let taskServices: TaskServices

  group.setup(() => {
    userServices = new UserServices()
    taskServices = new TaskServices()
  })

  group.each.setup(() => testUtils.db().withGlobalTransaction())

  group.each.setup(async () => {
    const user = await userServices.createUser({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      confirmPassword: 'Teste123',
      password: 'Teste123',
    })

    await taskServices.createTask({
      userId: user.id,
      category: 'Teste',
      description: 'Teste',
      priority: 'LOW',
      status: 'IN_PROGRESS',
      targetDate: new Date('2025-10-06'),
    })

    const accessToken = await User.accessTokens.create(user)
    tokenString = accessToken.value!.release()
  })

  test('should update task successfully', async ({ client }) => {
    const response = await client
      .put('/tasks/1')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        description: 'Alterado',
        priority: 'HIGH',
        status: 'OVERDUE',
        category: 'Manteiga',
      })

    response.assertStatus(200)
  })
})
