import CategoryServices from '#services/category_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Categories - Create', (group) => {
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
  })

  test('should create a category successfully', async ({ assert }) => {
    const category = await categoryServices.createCategory({
      userId: 1,
      name: 'Teste',
    })

    assert.isTrue(category.id === 1 && category.name === 'Teste')
  })

  test('should fail when category exists', async ({ assert }) => {
    await categoryServices.createCategory({
      userId: 1,
      name: 'Teste',
    })

    await assert.rejects(
      () =>
        categoryServices.createCategory({
          userId: 1,
          name: 'Teste',
        }),
      'Categoria já cadastrada'
    )
  })
})
