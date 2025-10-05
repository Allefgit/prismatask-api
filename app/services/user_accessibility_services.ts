import ConflictException from '#exceptions/conflict_exception'
import NotFoundException from '#exceptions/not_found_exception'
import User from '#models/user'
import UserAccessibility from '#models/user_accessibility'
import { DateTime } from 'luxon'
import AuditHelper from '../utilities/audit_helper.js'
import LogServices from './log_services.js'

interface UserAccessibilityData {
  userId: number
  fontSize?: number | null
  fontType?: string | null
  contrast?: boolean | null
  readingMask?: boolean | null
  readingGuide?: boolean | null
  magnifyingGlassContent?: boolean | null
  cursorEnlarged?: boolean | null
  voiceControl?: boolean | null
  punds?: boolean | null
}

interface DeleteAccessibilityData {
  id: number
  userId: number
}

export default class UserAccessibilityServices {
  async createUserAccessibility({
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
  }: UserAccessibilityData) {
    const user = await User.findBy('id', userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const isUserAccessibilityAlreadyCreated = await UserAccessibility.findBy('user_id', user.id)
    if (isUserAccessibilityAlreadyCreated) {
      throw new ConflictException('Esse usuário já possui opções de acessibilidade')
    }

    const userAccessibility = await UserAccessibility.create({
      userId: user.id,
      contrast: contrast ?? null,
      cursor_enlarged: cursorEnlarged ?? null,
      font_size: fontSize ?? null,
      font_type: fontType ?? null,
      magnifying_glass_content: magnifyingGlassContent ?? null,
      punds: punds ?? null,
      reading_guide: readingGuide ?? null,
      reading_mask: readingMask ?? null,
      voice_control: voiceControl ?? null,
    })

    const logServices = new LogServices()
    await logServices.createLog({
      action: 'CREATE',
      entity: 'USER_ACCESSIBILITY',
      entityId: userAccessibility.id!,
      userId,
    })

    return userAccessibility
  }

  async updateUserAccessibility({
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
  }: UserAccessibilityData) {
    const user = await User.findBy('id', userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const userAccessibility = await UserAccessibility.findBy('user_id', user.id)
    if (!userAccessibility) {
      throw new NotFoundException('O usuário não possui configurações de acessibilidade')
    }

    const oldTask = userAccessibility.toJSON()

    userAccessibility.userId = user.id
    userAccessibility.contrast = contrast ?? null
    userAccessibility.cursor_enlarged = cursorEnlarged ?? null
    userAccessibility.font_size = fontSize ?? null
    userAccessibility.font_type = fontType ?? null
    userAccessibility.magnifying_glass_content = magnifyingGlassContent ?? null
    userAccessibility.punds = punds ?? null
    userAccessibility.reading_guide = readingGuide ?? null
    userAccessibility.reading_mask = readingMask ?? null
    userAccessibility.voice_control = voiceControl ?? null
    userAccessibility.updatedAt = DateTime.now()

    await userAccessibility.save()

    await AuditHelper.logChanges(
      'USER_ACCESSIBILITY',
      userAccessibility.id!,
      userId,
      oldTask,
      userAccessibility.toJSON()
    )

    return userAccessibility
  }

  async getUserAccessibilityByUserId(userId: number) {
    const user = await User.findBy('id', userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }
    const userAccessibility = await UserAccessibility.findBy('userId', user.id)
    if (!userAccessibility) {
      throw new NotFoundException('Esse usuário não possui opções de acessibilidade')
    }

    return userAccessibility
  }

  async getUserAccessibilityById(id: number) {
    const userAccessibility = await UserAccessibility.findBy('id', id)
    if (!userAccessibility) {
      throw new NotFoundException('Esse usuário não possui opções de acessibilidade')
    }

    return userAccessibility
  }

  async deleteUserAccessibility({ id, userId }: DeleteAccessibilityData) {
    const userAccessibility = await UserAccessibility.findBy('id', id)
    if (!userAccessibility) {
      throw new NotFoundException('Esse usuário não possui opções de acessibilidade')
    }

    const logServices = new LogServices()
    await logServices.createLog({
      action: 'DELETE',
      entity: 'USER_ACCESSIBILITY',
      entityId: id,
      userId,
    })

    await userAccessibility.delete()
  }
}
