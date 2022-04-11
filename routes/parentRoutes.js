const router = require('express').Router()

const Parent = require('../models/Parent')

// Create - criação de dados
router.post('/', async (req, res) => {

    // req.body
    const {name, sex, email, tel, birth, donation} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return;
    }

    const parent = {
        name,
        sex,
        email,
        tel,
        birth,
        donation,
    }

    try {
        // criando dados
        await Parent.create(parent)

        res.status(201).json({message: 'Cadastro inserido no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Read - leitura de dados
router.get('/', async (req, res) => {
    try {

        const parents = await Parent.find()

        res.status(200).json(parents)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        
        const parent = await Parent.findOne({_id: id})
        
        //Não ta funcionando 1:04:57 video
        if(!parent) {
            res.status(422).json({message: 'O cadastro não foi encontrado!'})
            return;
        }

        res.status(200).json(parent)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {
        name,
        sex,
        email,
        tel,
        birth,
        donation
    } = req.body

    const parent = {
        name,
        sex,
        email,
        tel,
        birth,
        donation,
    }

    try {

        const updatedParent = await Parent.updateOne({_id: id}, parent)

        // Não ta funcionando
        if (updatedParent.matchedCount === 0) {
            res.status(422).json({message: 'O Cadastro não foi encontrado!'})
            return;         
        }

        res.status(200).json(parent)
    }catch(error) {
        res.status(500).json({ error: error })
    }
})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id


    const parent = await Parent.findOne({_id: id})
        
        if(!parent) {
            res.status(422).json({message: 'O cadastro não foi encontrado!'})
            return;
        }

        try {
            await Parent.deleteOne({_id: id})

            res.status(200).json({message: 'Cadastro removido com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })
        }
})

module.exports = router
