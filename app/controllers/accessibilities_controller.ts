import UserAccessibilityServices from '#services/user_accessibility_services'
import {
  createUserAccessibilityValidator,
  deleteUserAccessibilityValidator,
  getUserAccessibilityByIdValidator,
  updateUserAccessibilityValidator,
} from '#validators/user_accessibility_validator'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccessibilitiesController {
  private readonly userAccessibilityServices: UserAccessibilityServices

  constructor() {
    this.userAccessibilityServices = new UserAccessibilityServices()
  }

  async create({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      throw new Exception('Logue novamente')
    }

    const { id: userId } = auth.user
    const {
      contrast,
      cursorEnlarged,
      fontSize,
      fontType,
      magnifyingGlassContent,
      punds,
      readingGuide,
      readingMask,
      voiceControl,
    } = await request.validateUsing(createUserAccessibilityValidator)

    const userAccessibility = await this.userAccessibilityServices.createUserAccessibility({
      userId,
      contrast,
      cursorEnlarged,
      fontSize,
      fontType,
      magnifyingGlassContent,
      punds,
      readingGuide,
      readingMask,
      voiceControl,
    })

    return response.created(userAccessibility)
  }

  async update({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      throw new Exception('Logue novamente')
    }
    const { id: userId } = auth.user
    const {
      contrast,
      cursorEnlarged,
      fontSize,
      fontType,
      magnifyingGlassContent,
      punds,
      readingGuide,
      readingMask,
      voiceControl,
    } = await request.validateUsing(updateUserAccessibilityValidator)

    const userAccessibility = await this.userAccessibilityServices.updateUserAccessibility({
      userId,
      contrast,
      cursorEnlarged,
      fontSize,
      fontType,
      magnifyingGlassContent,
      punds,
      readingGuide,
      readingMask,
      voiceControl,
    })

    return response.created(userAccessibility)
  }

  async getById({ request, params, response }: HttpContext) {
    const { id } = await request.validateUsing(getUserAccessibilityByIdValidator, {
      data: params,
    })
    const userAccessibility = await this.userAccessibilityServices.getUserAccessibilityById(id)

    return response.ok(userAccessibility)
  }

  async getByUserId({ auth, response }: HttpContext) {
    if (!auth.user) {
      throw new Exception('Logue novamente')
    }
    const { id: userId } = auth.user

    const userAccessibility =
      await this.userAccessibilityServices.getUserAccessibilityByUserId(userId)

    return response.ok(userAccessibility)
  }

  async delete({ request, params, response }: HttpContext) {
    const { id } = await request.validateUsing(deleteUserAccessibilityValidator, {
      data: params,
    })
    await this.userAccessibilityServices.deleteUserAccessibility(id)

    return response.status(200)
  }
}
