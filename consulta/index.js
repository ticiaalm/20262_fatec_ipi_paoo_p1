const express = require('express')
const app = express()
app.use(express.json())

const PORT = 4200
const baseConsulta = {}

const funcoes = {
    AvistamentoCriado: (avistamento) => {
        baseConsulta[avistamento.id] = avistamento
        baseConsulta[avistamento.id]['relatos'] = []
    },
    RelatoCriado: (relato) => {
        const avistamento = baseConsulta[relato.avistamentoId]
        if (avistamento === undefined) {
            return
        }
        const relatos = avistamento['relatos'] || []
        relatos.push(relato)
        avistamento['relatos'] = relatos
    },
    RelatoConfirmado: (dados) => {
        const relatos = baseConsulta[dados.avistamentoId]['relatos']
        for (let i = 0; i < relatos.length; i++) {
            if (relatos[i].id === dados.id) {
                relatos[i].confirmacoes = dados.confirmacoes
            }
        }
    }
}

app.get('/avistamentos', (req, res) => {
    res.json(baseConsulta)
})

app.get('/avistamentos/:id', (req, res) => {
    const avistamento = baseConsulta[req.params.id]
    if (avistamento === undefined) {
        return res.status(404).send({ erro: "Avistamento não encontrado." })
    }
    res.json(avistamento)
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    funcoes[evento.tipo](evento.dados)
    res.status(200).send({msg: "ok"})
})

app.listen(PORT, () => console.log(`Consulta. Porta ${PORT}.`))