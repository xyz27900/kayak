describe('Test Metamask application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Connect a wallet', () => {
    cy.get('#connectButton').click();
    cy.metamaskApproveConnection();
    cy.get('#getAccounts').click();
    cy.get('#accounts').should('contain', '0x');
  });

  it('Delete default local network', () => {
    cy.metamaskDeleteNetwork('Localhost 8545').should('be.true');
  });

  it('Add a network', () => {
    cy.metamaskShowTestNets();

    cy.metamaskAddNetwork({
      name: 'Local Network',
      rpcUrl: 'http://anvil:8545',
      chainId: 1337,
      currencySymbol: 'ETH'
    });

    cy.metamaskSwitchNetwork('Local Network')
      .metamaskGetNetworkName()
      .should('eq', 'Local Network');
  });

  it('Create an account', () => {
    cy.metamaskAddAccount('test-account').should('be.true');
    cy.metamaskGetAccountData()
      .should('have.property', 'accountName', 'test-account');
  });

  it('Import an account', () => {
    const accountAddress = '0xE3fA35a171e37B5dA59cDFF60F2ccD17F0f3E8b5';
    const privateKey = 'b99161998d12c69454d9827774f5d4597f9283e1f0aa19bf5197043fb43351a2';

    cy.metamaskImportAccount(privateKey).should('be.true');
    cy.metamaskGetAccountData()
      .should('have.property', 'accountAddress', accountAddress);
  });

  it('Sign Typed Data V4', () => {
    cy.get('#signTypedDataV4').click();
    cy.metamaskApproveSignature().should('be.true');
    cy.get('#signTypedDataV4Result').should('contain', '0x');
  });

  it('Send a transaction', () => {
    cy.get('#toInput').type('0x0000000000000000000000000000000000000000');
    cy.get('#submitForm').click();
    cy.get('#amountInput').type('1000');
    cy.metamaskApproveTransaction().should('be.true');
  });

  it('Disconnect a wallet', () => {
    cy.metamaskSwitchAccount('Account 1');
    cy.metamaskDisconnect();
  });
});
