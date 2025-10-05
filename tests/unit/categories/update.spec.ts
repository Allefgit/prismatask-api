import CategoryServices from '#services/category_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Categories - Update', (group) => {
  let categoryServices: CategoryServices
  let userServices: UserServices

  group.setup(() => {
    categoryServices = new CategoryServices()
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

    await categoryServices.createCategory({
      userId: 1,
      name: 'Teste',
    })
  })

  test('should update a category successfully', async ({ assert }) => {
    const category = await categoryServices.updateCategory({
      id: 1,
      userId: 1,
      name: 'Teste alterado',
    })

    assert.isTrue(category.id === 1 && category.name === 'Teste alterado')
  })

  test('should fail when category dosent exist', async ({ assert }) => {
    await assert.rejects(
      () =>
        categoryServices.updateCategory({
          id: 2,
          userId: 1,
          name: 'Teste alterado',
        }),
      'Categoria não encontrada'
    )
  })
})
