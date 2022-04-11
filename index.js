// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),   
)

app.use(express.json())

// rotas da API
const petRouters = require('./routes/petRoutes')
const parentRouters = require('./routes/parentRoutes')

app.use('/pet', petRouters)
app.use('/parent', parentRouters)

// rota inicial / endpoint
app.get('/', (req,res) => {

    // mostrar req

res.json({message: 'Oi Express!'})

})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect ('mongodb+srv://matheus:gePna7Gq2Mp8dQ2a@apicluster.dthrk.mongodb.net/bancodaapi?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))


