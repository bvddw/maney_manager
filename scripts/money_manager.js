class moneyManager {
  constructor(value) {
    this.balance = value
    this.withdrawHistory = []
    this.withdrawStatictic = {
      'Utility and internet': 0,
      'Product and markets': 0,
      'Cafes and restaurants': 0,
      'Entertainment and sports': 0,
      'Transfer to the card': 0,
      'Taxi': 0,
      'Travel': 0,
      'Charity': 0,
      'Other': 0
    }
    this.allWithdraw = 0
    this.withdrawMax = 0
    this.withdrawMaxOption = ''
    this.depositHistory = []
    this.depositStatictic = {
      'Salary': 0,
      'Cashback': 0,
      'Gifts': 0,
      'Other': 0
    }
    this.depositMax = 0
    this.depositMaxOption = ''
    this.allDeposit = 0
  }

  checkBalance() {
    const balanceElement = document.getElementById('content')
    balanceElement.innerHTML = `<p>Current Balance: $${this.balance}</p>`
  }

  withdraw() {
    const amountInput = document.getElementById('withdraw-amount')
    const amount = parseFloat(amountInput.value)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }
    if (this.balance < amount) {
      alert('Not enough money in your balance.')
      return
    }

    const selectElement = document.querySelector('.withdraw-type-input')
    const selectedOption = selectElement.options[selectElement.selectedIndex].text
    const withdrawalInfo = `Success withdraw ${amount} dollars. Transaction type: ${selectedOption}. Datetime: ${new Date()}`

    this.balance -= amount
    this.withdrawHistory.push(withdrawalInfo)
    this.withdrawStatictic[selectedOption] += amount
    if (this.withdrawStatictic[selectedOption] > this.withdrawMax) {
      this.withdrawMax = this.withdrawStatictic[selectedOption]
      this.withdrawMaxOption = selectedOption
    }
    this.allWithdraw += amount
    this.checkBalance()
    amountInput.value = ''
  }


  deposit() {
    const amountInput = document.getElementById('deposit-amount')
    const amount = parseFloat(amountInput.value)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    const selectElement = document.querySelector('.deposit-type-input')
    const selectedOption = selectElement.options[selectElement.selectedIndex].text
    const depositInfo = `Success deposit ${amount} dollars. Transaction type: ${selectedOption}. Datetime: ${new Date()}`

    this.balance += amount
    this.depositHistory.push(depositInfo)
    this.depositStatictic[selectedOption] += amount
    if (this.depositStatictic[selectedOption] > this.depositMax) {
      this.depositMax = this.depositStatictic[selectedOption]
      this.depositMaxOption = selectedOption
    }
    this.allDeposit += amount
    this.checkBalance()
    amountInput.value = ''
  }


  displayTransactionHistory() {
    const historyElement = document.getElementById('content')
    if (this.depositHistory.length === 0 && this.withdrawHistory.length === 0) {
      historyElement.innerHTML = '<p>No transaction history.</p>'
    } else {
      let historyHTML = ''
      if (this.depositHistory.length !== 0) {
        historyHTML += '<h2>Deposit history:</h2>'
        for (let index in this.depositHistory) {
          historyHTML += `<p>${Number(index) + 1}: ${this.depositHistory[index]}</p>`
        }
      }
      if (this.withdrawHistory.length !== 0) {
        historyHTML += '<h2>Withdraw history:</h2>'
        for (let index in this.withdrawHistory) {
          historyHTML += `<p>${Number(index) + 1}: ${this.withdrawHistory[index]}</p>`
        }
      }
      historyElement.innerHTML = historyHTML
    }
  }

  displayMainStatistic() {
    const statisticElement = document.getElementById('content')
    if (this.allWithdraw + this.allDeposit === 0) {
      statisticElement.innerHTML = '<p>No operations have been performed.</p>'
    } else {
      let statisticHTML = '<h2>All statistic:</h2>'
      statisticHTML += `<p>Total withdraw: $${this.allWithdraw}</p>`
      statisticHTML += `<p>Total deposit: $${this.allDeposit}</p>`
      statisticHTML += `<p>Current balance: $${this.allDeposit - this.allWithdraw}</p>`
      if (this.withdrawMax){
        statisticHTML += `<p>Most of all money was spent on ${this.withdrawMaxOption}: $${this.withdrawMax}</p>`
      }
      if (this.depositMax){
        statisticHTML += `<p>Most of all received money from ${this.depositMaxOption}: $${this.depositMax}</p>`
      }
      statisticElement.innerHTML = statisticHTML
    }
  }

  displayDepositStatistic() {
    const statisticElement = document.getElementById('content')
    if (this.depositHistory.length === 0) {
      statisticElement.innerHTML = '<p>No deposit history.</p>'
    } else {
      let statisticHTML = '<h2>Deposit statistic:</h2>'
      statisticHTML += `<p>All deposits: $${this.allDeposit}</p>`
      for (let key in this.depositStatictic) {
        if (this.depositStatictic[key]){
          statisticHTML += `<p>${key} (${Math.round(this.depositStatictic[key] / this.allDeposit * 100)}%): $${this.depositStatictic[key]}</p>`
        }
      }
      statisticElement.innerHTML = statisticHTML
    }
  }

  displayWithdrawStatistic() {
    const statisticElement = document.getElementById('content')
    if (this.withdrawHistory.length === 0) {
      statisticElement.innerHTML = '<p>No withdraw history.</p>'
    } else {
      let statisticHTML = '<h2>Withdraw statistic:</h2>'
      statisticHTML += `<p>All withdraw: $${this.allWithdraw}</p>`
      for (let key in this.withdrawStatictic) {
        if (this.withdrawStatictic[key]){
          statisticHTML += `<p>${key} (${Math.round(this.withdrawStatictic[key] / this.allWithdraw * 100)}%): $${this.withdrawStatictic[key]}</p>`
        }
      }
      statisticElement.innerHTML = statisticHTML
    }
  }
}

const card = new moneyManager(0)

document.getElementById('check-balance').addEventListener('click', () => {
  card.checkBalance()
})

document.getElementById('withdraw').addEventListener('click', () => {
  card.withdraw()
})

document.getElementById('deposit').addEventListener('click', () => {
  card.deposit()
})

document.getElementById('transaction-history').addEventListener('click', () => {
  card.displayTransactionHistory()
})

document.getElementById('summary-statistic').addEventListener('click', () => {
  card.displayMainStatistic()
})

document.getElementById('withdraw-statistic').addEventListener('click', () => {
  card.displayWithdrawStatistic()
})

document.getElementById('deposit-statistic').addEventListener('click', () => {
  card.displayDepositStatistic()
})