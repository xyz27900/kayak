Cypress.Commands.add(
  'metamaskSetup',
  () => cy.task('metamaskSetup')
);

Cypress.Commands.add(
  'metamaskDisconnect',
  () => cy.task<boolean>('metamaskDisconnect', window.location.origin)
);
