let accounts = []

function resetAccounts() {
    accounts = []
}

function getBalance(accountId) {
    const foundAccount = accounts.find((account) => account.id === accountId)
    return foundAccount ? foundAccount.balance : null
}

function deposit(destination, amount) {
    let foundAccount = accounts.find((account) => account.id === destination)
    if (foundAccount) {
        foundAccount.balance += amount
        return foundAccount
    } else {
        const newAccount = {
            id: destination,
            balance: amount
        }
        accounts.push(newAccount)
        return newAccount
    }
}

function withdraw(origin, amount) {
    const foundAccount = accounts.find((account) => account.id === origin)
    if (foundAccount) {
        foundAccount.balance -= amount
        return foundAccount
    } else {
        return null
    }
}

function transfer(origin, destination, amount) {
    const originAccount = accounts.find((account) => account.id === origin)
    let destinationAccount = accounts.find((account) => account.id === destination)

    if (!originAccount) {
        return null
    }

    if (!destinationAccount) {
        destinationAccount = { id: destination, balance: 0 }
        accounts.push(destinationAccount)
    }

    originAccount.balance -= amount
    destinationAccount.balance += amount

    return { origin: originAccount, destination: destinationAccount }
}

module.exports = {
    resetAccounts,
    getBalance,
    deposit,
    withdraw,
    transfer
}