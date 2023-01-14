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

  it('shows add account modal on add account click', () => {
    cy.get('[data-test="add-acct-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Add Account')
  })

  it('shows edit modal on edit account click', () => {
    cy.get('[data-test="edit-acct-btn-0"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Edit Account')
  })

  it('shows transfer modal on transfer click', () => {
    cy.get('[data-test="transfer-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Transfer')
  })

  it('renders bills section', () => {
    cy.get('.bills__table--header').should('be.visible')
  })

  it('shows pay bill modal on pay bill click', () => {
    cy.get('[data-test="pay-bill-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Pay Bill')
  })

  it('shows add bill modal on add bill click', () => {
    cy.get('[data-test="add-bill-btn"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Add Bill')
  })

  it('shows edit bill modal on edit bill click', () => {
    cy.get('[data-test="edit-bill-btn-0"]').click()
    cy.get('.modal__main--title').should('be.visible').contains('Edit Bill')
  })
}) 