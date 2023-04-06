import { AccountData } from '@kayak/metamask';

Cypress.Commands.add(
  'metamaskAddAccount',
  (accountName) => cy.task<boolean>('metamaskAddAccount', accountName)
    .then((added) => {
      const message = added ? `Account ${accountName} has been added` : 'Account has not been added';
      return cy.log(message).then(() => added);
    })
);

Cypress.Commands.add(
  'metamaskImportAccount',
  (privateKey) => {
    const isKeyValid = /^[0-9a-fA-F]{64}$/.test(privateKey);
    if (!isKeyValid) {
      throw new Error('Invalid private key');
    } else {
      return cy.task<boolean>('metamaskImportAccount', privateKey)
        .then((added) => {
          const message = added ? 'Account has been imported' : 'Account has not been imported';
          return cy.log(message).then(() => added);
        });
    }
  }
);

Cypress.Commands.add(
  'metamaskSwitchAccount',
  (accountName) => cy.task<boolean>('metamaskSwitchAccount', accountName)
    .then((switched) => {
      const message = switched ? 'Account has been switched' : 'Account has not been switched';
      return cy.log(message).then(() => switched);
    })
);

Cypress.Commands.add(
  'metamaskGetAccountData',
  () => cy.task<AccountData>('metamaskGetAccountData')
    .then((data) => {
      return cy.log(`Current account is "${data.accountAddress}"`).then(() => data);
    })
);
