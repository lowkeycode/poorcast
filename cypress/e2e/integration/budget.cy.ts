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

  it('closes modal on modal close click', () => {
    cy.get('[data-test="add-acct-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Add Account')
    cy.get('.modal__main--close').click()
    cy.get('.modal').should('not.exist')
  })

  it('shows transactions modal on transactions click', () => {
    cy.get('[data-test="transactions-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Transactions')
  })

  it('shows transfer modal on transfer click', () => {
    cy.get('[data-test="transfer-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Transfer')
  })

  it('shows add account modal on add account click', () => {
    cy.get('[data-test="add-acct-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Add Account')
  })

  it('shows edit modal on edit account click', () => {
    cy.get('[data-test="edit-acct-btn-0"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Edit Account')
  })

  it('renders expenses section', () => {
    cy.get('.expenses').should('be.visible')
  })

  it('shows pay expense modal on pay expense click', () => {
    cy.get('[data-test="pay-expense-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Pay Expense')
  })

  it('shows add expense modal on add expense click', () => {
    cy.get('[data-test="add-expense-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Add Expense')
  })

  it('shows edit expense modal on edit expense click', () => {
    cy.get('[data-test="edit-expense-btn-0"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Edit Expense')
  })
}) 