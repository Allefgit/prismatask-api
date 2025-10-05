import TaskServices from '#services/task_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Tasks - Create', (group) => {
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
  })

  test('should create a task successfully', async ({ assert }) => {
    const task = await taskServices.createTask({
      userId: 1,
      category: 'Teste',
      description: 'Testando',
      priority: 'HIGH',
      status: 'PENDING',
      targetDate: new Date('2025-10-06'),
    })

    assert.isTrue(task.id === 1 && task.description === 'Testando')
  })

  test('should fail when there is not user created', async ({ assert }) => {
    await assert.rejects(
      () =>
        taskServices.createTask({
          userId: 2,
          category: 'Teste',
          description: 'Testando',
          priority: 'HIGH',
          status: 'PENDING',
          targetDate: new Date('2025-10-06'),
        }),
      'Usuário não encontrado'
    )
  })
})
