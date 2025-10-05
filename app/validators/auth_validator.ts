import vine from '@vinejs/vine'

export const loginWithGoogleValidator = vine.compile(
  vine.object({
    idToken: vine.string().trim(),
  })
)

export const loginWithEmailValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .exists(async (db, value) => {
        const user = await db.from('users').where('email', value)

        return !!user
      }),
    password: vine.string().trim().minLength(8),
  })
)
