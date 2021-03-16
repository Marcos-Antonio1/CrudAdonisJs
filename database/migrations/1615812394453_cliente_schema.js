'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments(),
      table.string('cpf',[11]),
      table.string('nome',[60]),
      table.string('email',[60]),
      table.integer('idade'),
      table.string('telefone',[15]),
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
