import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('entity').notNullable()
      table.integer('entity_id').notNullable()

      table.string('action').notNullable()

      table.string('field').nullable()
      table.string('old_value').nullable()
      table.string('new_value').nullable()

      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
