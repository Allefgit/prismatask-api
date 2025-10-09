import User from '#models/user'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Task - Post: Invalid', async (group) => {
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

  test('should fail when task status is invalid', async ({ client, assert }) => {
    const response = await client
      .post('/tasks')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        description: 'Alterado',
        priority: 'HIGH',
        status: 'errado',
        category: 'Manteiga',
        targetDate: new Date('2025-10-06'),
      })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = [
      'O status deve ser: PENDENTE, EM PROGRESSO, FINALIZADA, CANCELADA, ARQUIVADA, ATRASADA ou SOB REVISÃO',
    ]

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })

  test('should fail when task priority is invalid', async ({ client, assert }) => {
    const response = await client
      .post('/tasks')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        description: 'Alterado',
        priority: 'errado',
        status: 'IN_PROGRESS',
        category: 'Manteiga',
        targetDate: new Date('2025-10-06'),
      })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['A prioridade deve ser: ALTA, MÉDIA ou BAIXA']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })

  test('should fail when task data is invalid', async ({ client, assert }) => {
    const response = await client
      .post('/tasks')
      .header('Authorization', `Bearer ${tokenString}`)
      .json({
        description: '',
        priority: '',
        status: '',
        category: '',
        targetDate: new Date(''),
      })

    const { errors } = response.body()
    assert.lengthOf(errors, 5)

    const expectedMessages = [
      'O campo CATEGORIA é obrigatório',
      'O campo DATA ALVO é obrigatório',
      'O campo DESCRIÇÃO é obrigatório',
      'O campo PRIORIDADE é obrigatório',
      'O campo STATUS é obrigatório',
    ]
    const returnedMessages = errors.map((error: any) => error.message)
    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a: string, b: string) => a.localeCompare(b))
    )
  })
})
