import ConflictException from '#exceptions/conflict_exception'
import NotFoundException from '#exceptions/not_found_exception'
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
    const verifyCategory = await Category.findBy('name', name)
    if (verifyCategory) {
      throw new ConflictException('Categoria já cadastrada')
    }

    const category = await Category.create({ name })
    return category
  }

  async updateCategory({ id, name }: UpdateCategoryData) {
    const category = await Category.findBy('id', id)
    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    category.name = name
    category.updatedAt = DateTime.now()

    await category.save()
    return category
  }

  async getById(id: number) {
    const category = await Category.findBy('id', id)
    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }
    return category
  }

  async getByName(name: string) {
    const category = await Category.findBy('name', name)
    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }
    return category
  }

  async deleteCategory(id: number) {
    const category = await Category.findBy('id', id)
    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    await category.delete()
  }

  async verifyAndCreateCategory(name: string) {
    const categoryByName = await Category.findBy('name', name)
    if (categoryByName) return categoryByName

    const category = await Category.create({ name })
    return category
  }
}
