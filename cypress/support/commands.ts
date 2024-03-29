/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test="${selector}"]`)
})

Cypress.Commands.add('loginTestUser', () => {
  cy.getByData('email').type('test@test.com')
  cy.getByData('password').type('testtest')
  cy.getByData('submit').click()
})