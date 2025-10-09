import CategoryServices from '#services/category_services'
import {
  createCategoryValidator,
  getCategoryByIdValidator,
  getCategoryByNameValidator,
  updateCategoryBodyValidator,
} from '#validators/category_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  private readonly categoryServices: CategoryServices

  constructor() {
    this.categoryServices = new CategoryServices()
  }

  async create({ request, response, auth }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()
    const { categoryName: name } = await request.validateUsing(createCategoryValidator)
    const category = await this.categoryServices.createCategory({ name, userId })

    return response.created(category)
  }

  async update({ params, request, response, auth }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()

    const { id } = await request.validateUsing(getCategoryByIdValidator, {
      data: params,
    })
    const { categoryName: name } = await request.validateUsing(updateCategoryBodyValidator)

    const category = await this.categoryServices.updateCategory({ id, name, userId })

    return response.ok(category)
  }

  async getById({ request, params, response }: HttpContext) {
    const { id } = await request.validateUsing(getCategoryByIdValidator, {
      data: params,
    })
    const category = await this.categoryServices.getById(id)

    return response.ok(category)
  }

  async getByName({ params, request, response }: HttpContext) {
    const { categoryName: name } = await request.validateUsing(getCategoryByNameValidator, {
      data: params.name,
    })
    const category = await this.categoryServices.getByName(name)

    return response.ok(category)
  }

  async delete({ params, request, response, auth }: HttpContext) {
    const { id: userId } = auth.getUserOrFail()
    const { id } = await request.validateUsing(getCategoryByIdValidator, {
      data: params,
    })
    await this.categoryServices.deleteCategory({ id, userId })

    return response.noContent()
  }
}
