import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Post: Invalid', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should fail when required fields are missing', async ({ assert, client }) => {
    const response = await client.post('/users').json({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    response.assertStatus(422)

    const { errors } = response.body()
    assert.lengthOf(errors, 4)

    const expectedMessages = [
      'O campo E-MAIL é obrigatório',
      'O campo SENHA é obrigatório',
      'O campo CONFIRMAÇÃO DA SENHA é obrigatório',
      'O campo NOME é obrigatório',
    ]
    const returnedMessages = errors.map((error: any) => error.message)
    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a: string, b: string) => a.localeCompare(b))
    )
  })

  test('should fail when email is already in use', async ({ assert, client }) => {
    await client.post('/users').json({
      name: 'User One',
      email: 'teste@gmail.com',
      password: 'Teste123',
      confirmPassword: 'Teste123',
    })

    const response = await client.post('/users').json({
      name: 'User Two',
      email: 'teste@gmail.com',
      password: 'Senha123',
      confirmPassword: 'Senha123',
    })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)

    const expectedMessages = ['O campo E-MAIL já está vinculado em outro registro']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })

  test('should fail when email format is invalid', async ({ assert, client }) => {
    const response = await client.post('/users').json({
      name: 'User Invalid',
      email: 'email_invalido',
      password: 'Senha123',
      confirmPassword: 'Senha123',
    })

    const body = response.body()
    const returnedMessages = body.errors.map((e: any) => e.message)
    const expectedMessages = ['O valor não é um email válido']

    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a, b) => a.localeCompare(b))
    )
  })

  test('should fail when password has less than 8 characters', async ({ assert, client }) => {
    const response = await client.post('/users').json({
      name: 'User Short Password',
      email: 'shortpass@gmail.com',
      password: '1234567',
      confirmPassword: '1234567',
    })

    const { errors } = response.body()
    assert.lengthOf(errors, 2)

    const expectedMessages = [
      'O campo SENHA deve ter no mínimo 8 caracteres',
      'O campo CONFIRMAÇÃO DA SENHA deve ter no mínimo 8 caracteres',
    ]
    const returnedMessages = errors.map((error: any) => error.message)
    assert.deepEqual(
      returnedMessages.toSorted((a: string, b: string) => a.localeCompare(b)),
      expectedMessages.toSorted((a: string, b: string) => a.localeCompare(b))
    )
  })
})
