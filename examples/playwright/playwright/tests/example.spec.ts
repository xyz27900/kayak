import { expect, metamask, test } from '@kayak/playwright';

test.describe('Test Metamask application', () => {
  test.beforeEach(async ({ page }) => {
    await metamask.network.delete('Localhost 8545');

    await page.goto('http://localhost:3000');
    await page.locator('#connectButton').click();
    await metamask.connection.approve();
  });

  test('Check if wallet is connected', async ({ page }) => {
    const accounts = await page.locator('#accounts').innerText();
    expect(accounts).toContain('0x');
  });

  test('Add a network', async () => {
    await metamask.network.toggleTestNetsVisibility(true);

    await metamask.network.add({
      name: 'Local Network',
      rpcUrl: 'http://anvil:8545',
      chainId: 1337,
      currencySymbol: 'ETH'
    });

    await metamask.network.switch('Local Network');
    const networkName = await metamask.network.getName();
    expect(networkName).toEqual('Local Network');
  });

  test('Create an account', async () => {
    await metamask.account.add('test-account');
    const account = await metamask.account.getData();
    expect(account).toMatchObject({
      accountName: 'test-account'
    });
  });

  test('Import an account', async () => {
    const accountAddress = '0xE3fA35a171e37B5dA59cDFF60F2ccD17F0f3E8b5';
    const privateKey = 'b99161998d12c69454d9827774f5d4597f9283e1f0aa19bf5197043fb43351a2';
    await metamask.account.import(privateKey);
    const account = await metamask.account.getData();
    expect(account).toMatchObject({
      accountAddress
    });
  });

  test('Sign Typed Data V4', async ({ page }) => {
    await page.locator('#signTypedDataV4').click();
    await metamask.signature.approve();
    const result = await page.locator('#signTypedDataV4Result').innerText();
    expect(result).toContain('0x');
  });

  test('Send a transaction', async ({ page }) => {
    await metamask.network.toggleTestNetsVisibility(true);

    await metamask.network.add({
      name: 'Local Network',
      rpcUrl: 'http://anvil:8545',
      chainId: 1337,
      currencySymbol: 'ETH'
    });

    await metamask.network.switch('Local Network');
    await page.locator('#toInput').fill('0x0000000000000000000000000000000000000000');
    await page.locator('#submitForm').click();
    await page.locator('#amountInput').fill('1000');
    await metamask.transaction.approve();
  });
});
