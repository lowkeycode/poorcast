describe('Budget', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.loginTestUser();
    cy.get('app-side-nav-icon').eq(1).click();
  });

  it('displays the "budget" header', () => {
    cy.get('[data-test="page-name"]').should('exist').contains('budget');
  });

  context('Accounts section', () => {
    it('renders accounts section (may be empty)', () => {
      cy.get('.accts').should('be.visible');
    });

    it('closes modal on modal close click', () => {
      cy.getByData('add-acct-btn').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Add Account');
      cy.get('.modal__main--close').click();
      cy.get('.modal').should('not.exist');
    });

    it('shows transactions modal on transactions click', () => {
      cy.getByData('transactions-btn').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Transactions');
    });

    it('shows transfer modal on transfer click', () => {
      cy.getByData('transfer-btn').click();
      cy.get('.modal__main--title').should('be.visible').contains('Transfer');
    });

    it('shows add account modal on add account click', () => {
      cy.getByData('add-acct-btn').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Add Account');
    });

    it('shows edit modal on edit account click', () => {
      cy.getByData('edit-acct-btn-0').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Edit Account');
    });
  });

  context('Expenses section', () => {
    it('renders expenses section', () => {
      cy.get('.expenses').should('be.visible');
    });

    it('shows pay expense modal on pay expense click', () => {
      cy.getByData('pay-expense-btn').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Pay Expense');
    });

    it('shows add expense modal on add expense click', () => {
      cy.getByData('add-expense-btn').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Add Expense');
    });

    it('shows edit expense modal on edit expense click', () => {
      cy.getByData('edit-expense-btn-0').click();
      cy.get('.modal__main--title')
        .should('be.visible')
        .contains('Edit Expense');
    });

    it('can add/delete a category', () => {
      // For whatever reason cypress needs to wait even though the correct data comes in from firebase, set to state and is logged by cypress.
      cy.wait(1000);
      cy.getByData('manage-categories-btn').click();
      cy.get('.manage-category')
        .should('have.length', 1)
        .each((item) => expect(item).to.be.visible);
      cy.getByData('category').type('Test Category');
      cy.getByData('add-category-btn').click();
      cy.getByData('modal-save-btn').click();
      cy.wait(1000);
      cy.getByData('manage-categories-btn').click();
      cy.get('.manage-category')
        .should('have.length', 2)
        .each((item) => expect(item).to.be.visible);
      cy.getByData('delete-item-btn-Test Category')
        .trigger('mouseover')
        .click();
      cy.getByData('modal-save-btn').click();
      cy.wait(1000);
      cy.getByData('manage-categories-btn').click();
      cy.get('.manage-category').should('have.length', 1);
    });
  });

  it('can add/delete an expense', () => {
    cy.wait(1000);
    cy.getByData('add-expense-btn').click();
    cy.getByData('name-input').type('Testing');
    cy.getByData('amount-input').type('1500');
    cy.getByData('remaining-input').type('0');
    cy.getByData('due-input').type('2024-02-21');
    cy.getByData('notes-input').type('This is alot of notes');
    cy.getByData('category-input').type('yup');
    cy.getByData('modal-save-btn').click();
    cy.wait(1000);
    cy.get('app-table-row').should('have.length', 2);
    cy.get('.paid').should('exist');
    cy.getByData('delete-expense-btn-1').click();
    cy.get('app-table-row').should('have.length', 1);
  });

  it('can edit an expense', () => {
    cy.getByData('edit-expense-btn-0').click();
    cy.getByData('amount-input').find('input').clear();
    cy.getByData('amount-input').type('1500');
    cy.getByData('modal-save-btn').click();
    cy.get('.row-amount').contains('$1,500.00');
    cy.getByData('edit-expense-btn-0').click();
    cy.getByData('amount-input').find('input').clear();
    cy.getByData('amount-input').type('1000');
    cy.getByData('modal-save-btn').click();
    cy.get('.row-amount').contains('$1,000.00');
  });
});
