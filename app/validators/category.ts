import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .toUpperCase()
      .trim()
      .unique(async (db, value) => {
        const category = await db.from('categories').where('name', value).first()
        return !category
      }),
  })
)

export const updateCategoryBodyValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .toUpperCase()
      .trim()
      .exists(async (db, value) => {
        const category = await db.from('categories').where('name', value).first()
        return !category
      }),
  })
)

export const updateCategoryParamsValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const category = await db.from('categories').where('id', value).first()
      return !!category
    }),
  })
)

export const getCategoryByNameValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .toUpperCase()
      .trim()
      .exists(async (db, value) => {
        const category = await db.from('categories').where('name', value).first()
        return !!category
      }),
  })
)

export const getCategoryByIdValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const category = await db.from('categories').where('id', value).first()
      return !!category
    }),
  })
)

export const deleteCategoryValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const category = await db.from('categories').where('id', value).first()
      return !!category
    }),
  })
)
