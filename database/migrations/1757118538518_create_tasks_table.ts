import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description').notNullable()
      table.string('especification').nullable()
      table.string('priority').notNullable().defaultTo('MEDIUM')
      table.string('status').notNullable()
      table.string('target_date').notNullable()

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()

      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
      table.integer('category_id').nullable().unsigned().references('categories.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
