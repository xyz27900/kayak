Cypress.Commands.add(
  'metamaskApproveTransaction',
  () => cy.task<boolean>('metamaskApproveTransaction')
    .then((approved) => {
      const message = approved ? 'Transaction has been approved by user' : 'Transaction has not been approved by user';
      return cy.log(message).then(() => approved);
    })
);

Cypress.Commands.add(
  'metamaskRejectTransaction',
  () => cy.task<boolean>('metamaskRejectTransaction')
    .then((rejected) => {
      const message = rejected ? 'Transaction has been rejected by user' : 'Transaction has not been rejected by user';
      return cy.log(message).then(() => rejected);
    })
);
