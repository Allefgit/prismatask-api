import TaskServices from '#services/task_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Tasks - Update', (group) => {
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

  test('should update task successfully', async ({ assert }) => {
    const task = await taskServices.updateTask({
      id: 1,
      userId: 1,
      description: 'Teste alterado',
    })

    assert.isTrue(task.id === 1 && task.description === 'Teste alterado')
  })

  test('should fail when there is not task created', async ({ assert }) => {
    await assert.rejects(
      () =>
        taskServices.updateTask({
          id: 2,
          userId: 1,
          description: 'Teste alterado',
        }),
      'Tarefa não encontrada'
    )
  })
})
