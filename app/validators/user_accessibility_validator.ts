import vine from '@vinejs/vine'

export const createUserAccessibilityValidator = vine.compile(
  vine.object({
    fontSize: vine.number().optional(),
    fontType: vine.string().optional(),
    contrast: vine.boolean().optional(),
    readingMask: vine.boolean().optional(),
    readingGuide: vine.boolean().optional(),
    magnifyingGlassContent: vine.boolean().optional(),
    cursorEnlarged: vine.boolean().optional(),
    voiceControl: vine.boolean().optional(),
    punds: vine.boolean().optional(),
  })
)

export const updateUserAccessibilityValidator = vine.compile(
  vine.object({
    fontSize: vine.number().optional(),
    fontType: vine.string().optional(),
    contrast: vine.boolean().optional(),
    readingMask: vine.boolean().optional(),
    readingGuide: vine.boolean().optional(),
    magnifyingGlassContent: vine.boolean().optional(),
    cursorEnlarged: vine.boolean().optional(),
    voiceControl: vine.boolean().optional(),
    punds: vine.boolean().optional(),
  })
)

export const getUserAccessibilityByIdValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const userAccessibility = await db.from('user_accessibilities').where('id', value).first()
      return !!userAccessibility
    }),
  })
)

export const getUserAccessibilityByUserIdValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
  })
)

export const deleteUserAccessibilityValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const userAccessibility = await db.from('user_accessibilities').where('id', value).first()

      return !!userAccessibility
    }),
  })
)
