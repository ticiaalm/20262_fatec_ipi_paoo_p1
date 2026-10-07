const express = require('express')
const axios = require('axios')
const app = express()
const { v4: uuidv4 } = require('uuid')
app.use(express.json())

const PORT = 4100
const relatosPorAvistamentoId = {}

app.post('/avistamentos/:id/relatos', async (req, res) => {
    const { texto } = req.body
    const id = req.params.id

    const relato = {
        id: uuidv4(),
        texto: texto,
        confirmacoes: 0,
        avistamentoId: req.params.id
    }
    const relatosDoAvistamento = relatosPorAvistamentoId[req.params.id] || []
    relatosDoAvistamento.push(relato)
    relatosPorAvistamentoId[req.params.id] = relatosDoAvistamento

    await axios.post('http://localhost:10000/eventos', {
        tipo: 'RelatoCriado',
        dados: relato
    })
    res.status(201).json(relatosDoAvistamento)
})

app.get('/avistamentos/:id/relatos', function (req, res) {
    res.json(relatosPorAvistamentoId[req.params.id] || [])
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    res.status(200).send({ msg: "ok" })
})

app.post('/avistamentos/:id/relatos/:idRelato/confirmacoes', async (req, res) => {
    const relatos = relatosPorAvistamentoId[req.params.id]
    if (relatos === undefined) {
        return res.status(404).send({ erro: "Relato não encontrado." })
    }
    let relato = undefined
    for (let i = 0; i < relatos.length; i++) {
        if (relatos[i].id === req.params.idRelato) {
            relato = relatos[i]
        }
    }
    if (relatos === undefined) {
        return res.status(404).send({ erro: "Relato não encontrado." })
    }
    relato.confirmacoes++
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'RelatoConfirmado',
        dados: {
            id: relato.id,
            texto: relato.texto,
            avistamentoId: relato.avistamentoId,
            confrimacoes: relato.confirmacoes
        }
    })
    res.status(200).send(relato)
})

app.listen(PORT, () => console.log(`Relatos. Porta ${PORT}.`))