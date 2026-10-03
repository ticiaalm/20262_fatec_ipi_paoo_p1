const express = require('express')
const axios = require('axios')
const app = express()
const {v4: uuidv4} = require('uuid')
app.use(express.json())

const PORT = 4100
const relatosPorAvistamentoId = {}

app.post('/avistamentos/:id/relatos', (req, res) => {
    const { texto } = req.body
    const id = req.params.id

    const relato = {
        id: uuidv4(),
        texto: texto,
        confirmacoes: 0
    }

    const relatosDoAvistamento = relatosPorAvistamentoId[req.params.id] || []
    relatosDoAvistamento.push(relato)
    relatosPorAvistamentoId[req.params.id] = relatosDoAvistamento
    res.status(201).json(relatosDoAvistamento)
})

app.get('/avistamentos/:id/relatos', function(req, res) {
    res.json(relatosPorAvistamentoId[req.params.id] || [])
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    res.status(200).send({msg: "ok"})
})

app.listen(PORT, () => console.log(`Relatos. Porta ${PORT}.`))