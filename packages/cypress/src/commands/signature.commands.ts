Cypress.Commands.add(
  'metamaskApproveSignature',
  () => cy.task<boolean>('metamaskApproveSignature')
    .then((approved) => {
      const message = approved ? 'Signature has been approved by user' : 'Signature has not been approved by user';
      return cy.log(message).then(() => approved);
    })
);

Cypress.Commands.add(
  'metamaskRejectSignature',
  () => cy.task<boolean>('metamaskRejectSignature')
    .then((rejected) => {
      const message = rejected ? 'Signature has been rejected by user' : 'Signature has not been rejected by user';
      return cy.log(message).then(() => rejected);
    })
);
