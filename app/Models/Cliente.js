'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
    static boot(){
        super.boot()
        this.addTrait('ModelValidator');
    }
     static busca(dado,parametro,page,limit){
        const consulta = Cliente.query()
        try{
            consulta.where(`${dado}`,'like',`%${parametro}%`)
            return consulta.fetch()
        }catch(err){
            throw err
        }
    }
    get rules(){
        return {
            cpf:'required|number|max:11',
            nome:'required|max:60',
            email:'required|email',
            idade:'required|number|range:18,120',
            telefone: 'required|number|max:15',
        }
    }
    get messages(){
        return {
            'cpf.required':'O campo CPF é obrigátorio',
            'cpf.max':'o campo CPF é deve conter 11 caracteres númericos',
            'cpf.number':'O campo CPF só aceita caracteres númericos',
            'nome.required':'O campo Nome é obrigátorio',
            'nome.max':'O campo nome deve ter no máximo 60 caracteres',
            'email.required':'O campo Email é obrigátorio',
            'email.email':'Formato inválido de Email',
            'idade.required':'O campo Idade é obrigátorio',
            'idade.number':'A idade dever ser do tipo númerico',
            'idade.range':'Para a realização do cadastro é preciso ser maior de 18 anos',
            'telefone.max':'Número de Telefone inválido verifique novamente',
            'telefone.required':'O campo Telefone é obrigátorio',
            'telefone.number':'O campo Telefone só aceita caracteres númericos',

        }
    }
}

module.exports = Cliente
