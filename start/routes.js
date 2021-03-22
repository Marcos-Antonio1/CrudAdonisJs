'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//interação com os models
Route.get('/','ClienteController.listarClientes').as('lista')  
Route.post('/cadastrarClientes','ClienteController.insert').as('cadastrar.cliente')
Route.post('/clientes/delete/:id','ClienteController.delete').as('delete.cliente')
Route.get('/UpdateView/Cliente/:id','ClienteController.viewCliente').as ('view.cliente.update')
Route.post('/updateCliente/:id','ClienteController.update').as('update.cliente')
//renderização da view
Route.on('/formClientes').render('FormCadastroClientes').as("formulariocliente")
Route.on('/formUpdate/:id').render('upddateDataClientes').as('formUpdate')