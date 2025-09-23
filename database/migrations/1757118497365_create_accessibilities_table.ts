import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_accessibilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('font_size').nullable()
      table.string('font_type').nullable()
      table.boolean('contrast').nullable()
      table.boolean('reading_mask').nullable()
      table.boolean('reading_guide').nullable()
      table.boolean('magnifying_glass_content').nullable()
      table.boolean('cursor_enlarged').nullable()
      table.boolean('voice_control').nullable()
      table.boolean('punds').nullable()

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()

      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
