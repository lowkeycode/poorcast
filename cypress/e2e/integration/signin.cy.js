describe('sign in page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('displays the app title', () => {
    cy.get('.sign-in__heading').should('have.text', 'Poorcastkjadsgf');
  })

  it('displays the signin form', () => {
    cy.get('app-fieldset').invoke('attr', 'ng-reflect-legend').should('eq', 'Sign In')
  })

  it('displays the raining loading logo', () => {
    cy.get('app-logo').invoke('attr', 'ng-reflect-raining').should('eq', 'true')
  })
})