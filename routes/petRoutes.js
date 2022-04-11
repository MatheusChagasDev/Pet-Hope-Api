const router = require('express').Router()

const Pet = require('../models/Pet')

// Create - criação de dados
router.post('/', async (req, res) => {

    // req.body
    const {breed, sex, fur, color, rescue, health, size, collar, bath, owner} = req.body

    if(!breed) {
        res.status(422).json({error: 'A raça é obrigatória!'})
        return;
    }

    const pet = {
        breed,
        sex,
        fur,
        color,
        rescue,
        health,
        size,
        collar,
        bath,
        owner
    }

    try {
        // criando dados
        await Pet.create(pet)

        res.status(201).json({message: 'Pet inserido no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Read - leitura de dados
router.get('/', async (req, res) => {
    try {

        const pets = await Pet.find()

        res.status(200).json(pets)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        
        const pet = await Pet.findOne({_id: id})
        
        //Não ta funcionando 1:04:57 video
        if(!pet) {
            res.status(422).json({message: 'O pet não foi encontrado!'})
            return;
        }

        res.status(200).json(pet)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {
        breed,
        sex,
        fur,
        color,
        rescue,
        health,
        size,
        collar,
        bath,
        owner
    } = req.body

    const pet = {
        breed,
        sex,
        fur,
        color,
        rescue,
        health,
        size,
        collar,
        bath,
        owner,
    }

    try {

        const updatedPet = await Pet.updateOne({_id: id}, pet)

        // Não ta funcionando
        if (updatedPet.matchedCount === 0) {
            res.status(422).json({message: 'O pet não foi encontrado!'})
            return;         
        }

        res.status(200).json(pet)
    }catch(error) {
        res.status(500).json({ error: error })
    }
})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id


    const pet = await Pet.findOne({_id: id})
        
        if(!pet) {
            res.status(422).json({message: 'O pet não foi encontrado!'})
            return;
        }

        try {
            await Pet.deleteOne({_id: id})

            res.status(200).json({message: 'Pet removido com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })
        }
})

module.exports = router
