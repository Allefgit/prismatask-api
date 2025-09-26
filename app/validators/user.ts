import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .toLowerCase()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),

    password: vine.string().minLength(8).trim(),
    confirmPassword: vine.string().minLength(8).trim(),
    name: vine
      .string()
      .trim()
      .transform((value) => {
        return value
          .toLowerCase()
          .split(' ')
          .filter((name) => name.length > 0)
          .map((name) => name[0].toUpperCase() + name.slice(1))
          .join(' ')
      }),
  })
)

export const updateUserNameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .transform((value) => {
        return value
          .toLowerCase()
          .split(' ')
          .filter((name) => name.length > 0)
          .map((name) => name[0].toUpperCase() + name.slice(1))
          .join(' ')
      }),
  })
)

export const updateUserEmailValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .toLowerCase()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),

    password: vine.string().minLength(8).trim(),
  })
)

export const updateUserPasswordValidator = vine.compile(
  vine.object({
    oldPassword: vine.string().minLength(8).trim(),
    newPassword: vine.string().minLength(8).trim(),
  })
)

export const deleteUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .toLowerCase()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !!user
      }),

    password: vine.string().minLength(8).trim(),
  })
)

export const getUserByIdValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
  })
)

export const getUserByEmailValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .toLowerCase()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !!user
      }),
  })
)
