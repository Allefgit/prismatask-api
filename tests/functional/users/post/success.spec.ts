import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users - Post: Success', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should create a user successfully', async ({ assert, client }) => {
    const response = await client.post('/users').json({
      name: 'Teste Testado',
      email: 'teste@gmail.com',
      password: 'Teste123',
      confirmPassword: 'Teste123',
    })

    response.assertStatus(201)
    assert.equal(response.body().email, 'teste@gmail.com')
  })
})
