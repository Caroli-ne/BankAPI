const express = require ('express');

const app = express();

app.use(express.json());

let accounts = []

app.post('/reset', (req,res)=> {
    accounts = []
    res.status(200).send('OK')
})

app.get('/balance/:account_id', (req,res)=> {
    const {account_id} = req.params
    const foundAccount = accounts.find((account) => account.id === parseInt(account_id))
    if (foundAccount) {
        res.status(200).send(foundAccount.balance.toString())
        
    }
    res.status(404).send('0')    
})






















const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log (`Servidor rodando na porta ${PORT}`)
})