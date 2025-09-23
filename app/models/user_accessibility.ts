import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class UserAccessibility extends BaseModel {
  @column({ isPrimary: true })
  declare id: number | null

  @column()
  declare font_size: number | null

  @column()
  declare font_type: string | null

  @column()
  declare contrast: boolean | null

  @column()
  declare reading_mask: boolean | null

  @column()
  declare reading_guide: boolean | null

  @column()
  declare magnifying_glass_content: boolean | null

  @column()
  declare cursor_enlarged: boolean | null

  @column()
  declare voice_control: boolean | null

  @column()
  declare punds: boolean | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
}
