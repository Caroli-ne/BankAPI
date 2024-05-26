const express = require('express');

const app = express();

app.use(express.json());

let accounts = []

app.post('/reset', (req, res) => {
    accounts = []
    res.status(200).send('OK')
})

app.get('/balance', (req, res) => {
    const { account_id } = req.query
    const foundAccount = accounts.find((account) => account.id === account_id)
    if (foundAccount) {
        res.status(200).send(foundAccount.balance.toString())
    } else {
        res.status(404).send('0')
    }
})

app.post('/event', (req, res) => {
    const { type, destination, origin, amount } = req.body;
    let foundAccount;
    switch (type) {
        case 'deposit':
            foundAccount = accounts.find((account) => account.id === destination)
            if (foundAccount) {
                foundAccount.balance += amount
                res.status(201).send({ destination: foundAccount })
            } else {
                const newAccount = {
                    id: destination,
                    balance: amount
                }
                accounts.push(newAccount)
                res.status(201).send({ destination: newAccount })
            }
            break;

        case 'withdraw':
            foundAccount = accounts.find((account) => account.id === origin)
            if (foundAccount) {
                foundAccount.balance -= amount
                res.status(201).send({ origin: foundAccount })
            } else {
                res.status(404).send('0')
            }
            break;

        case 'transfer':
            const originAccount = accounts.find((account) => account.id === origin)
            let destinationAccount = accounts.find((account) => account.id === destination)
            if (!originAccount) {
                res.status(404).send('0')
            } else {
                if (!destinationAccount) {
                    destinationAccount = { id: destination, balance: 0 }
                    accounts.push(destinationAccount)
                }
                originAccount.balance -= amount
                destinationAccount.balance += amount
                res.status(201).send({
                    "origin": originAccount,
                    "destination": destinationAccount
                })
            }
            break;

        default:
            res.status(400).send('Unknown event type')
            break;
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
