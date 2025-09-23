import Category from '#models/category'
import { DateTime } from 'luxon'

interface CreateCategoryData {
  name: string
}

interface UpdateCategoryData {
  id: number
  name: string
}

export default class CategoryServices {
  async createCategory({ name }: CreateCategoryData) {
    const category = await Category.create({ name })
    return category
  }

  async updateCategory({ id, name }: UpdateCategoryData) {
    const category = await Category.findByOrFail('id', id)
    category.name = name
    category.updatedAt = DateTime.now()

    await category.save()
    return category
  }

  async getById(id: number) {
    const category = await Category.findByOrFail('id', id)
    return category
  }

  async getByName(name: string) {
    const category = await Category.findByOrFail('name', name)
    return category
  }

  async deleteCategory(id: number) {
    const category = await Category.findByOrFail('id', id)

    await category.delete()
  }

  async verifyAndCreateCategory(name: string) {
    const categoryByName = await Category.findBy('name', name)
    if (categoryByName) return categoryByName

    const category = await Category.create({ name })
    return category
  }
}
