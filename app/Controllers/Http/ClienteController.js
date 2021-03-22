'use strict'
const Cliente=use('App/Models/Cliente')
class ClienteController  {
    async listarClientes({request,view,response}){
        let Search=request.only('op-search')
        let searchIsEmpty=Object.keys(Search).length === 0 && Search.constructor === Object;
        if(!searchIsEmpty){
            let parametros=request.only('parametro')
            
            let isValidSearch= Search['op-search'] == 'nome'|| Search['op-search']== 'id'||Search['op-search']== 'cpf'|| Search['op-search'] == 'email'||Search['op-search'] == 'idade'||Search['op-search']== 'telefone'
    
            if (!isValidSearch) return
            
            if(!Search['op-search']) return
            const dado= Search['op-search']

            const users = await Cliente.busca(dado,parametros.parametro)
            return view.render('ClientesCadastrados',{
                clientes:users.toJSON(),
            })  
        }
        const users=await Cliente.all()
        return view.render('ClientesCadastrados',{
            clientes:users.toJSON(),
        })
    }
    async insert({request,response,session}){
        const dados=request.only(['cpf','email','nome','idade','telefone'])
        try{
            const user= await Cliente.create(dados)
            console.log(user)
            return response.route('lista')
        }catch(err){
            console.log(err)
            session.withErrors(err.message).flashAll();
            return response.route('formulariocliente')
        }
    }   
    async update({request,response,session,params}){
        const dados=request.only(['cpf','email','nome','idade','telefone'])
        try{
            const cliente = await Cliente.find(params.id)
            cliente.merge(dados)
            await cliente.save()
            return response.route('lista')
        }catch(err){
            console.log(err)
            session.withErrors(err.message).flashAll();
            return response.route('formUpdate',{id:params.id})
        }
    }
    async delete({params,response}){
        const cliente= await Cliente.find(params.id)
        await cliente.delete()
        return response.route('lista')
    }
    async viewCliente({params,view}){
        const cliente= await Cliente.find(params.id)
        return view.render('upddateDataClientes',{
            usuario:cliente

        })
    }
}
module.exports = ClienteController
