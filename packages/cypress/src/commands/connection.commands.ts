Cypress.Commands.add(
  'metamaskApproveConnection',
  () => cy.task<boolean>('metamaskApproveConnection')
    .then((approved) => {
      const message = approved ? 'Connection has been approved by user' : 'Connection has not been approved by user';
      return cy.log(message).then(() => approved);
    })
);

Cypress.Commands.add(
  'metamaskRejectConnection',
  () => cy.task<boolean>('metamaskRejectConnection')
    .then((rejected) => {
      const message = rejected ? 'Connection has been rejected by user' : 'Connection has not been rejected by user';
      return cy.log(message).then(() => rejected);
    })
);
