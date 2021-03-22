'use strict'
const { validateAll } = use('Validator')
const ValidacaoException = use('App/Exceptions/ValidacaoException')
class ModelValidator {
  register (Model, customOptions = {}) {
    Model.addHook('beforeSave',async(model)=>{
        if(model.rules){
        const validacao= await validateAll(model.toJSON(),model.rules,model.messages)
        if(validacao.fails())
          throw new ValidacaoException(validacao.messages());
        } 
    })
    
  }
}
module.exports = ModelValidator
