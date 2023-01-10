describe('Budget', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.loginTestUser();
    cy.get('app-side-nav-icon').eq(1).click()
  })

  it('displays the "budget" header', () => {
    cy.get('[data-test="page-name"]').should('exist').contains('budget')
  })

  it('renders accounts section (may be empty)', () => {
    cy.get('.accts').should('be.visible')
  })

  it('shows account modal on add account click', () => {
    cy.get('[data-test="add-acct-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Add Account')
  })

}) 