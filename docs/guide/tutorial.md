# Tutorial

In this article, we will create a simple dApp step-by-step and add some e2e tests using Kayak and Cypress.

## 1. Create a new project

```shell
# Go to the project directory
cd /path/to/project

# Initialize Kayak test runner
npx kayak init --cypress
```

Go through several steps in the initialization wizard:

<image-with-caption
  src="/images/tutorial/1-choose-language.png"
  alt="Choose a language"
/>

<image-with-caption
  src="/images/tutorial/2-determine-seed-phrase.png"
  alt="Determine the seed phrase"
/>

<image-with-caption
  src="/images/tutorial/3-determine-password.png"
  alt="Determine the password"
/>

<image-with-caption
  src="/images/tutorial/4-result.png"
  alt="Result"
/>

Install added dependencies:

```shell
npm install
```

After that, have a look at the `package.json` file.

We can notice the script called `"kayak"`:

```json
{
  "scripts": {
    "kayak": "kayak test --cypress"
  }
}
```
This is a main entrypoint for testing.

## 2. Create example dApp

Now we’re going to create a simple dApp — it will be a page with three buttons:

1. Connect a wallet
2. Sign a message
3. Send a transaction

Create the `src` directory and put into it a file `index.html` with the following markup:

```html
<html>

<head>
  <script src="https://bundle.run/buffer@6.0.3"></script>
  <title>Test dApp</title>
</head>

<body>
  <button data-testid="connect-wallet-btn">
    Connect a wallet
  </button>

  <div data-testid="connected-account">
    Account is not connected
  </div>

  <hr>

  <button data-testid="sign-message-btn" disabled>
    Sign a message
  </button>

  <div data-testid="signed-message">
    Message is not signed
  </div>

  <hr>

  <button data-testid="send-transaction-btn" disabled>
    Send a transaction
  </button>

  <div data-testid="sent-transaction">
    Transaction is not sent
  </div>

  <script>
    /* Elements */
    const connectWalletBtn = document.querySelector('[data-testid="connect-wallet-btn"]')
    const connectedAccount = document.querySelector('[data-testid="connected-account"]')

    const signMessageBtn = document.querySelector('[data-testid="sign-message-btn"]')
    const signedMessage = document.querySelector('[data-testid="signed-message"]')

    const sendTransactionBtn = document.querySelector('[data-testid="send-transaction-btn"]')
    const sentTransaction = document.querySelector('[data-testid="sent-transaction"]')

    /* Functions */
    const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      connectedAccount.textContent = accounts[0]
      signMessageBtn.disabled = false
      sendTransactionBtn.disabled = false
    }

    const signMessage = async () => {
      const sign = await window.ethereum.request({
        method: 'personal_sign',
        params: [
          `0x${buffer.Buffer.from('Hello world', 'utf8').toString('hex')}`,
          connectedAccount.textContent
        ],
      })
      signedMessage.textContent = sign
    }

    const sendTransaction = async () => {
      const transaction =  await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount.textContent,
            to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
            value: '0x29a2241af62c0000',
            gasPrice: '0x09184e72a000',
            gas: '0x2710'
          }
        ]
      })
      sentTransaction.textContent = transaction
    }

    /* Event listeners */
    connectWalletBtn.addEventListener('click', connectWallet)
    signMessageBtn.addEventListener('click', signMessage)
    sendTransactionBtn.addEventListener('click', sendTransaction)
  </script>
</body>

</html>
```

After that we install the [serve package](https://www.npmjs.com/package/serve):

```shell
npm install -D serve
```

And add a `serve` command to the `scripts` section in the `package.json` file:

```json
{
  "scripts": {
    "kayak": "kayak test --cypress",
    "serve": "serve -p 3000 ."
  }
}
```

It will launch a static server with our file on port `3000`.

## 3. Write the tests

If we look at the content of the file called `kayak.config.ts`, we may notice the `testDir` property — it is a relative path to the directory containing your tests, so let's create this one.

```shell
mkdir cypress/tests
```

Write our first Cypress test:

```typescript
// cypress/tests/example.cy.ts
describe('Example Test Suite', () => {
  it('Connect a wallet', () => {
    cy.get('[data-testid="connect-wallet-btn"]').click()
    cy.metamaskApproveConnection()
    cy.get('[data-testid="connected-account"')
      .should('contain', '0x')
  })

  it('Sign a message', () => {
    cy.get('[data-testid="sign-message-btn"]').click()
    cy.metamaskApproveSignature()
    cy.get('[data-testid="signed-message"')
      .should('contain', '0x')
  })

  it('Send a transaction', () => {
    cy.get('[data-testid="send-transaction-btn"]').click()
    cy.metamaskApproveTransaction()
    cy.get('[data-testid="sent-transaction"')
      .should('contain', '0x')
  })
})
```

Now we're almost ready to go! But…

Metamask uses the Ethereum Mainnet network by default, and it's not the best idea to best idea to run the tests operating the real funds. Fortunately, Kayak is being shipped with Anvil — a local Ethereum testnet node, so all we need to do is to delete the current local testnet and replace it with Anvil's one.

```typescript
it('Sign a message', () => {
  // ...
})

it('Add Anvil network', () => {
  cy.metamaskDeleteNetwork('Localhost 8545')
  cy.metamaskAddNetwork({
    name: 'Local Network',
    rpcUrl: 'http://anvil:8545',
    chainId: 1337,
    currencySymbol: 'ETH'
  })
})

it('Send a transaction', () => {
  // ...
})
```

Finally, our app is ready to be tested.

Let's have a look at the `Dockerfile` located in the `.kayak` directory.

You can notice that it has the `CMD` section:

```docker
CMD ["npm", "run", "test"]
```

This is a default command for running the tests — therefore, we should add this to our `package.json` file. The test script will run two scripts simultaneously — `serve` and `kayak`.

We will use the [start-server-and-test package](https://www.npmjs.com/package/start-server-and-test) to solve this task:

```shell
npm install -D concurrently
```

```json
{
  "scripts": {
    "kayak": "kayak test --cypress",
    "serve": "serve -p 3000 .",
    "test": "start-server-and-test serve http://localhost:3000 kayak"
  }
}
```

## 4. Run the tests

Everything is ready, so we can easily launch the tests:

```shell
Everything is ready, so we can easily launch the tests:
```

This action will create and run several Docker containers, and we can observe the test execution process directly in a browser window just by opening [http://127.0.0.1:5800/vnc.html?autoconnect=true](http://127.0.0.1:5800/vnc.html?autoconnect=true).
