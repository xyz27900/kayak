Cypress.Commands.add(
  'metamaskAddNetwork',
  (params) => cy.task<boolean>('metamaskAddNetwork', params)
    .then((added) => {
      const message = added ? `Network ${params.name} has been added` : 'Network has not been added';
      return cy.log(message).then(() => added);
    })
);

Cypress.Commands.add(
  'metamaskDeleteNetwork',
  (networkName) => cy.task<boolean>('metamaskDeleteNetwork', networkName)
    .then((deleted) => {
      const message = deleted ? `Network ${networkName} has been deleted` : 'Network has not been deleted';
      cy.log(message).then(() => deleted);
    })
);

Cypress.Commands.add(
  'metamaskSwitchNetwork',
  (networkName) => cy.task<boolean>('metamaskSwitchNetwork', networkName)
    .then((switched) => {
      const message = switched ? `Network has been switched to ${networkName}` : 'Network has not been switched';
      return cy.log(message).then(() => switched);
    })
);

Cypress.Commands.add(
  'metamaskGetNetworkName',
  () => cy.task<string>('metamaskGetNetworkName')
    .then((name) => {
      return cy.log(`Current network is "${name}"`).then(() => name);
    })
);

Cypress.Commands.add(
  'metamaskShowTestNets',
  () => cy.task<boolean>('metamaskShowTestNets')
    .then((shown) => {
      const message = shown ? 'Test networks have been shown' : 'Test networks have not been shown';
      cy.log(message).then(() => shown);
    })
);

Cypress.Commands.add(
  'metamaskHideTestNets',
  () => cy.task<boolean>('metamaskHideTestNets')
    .then((hidden) => {
      const message = hidden ? 'Test networks have been hidden' : 'Test networks have not been hidden';
      return cy.log(message).then(() => hidden);
    })
);
