import User from '#models/user'
import UserAccessibility from '#models/user_accessibility'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'

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
    const user = await User.findByOrFail('id', userId)
    const isUserAccessibilityAlreadyCreated = await UserAccessibility.findBy('user_id', user.id)

    if (isUserAccessibilityAlreadyCreated) {
      throw new Exception('This user already has accessibility options')
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
    const user = await User.findByOrFail('id', userId)
    const userAccessibility = await UserAccessibility.findByOrFail('user_id', user.id)

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
    return userAccessibility
  }

  async getUserAccessibilityByUserId(userId: number) {
    const user = await User.findByOrFail('id', userId)
    const userAccessibility = await UserAccessibility.findByOrFail('userId', user.id)

    return userAccessibility
  }

  async getUserAccessibilityById(id: number) {
    const userAccessibility = await UserAccessibility.findByOrFail('id', id)
    return userAccessibility
  }

  async deleteUserAccessibility(id: number) {
    const userAccessibility = await UserAccessibility.findByOrFail('id', id)

    await userAccessibility.delete()
  }
}
