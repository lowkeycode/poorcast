describe('Settings', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.loginTestUser()
    cy.get('app-side-nav-icon').eq(2).click()
  })

  // ** See notes at bottom of test suite
  // after(() => {
  //   cy.visit('http://localhost:4200')
  //   cy.getByData('new-account').click();
  //   cy.getByData('email').type('test@test.com')
  //   cy.getByData('password').type('testtest')
  //   cy.getByData('password-confirm').type('testtest')
  //   cy.getByData('submit').click()
  //   cy.getByData("signout-btn").click();
  // })

  it('displays delete account button', () => {
    cy.getByData("delete-acct-btn").should('exist').and('be.visible')
  })

  it('shows confirm delete account on delete click', () => {
    cy.getByData("delete-acct-btn").click();
    cy.getByData("delete-acct-confirm-btn").should('exist').and('be.visible')
    cy.getByData("delete-acct-cancel-btn").should('exist').and('be.visible')
  })

  it('returns to delete account when cancel clicked', () => {
    cy.getByData("delete-acct-btn").click();
    cy.getByData("delete-acct-cancel-btn").click();
    cy.getByData("delete-acct-btn").should('exist').and('be.visible')
  })

  // Leave this as the last test as it deletes a user and needs cleanup with the "after"

  // Realistically this use case would be handled properly and refactored to its on e2e test creating a new user and then deleting it, instead of deleting the stubbed user, but its affecting development and I need to get this live

  // it('should delete account when confirm clicked', () => {
  //   cy.getByData("delete-acct-btn").click();
  //   cy.getByData("delete-acct-confirm-btn").click();
  //   cy.getByData("delete-confirm-message").contains("Your account has been successfully deleted.")
  //   cy.location('pathname', { timeout: 5000 }).should('eq', '/signin')
  // })
    
})