describe('Overview', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.loginTestUser()
  })

  it('goes to the app overview page', () => {
    cy.location('pathname').should('eq', '/app/overview')
  })

  it('opens/closes the calendar', () => {
    cy.get('[data-test="date-filter"]').click()
    cy.get('tui-calendar-range').should('exist').and('be.visible')
    cy.get('[data-test="date-filter"]').click()
    cy.get('tui-calendar-range').should('exist').and('not.be.visible')
  })

  it('renders the ngx chart', () => {
    cy.get('ngx-charts-advanced-pie-chart').should('exist').and('be.visible')
  })

  it('renders all 5 overall items', () => {
    cy.get('.overall__item').should('have.length', 5).each(item => expect(item).to.be.visible)
  })

  it('renders accounts section (may be empty)', () => {
    cy.get('.accts').should('be.visible')
  })

  it('renders the carousel', () => {
    cy.get('.caro-body').should('be.visible')
  })

})