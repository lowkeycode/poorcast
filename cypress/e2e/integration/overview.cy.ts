describe('Overview', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.loginTestUser()
  })

  it('goes to the app overview page', () => {
    cy.location('pathname').should('eq', '/app/overview')
  })

  it('renders the budget period select', () => {
    cy.get('app-select-input').should('exist').and('be.visible')
  })

  it('renders all 5 overall items', () => {
    cy.get('.overall__item').should('have.length', 5).each(item => expect(item).to.be.visible)
  })

  it('renders accounts section (may be empty)', () => {
    cy.get('.accts').should('be.visible')
  })

  it('renders upcoming payments', () => {
    cy.get('.upcoming').should('be.visible')
  })

})