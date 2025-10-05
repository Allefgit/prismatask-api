import CategoryServices from '#services/category_services'
import UserServices from '#services/user_services'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Categories - Verify and Create', (group) => {
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
    const category = await categoryServices.verifyAndCreateCategory({
      userId: 1,
      name: 'Teste',
    })

    assert.isTrue(category.id === 1 && category.name === 'Teste')
  })

  test('should return a category', async ({ assert }) => {
    const firstCateogy = await categoryServices.verifyAndCreateCategory({
      userId: 1,
      name: 'Teste',
    })

    const secondCategory = await categoryServices.verifyAndCreateCategory({
      userId: 1,
      name: 'Teste',
    })

    assert.isTrue(secondCategory.id === firstCateogy.id)
  })
})
