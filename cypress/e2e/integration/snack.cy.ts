import { should } from "chai"

describe('Snack', () => {


  it('shows/hides error', () => {
    cy.visit('http://localhost:4200')
    cy.getByData('submit').click()
    cy.getByData('snack').should('exist')
    cy.getByData('snack-message').should('exist').contains('Firebase: Error (auth/missing-email).')

    cy.get('app-solo-icon').should('exist').click()
    cy.getByData('overlay').should('not.exist')
    cy.getByData('snack').should('not.exist')

    cy.getByData('submit').click()
    cy.getByData('overlay').click()

    cy.getByData('overlay').should('not.exist')
    cy.getByData('snack').should('not.exist')
    
  })
})