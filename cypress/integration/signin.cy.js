describe('sign in page', () => {
  beforeEach(() => {
    cy.visit('htt[s://localhost:4200')
  })

  it('displays the app title', () => {
    cy.get('.signin__heading').should('have.text', 'poorcast');
  })

  it('displays the signin form', () => {
    cy.get('app-fieldset').invoke('attr', 'ng-reflect-legend').should('eq', 'Sign In')
  })

  it('displays the raining loading logo', () => {
    cy.get('app-logo').invoke('attr', 'ng-reflect-raining').should('eq', 'true')
  })
})