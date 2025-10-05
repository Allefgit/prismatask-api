import TaskServices from '#services/task_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Tasks - Delete', (group) => {
  let taskServices: TaskServices
  let userServices: UserServices

  group.setup(() => {
    taskServices = new TaskServices()
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

    await taskServices.createTask({
      userId: 1,
      category: 'Teste',
      description: 'Testando',
      priority: 'HIGH',
      status: 'PENDING',
      targetDate: new Date('2025-10-06'),
    })
  })

  test('should delete task successfully', async ({ assert }) => {
    await assert.doesNotReject(
      () =>
        taskServices.deleteTask({
          userId: 1,
          id: 1,
        }),
      'Tarefa não encontrada'
    )
  })

  test('should fail when there is not task', async ({ assert }) => {
    await assert.rejects(
      () =>
        taskServices.deleteTask({
          userId: 1,
          id: 2,
        }),
      'Tarefa não encontrada'
    )
  })
})
