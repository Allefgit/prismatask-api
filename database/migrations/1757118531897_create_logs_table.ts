import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('action').notNullable()

      table.string('old_value').nullable()
      table.string('new_value').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())

      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')

      table.integer('task_id').notNullable().unsigned().references('tasks.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
