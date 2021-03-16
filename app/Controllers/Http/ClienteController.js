'use strict'
const Cliente=use('App/Models/Cliente')
class ClienteController {
    async listarClientes({request,view}){
        const users=await Cliente.all()
        return view.render('ClientesCadastrados',{
            clientes:users.toJSON()
        })
    }
    async insertUpdate({request,response,params}){
        const dados=request.only(['cpf','email','nome','idade','telefone'])
        if(params.id){
            const cliente = await Cliente.find(params.id)
            cliente.merge(dados)
            cliente.save()
            return response.route('lista')
        }else{
            const user= await Cliente.create(dados)
            return response.route('lista')
        }
    }
    async delete({params,response}){
        const cliente= await Cliente.find(params.id)
        await cliente.delete()
        return response.route('lista')
    }
    async viewCliente({params,view}){
        const cliente= await Cliente.find(params.id)
        return view.render('FormCadastroClientes',{
            usuario:cliente
        })
    }
}
module.exports = ClienteController
