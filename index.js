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

app.post('/event', (req,res)=> {
    const {type, destination, origin, amount} = req.body;
    let foundAccount
    switch (type) {
        case 'deposit':
            foundAccount = accounts.find((account) => account.id === destination)
            if (foundAccount){
                foundAccount.balance += amount
                res.status(201).send(foundAccount)
            }
            if (!foundAccount) {
                const newAccount = {
                    id: destination,
                    balance: amount
                }
                accounts.push(newAccount)
                res.status(201).send(newAccount)
            }
            
            break;
    
        case 'withdraw':
            foundAccount = accounts.find((account) => account.id === origin)
            if (foundAccount){
                foundAccount.balance -= amount
                res.status(201).send(foundAccount)
            }
            if (!foundAccount) {
                res.status(404).send('0')
            }
                
            break;
        default:
            break;
    }
})





















const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log (`Servidor rodando na porta ${PORT}`)
})