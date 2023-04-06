# Playwright and MetaMask

The `@kayak/playwright` module provides an exported object `metamask` that contains a set of methods.

To use it, import it from the module:

```javascript
import { metamask } from '@kayak/playwright';
```



## general.disconnect

Disconnects current account from the site.

### Usage

```javascript
await metamask.disconnect(window.location.origin);
```

### Parameters

| Parameter | Type     | Description                         |
|-----------|----------|-------------------------------------|
| `url`     | `string` | URL of the site to disconnect from. |



## connection.approve

Approves connection to the current site.

### Usage

```javascript
// Trigger the connection request
await metamask.connection.approve();
```



## connection.reject

Rejects connection to the current site.

### Usage

```javascript
// Trigger the connection request
await metamask.connection.reject();
```



## transaction.approve

Approves current transaction request.

### Usage

```javascript
// Trigger the transaction request
await metamask.transaction.approve();
```



## transaction.reject

Rejects current transaction request.

### Usage

```javascript
// Trigger the transaction request
await metamask.transaction.reject();
```



## signature.approve

Approves current signature request.

### Usage

```javascript
// Trigger the signature request
await metamask.signature.approve();
```



## signature.reject

Rejects current signature request.

### Usage

```javascript
// Trigger the signature request
await metamask.signature.reject();
```



## network.add

Adds a new network to MetaMask.

### Usage

```javascript
await metamask.network.add({
  name: 'My Network',
  rpcUrl: 'https://my.network/rpc',
  chainId: 1234,
  currencySymbol: 'MYTOKEN',
  blockExplorerUrl: 'https://my.network/explorer'
});
```

### Parameters

| Parameter          | Type                | Description                        |
|--------------------|---------------------|------------------------------------|
| `name`             | `string`            | Name of the network.               |
| `rpcUrl`           | `string`            | RPC URL of the network.            |
| `chainId`          | `number`            | Chain ID of the network.           |
| `currencySymbol`   | `string`            | Currency symbol of the network.    |
| `blockExplorerUrl` | `string (Optional)` | Block explorer URL of the network. |



## network.delete

Deletes a network by a given name from MetaMask.

### Usage

```javascript
await metamask.network.delete('My Network');
```

### Parameters

| Parameter     | Type     | Description                    |
|---------------|----------|--------------------------------|
| `networkName` | `string` | Name of the network to delete. |



## network.switch

Switches to the network with the given name.

### Usage

```javascript
await metamask.network.switch('My Network');
```

### Parameters

| Parameter     | Type     | Description                       |
|---------------|----------|-----------------------------------|
| `networkName` | `string` | Name of the network to switch to. |



## network.getName

Gets the name of the current network.

### Usage

```javascript
const networkName = await metamask.network.getName();
```

### Returns

`string` - Name of the current network.



## network.toggleTestNetsVisibility

Toggles the visibility of the test networks.

### Usage

```javascript
await metamask.network.toggleTestNetsVisibility(true);
```

### Parameters

| Parameter | Type      | Description                       |
|-----------|-----------|-----------------------------------|
| `show`    | `boolean` | Whether to show or hide test nets |



## account.add

Adds a new account to MetaMask.

### Usage

```javascript
await metamask.account.add('My Account');
```

### Parameters

| Parameter     | Type     | Description                 |
|---------------|----------|-----------------------------|
| `accountName` | `string` | Name of the account to add. |

::: tip
After adding an account, MetaMask is automatically switched to the new account.
To get new account data, you need to call [`metamask.account.getData`](#account-getdata).
:::


## account.import

Imports an account to MetaMask.

### Usage

```javascript
const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
await metamask.account.import(privateKey);
```

### Parameters

| Parameter    | Type     | Description                           |
|--------------|----------|---------------------------------------|
| `privateKey` | `string` | Private key of the account to import. |

::: tip
After importing an account, MetaMask is automatically switched to the new account.
To get new account data, you need to call [`metamask.account.getData`](#account-getdata).
:::


## account.switch

Switches to the account with the given name.

### Usage

```javascript
await metamask.account.switch('My Account');
```

### Parameters

| Parameter     | Type     | Description                       |
|---------------|----------|-----------------------------------|
| `accountName` | `string` | Name of the account to switch to. |



## account.getData

Gets the data of the current account.

### Usage

```javascript
const accountData = await metamask.account.getData();

expect(accountData).toEqual(
  expect.objectContaining({
    accountName: 'My Account',
    accountAddress: '0xE3fA35a171e37B5dA59cDFF60F2ccD17F0f3E8b5'
  })
);
```

### Returns

Object with properties `accountName` and `accountAddress` if the action was successful, `null` otherwise.
