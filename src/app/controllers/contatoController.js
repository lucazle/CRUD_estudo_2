const Contato = require('../models/contato')

exports.post = async (req, res, next) => {

    const {nome, sobrenome, telefone} = req.body;
    const contato = {nome, sobrenome, telefone};

    try{
        
        await Contato.create(contato)
        res.status(201).json({message: "Contato criado com sucesso!"})

    }catch(error){
       
        message = "Não foi possível salvar o contato. Erro: " + error
        res.status(500).json({ erro: message });

    }
}

exports.get = async (req, res, next) => {

    try {

        const contatos = await Contato.find()

        res.status(200).json(contatos)
    }

    catch (error) {

        message = "Não foi possível encontrar os contatos. Erro: " + error
        res.status(500).json({ erro: message });
    }

}

exports.getById = async (req, res, next) => {

    const id = req.params.id

    try {

        const contato = await Contato.findOne({_id:id})

        if(!contato) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(contato)

    }catch (error) {

        res.status(500).json({error: error}) 

    }

}

exports.put = async (req, res, next) => {

    const id = req.params.id

    const {nome, sobrenome, telefone} = req.body

    const contato = {
        nome,
        sobrenome,
        telefone
    }

    try {

        const updatedContato = await Contato.updateOne({_id:id}, contato)

        if(updatedContato.matchedCount === 0) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(contato)      

    }catch (error){
        res.status(500).json({error: error})
    }
}

exports.delete = async (req, res, next) => {

    const id = req.params.id

    const contato = await Contato.findOne({_id:id})

        if(!contato){
            res.status(422).json({message: 'O contato não foi encontrado!'})
                return
        }
    
    try {
        
        await Contato.deleteOne({_id:id})

        res.status(200).json({message: 'Contato removido com sucesso!'})

    } catch{

        res.status(500).json({ message: "Não foi possível encontrar o contato." })

    }

}
