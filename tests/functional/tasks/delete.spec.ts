import User from '#models/user'
import TaskServices from '#services/task_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Task - Delete', async (group) => {
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

  test('should delete task successfully', async ({ client }) => {
    const response = await client
      .delete('/tasks/1')
      .header('Authorization', `Bearer ${tokenString}`)

    response.assertStatus(204)
  })

  test('should fail when task does not exist', async ({ client, assert }) => {
    const response = await client
      .delete('/tasks/2')
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
