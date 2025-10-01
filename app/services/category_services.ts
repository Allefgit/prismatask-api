import ConflictException from '#exceptions/conflict_exception'
import NotFoundException from '#exceptions/not_found_exception'
import Category from '#models/category'
import { DateTime } from 'luxon'
import LogServices from './log_services.js'

interface CreateCategoryData {
  name: string
  userId: number
}

interface UpdateCategoryData {
  id: number
  name: string
  userId: number
}

interface DeleteCategoryData {
  id: number
  userId: number
}

export default class CategoryServices {
  async createCategory({ userId, name }: CreateCategoryData) {
    const verifyCategory = await Category.findBy('name', name)
    if (verifyCategory) {
      throw new ConflictException('Categoria já cadastrada')
    }

    const category = await Category.create({ name })

    const logServices = new LogServices()
    await logServices.createLog({
      action: 'CREATE',
      entity: 'CATEGORY',
      entityId: category.id,
      userId,
    })

    return category
  }

  async updateCategory({ id, name, userId }: UpdateCategoryData) {
    const category = await Category.findBy('id', id)
    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    const oldValue = category.name

    category.name = name
    category.updatedAt = DateTime.now()

    await category.save()
    const logServices = new LogServices()

    await logServices.createLog({
      action: 'UPDATE',
      entity: 'CATEGORY',
      entityId: category.id,
      userId,
      field: 'NAME',
      oldValue,
      newValue: category.name,
    })

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

  async deleteCategory({ userId, id }: DeleteCategoryData) {
    const category = await Category.findBy('id', id)
    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    const logServices = new LogServices()
    await logServices.createLog({
      action: 'DELETE',
      entity: 'CATEGORY',
      entityId: id,
      oldValue: category.name,
      userId,
    })

    await category.delete()
  }

  async verifyAndCreateCategory({ name, userId }: CreateCategoryData) {
    const categoryByName = await Category.findBy('name', name)
    if (categoryByName) return categoryByName

    const category = await Category.create({ name })
    const logServices = new LogServices()
    await logServices.createLog({
      action: 'CREATE',
      entity: 'CATEGORY',
      entityId: category.id,
      userId,
    })
    return category
  }
}
