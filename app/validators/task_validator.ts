import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    description: vine.string().trim(),
    especification: vine.string().trim().optional(),
    category: vine.string().trim(),
    priority: vine.enum(['HIGH', 'MEDIUM', 'LOW']),

    targetDate: vine.date({
      formats: {
        utc: true,
      },
    }),

    status: vine.enum([
      'PENDING',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'ARCHIVED',
      'OVERDUE',
      'UNDER_REVIEW',
    ]),
  })
)

export const updateTaskParamsValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const task = await db.from('tasks').where('id', value).first()
      return !!task
    }),
  })
)

export const updateTaskBodyValidator = vine.compile(
  vine.object({
    description: vine.string().trim().optional(),
    especification: vine.string().nullable().optional(),
    priority: vine.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
    category: vine.string().trim().optional(),

    targetDate: vine
      .date({
        formats: {
          utc: true,
        },
      })
      .optional(),

    status: vine
      .enum([
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED',
        'ARCHIVED',
        'OVERDUE',
        'UNDER_REVIEW',
      ])
      .optional(),
  })
)

export const getTasksByUserIdValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
  })
)

export const getTaskByIdValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const task = await db.from('tasks').where('id', value).first()
      return !!task
    }),
  })
)

export const deleteTaskValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const task = await db.from('tasks').where('id', value).first()
      return !!task
    }),
  })
)
