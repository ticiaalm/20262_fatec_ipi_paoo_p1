const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const PORT = 10000

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    axios.post('http://localhost:4000/eventos', evento)
    .catch(() => console.log('Falha na porta 4000.'))
    axios.post('http://localhost:4100/eventos', evento)
    .catch(() => console.log('Falha na porta 4100.'))
    axios.post('http://localhost:4200/eventos', evento)
    .catch(() => console.log('Falha na porta 4200.'))
    axios.post('http://localhost:4300/eventos', evento)
    .catch(() => console.log('Falha na porta 4300.'))
    res.status(200).send({msg: "ok"})
})

app.listen(PORT, () => console.log(`Barramento. Porta ${PORT}.`))