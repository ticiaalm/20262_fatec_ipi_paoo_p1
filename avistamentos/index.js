const express = require('express');
const app = express();
app.use(express.json()); 

const PORT = 4000; 

const avistamentos = {};
let contador = 0;

app.get('/avistamentos', (req, res) => {
    res.json(avistamentos);
})

app.post('/avistamentos', (req, res) => {
    const {local, descricao} = req.body
    if (!local || !descricao) {
        return res.status(400).json({ erro: "Local e descrição são obrigatórios." });
    }
    contador++

    const avistamento = {
        id: contador,
        local: local,
        descricao: descricao
    }

    avistamentos[contador] = avistamento
    return res.status(201).json(avistamento);
})

app.post('/eventos', (req, res) => {
    const evento = req.body
    console.log(evento)
    res.status(200).send({msg: "ok"})
})

app.listen(PORT, () => {
    console.log(`Avistamentos. Porta ${PORT}.`);
})