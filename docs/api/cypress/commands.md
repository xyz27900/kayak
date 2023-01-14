# Cypress Commands

Adhering to the [Cypress Chains of Commands model](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Chains-of-Commands), **Kayak** provides a set of commands that can be used to interact with Metamask.



## metamaskDisconnect

Disconnects current account from the current site.

### Usage

```javascript
cy.metamaskDisconnect().should('be.true')
```

### Yields

- `.metamaskDisconnect()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskDisconnect()` is a query, and it is safe to chain further commands.



## metamaskApproveConnection

Approves connection to the current site.

### Usage

```javascript
// Trigger the connection request
cy.metamaskApproveConnection().should('be.true')
```

### Yields

- `.metamaskApproveConnection()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskApproveConnection()` is a query, and it is safe to chain further commands.



## metamaskRejectConnection

Rejects connection to the current site.

### Usage

```javascript
// Trigger the connection request
cy.metamaskRejectConnection().should('be.true')
```

### Yields

- `.metamaskRejectConnection()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskRejectConnection()` is a query, and it is safe to chain further commands.



## metamaskApproveTransaction

Approves current transaction request.

### Usage

```javascript
// Trigger the transaction request
cy.metamaskApproveTransaction().should('be.true')
```

### Yields

- `.metamaskApproveTransaction()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskApproveTransaction()` is a query, and it is safe to chain further commands.



## metamaskRejectTransaction

Rejects current transaction request.

### Usage

```javascript
// Trigger the transaction request
cy.metamaskRejectTransaction().should('be.true')
```

### Yields

- `.metamaskRejectTransaction()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskRejectTransaction()` is a query, and it is safe to chain further commands.



## metamaskApproveSignature

Approves current signature request.

### Usage

```javascript
// Trigger the signature request
cy.metamaskApproveSignature().should('be.true')
```

### Yields

- `.metamaskApproveSignature()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskApproveSignature()` is a query, and it is safe to chain further commands.



## metamaskRejectSignature

Rejects current signature request.

### Usage

```javascript
// Trigger the signature request
cy.metamaskRejectSignature().should('be.true')
```

### Yields

- `.metamaskRejectSignature()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskRejectSignature()` is a query, and it is safe to chain further commands.



## metamaskAddNetwork

Adds a new network to Metamask.

### Usage

```javascript
cy.metamaskAddNetwork({
  name: 'My Network',
  rpcUrl: 'https://my.network/rpc',
  chainId: 1234,
  currencySymbol: 'MYTOKEN',
  blockExplorerUrl: 'https://my.network/explorer'
})
```

### Parameters

| Parameter          | Type                | Description                        |
|--------------------|---------------------|------------------------------------|
| `name`             | `string`            | Name of the network.               |
| `rpcUrl`           | `string`            | RPC URL of the network.            |
| `chainId`          | `number`            | Chain ID of the network.           |
| `currencySymbol`   | `string`            | Currency symbol of the network.    |
| `blockExplorerUrl` | `string (Optional)` | Block explorer URL of the network. |

### Yields

- `.metamaskAddNetwork()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskAddNetwork()` is a query, and it is safe to chain further commands.



## metamaskDeleteNetwork

Deletes a network by a given name from Metamask.

### Usage

```javascript
cy.metamaskDeleteNetwork('My Network').should('be.true')
```

### Parameters

| Parameter     | Type     | Description                    |
|---------------|----------|--------------------------------|
| `networkName` | `string` | Name of the network to delete. |

### Yields

- `.metamaskDeleteNetwork()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskDeleteNetwork()` is a query, and it is safe to chain further commands.



## metamaskSwitchNetwork

Switches to the network with the given name.

### Usage

```javascript
cy.metamaskSwitchNetwork('My Network').should('be.true')
```

### Parameters

| Parameter     | Type     | Description                       |
|---------------|----------|-----------------------------------|
| `networkName` | `string` | Name of the network to switch to. |

### Yields

- `.metamaskSwitchNetwork()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskSwitchNetwork()` is a query, and it is safe to chain further commands.



## metamaskGetNetworkName

Gets the name of the current network.

### Usage

```javascript
cy.metamaskGetNetworkName().should('eq', 'My Network')
```

### Yields

- `.metamaskGetNetworkName()` yields the name of the current network.
- `.metamaskGetNetworkName()` is a query, and it is safe to chain further commands.



## metamaskShowTestNets

Sets the visibility of the test networks to `true`.

### Usage

```javascript
cy.metamaskShowTestNets().should('be.true')
```

### Yields

- `.metamaskShowTestNets()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskShowTestNets()` is a query, and it is safe to chain further commands.



## metamaskHideTestNets

Sets the visibility of the test networks to `false`.

### Usage

```javascript
cy.metamaskHideTestNets().should('be.true')
```

### Yields

- `.metamaskHideTestNets()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskHideTestNets()` is a query, and it is safe to chain further commands.



## metamaskAddAccount

Adds a new account to Metamask.

### Usage

```javascript
cy.metamaskAddAccount('My Account').should('be.true')
```

### Parameters

| Parameter     | Type     | Description                 |
|---------------|----------|-----------------------------|
| `accountName` | `string` | Name of the account to add. |

### Yields

- `.metamaskAddAccount()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskAddAccount()` is a query, and it is safe to chain further commands.

::: tip
After adding an account, Metamask is automatically switched to the new account.
To get new account data, you need to call [`cy.metamaskGetAccountData`](#metamaskgetaccountdata).
:::



## metamaskImportAccount

Imports an account to Metamask.

### Usage

```javascript
const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
cy.metamaskImportAccount(privateKey).should('be.true')
```

### Parameters

| Parameter    | Type     | Description                           |
|--------------|----------|---------------------------------------|
| `privateKey` | `string` | Private key of the account to import. |

### Yields

- `.metamaskImportAccount()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskImportAccount()` is a query, and it is safe to chain further commands.

::: tip
After importing an account, Metamask is automatically switched to the new account.
To get new account data, you need to call [`cy.metamaskGetAccountData`](#metamaskgetaccountdata).
:::


## metamaskSwitchAccount

Switches to the account with the given name.

### Usage

```javascript
cy.metamaskSwitchAccount('My Account').should('be.true')
```

### Parameters

| Parameter     | Type     | Description                       |
|---------------|----------|-----------------------------------|
| `accountName` | `string` | Name of the account to switch to. |

### Yields

- `.metamaskSwitchAccount()` yields `true` if the action was successful, `false` otherwise.
- `.metamaskSwitchAccount()` is a query, and it is safe to chain further commands.



## metamaskGetAccountData

Gets the data of the current account.

### Usage

```javascript
cy.metamaskGetAccount()
  .should('have.property', 'accountName', 'My Account')
  .and('have.property', 'accountAddress', '0xE3fA35a171e37B5dA59cDFF60F2ccD17F0f3E8b5')
```

### Yields

- `.metamaskGetAccount()` yields an object with properties `accountName` and `accountAddress` if the action was successful, `null` otherwise.
- `.metamaskGetAccount()` is a query, and it is safe to chain further commands.
