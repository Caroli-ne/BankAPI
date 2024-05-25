const express = require ('express');

const app = express();

app.use(express.json());

let accounts = []

app.post('/reset', (req,res)=> {
    accounts = []
    res.status(200).send('OK')
})






















const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log (`Servidor rodando na porta ${PORT}`)
})