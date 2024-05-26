const express = require('express');
const accountService = require('./accountService');

const app = express();
app.use(express.json());

app.post('/reset', (req, res) => {
    accountService.resetAccounts();
    res.status(200).send('OK');
});

app.get('/balance', (req, res) => {
    const { account_id } = req.query;
    const balance = accountService.getBalance(account_id);
    if (balance !== null) {
        res.status(200).send(balance.toString());
    } else {
        res.status(404).send('0');
    }
});

app.post('/event', (req, res) => {
    const { type, destination, origin, amount } = req.body;
    let result;
    switch (type) {
        case 'deposit':
            result = accountService.deposit(destination, amount);
            res.status(201).send({ destination: result });
            break;
        case 'withdraw':
            result = accountService.withdraw(origin, amount);
            if (result) {
                res.status(201).send({ origin: result });
            } else {
                res.status(404).send('0');
            }
            break;
        case 'transfer':
            result = accountService.transfer(origin, destination, amount);
            if (result) {
                res.status(201).send(result);
            } else {
                res.status(404).send('0');
            }
            break;
        default:
            res.status(400).send('Unknown event type');
            break;
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});