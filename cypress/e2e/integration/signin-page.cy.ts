describe('Sign in Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  context('Page Loaded', () => {
    it('displays the app title', () => {
      cy.getByData('sign-in-heading').should('exist').contains('Poorcast');
    })
    
    it('displays the raining loading logo', () => {
      cy.get('app-logo').should('exist').invoke('attr', 'ng-reflect-raining').should('eq', 'true')
    })

    it('displays the signin form', () => {
      cy.get('app-fieldset').invoke('attr', 'ng-reflect-legend').should('eq', 'Sign In')
    })
  })

  context('Signin Form', () => {
    it('accepts valid email', () => {
      cy.getByData('email').type('test@test.com')
      cy.getByData('feedback-message').should('not.exist')
    })
    it('provides feedback on invalid email', () => {
      cy.getByData('email').type('test')
      cy.getByData('feedback-message').should('exist')
    })

    it('accepts valid password', () => {
      cy.getByData('password').type('12345678')
      cy.getByData('feedback-message').should('not.exist')
    })
    it('provides feedback on invalid password', () => {
      cy.getByData('password').type('seven')
      cy.getByData('feedback-message').should('exist')
    })
  })

  
  context('Signup Form', () => {
    beforeEach(() => {
      cy.getByData('new-account').click();
    })

    it('displays the sign up form', () => {
      cy.get('app-fieldset').invoke('attr', 'ng-reflect-legend').should('eq', 'Sign Up')
    })

    it('accepts valid email', () => {
      cy.getByData('email').type('test@test.com')
      cy.getByData('feedback-message').should('not.exist')
    })
    it('provides feedback on invalid email', () => {
      cy.getByData('email').type('test')
      cy.getByData('feedback-message').should('exist')
    })

    it('accepts valid password', () => {
      cy.getByData('password').type('12345678')
      cy.getByData('feedback-message').should('not.exist')
    })
    it('provides feedback on invalid password', () => {
      cy.getByData('password').type('seven')
      cy.getByData('feedback-message').should('exist')
    })

    it('accepts valid confirm password', () => {
      cy.getByData('password').type('12345678')
      cy.getByData('password-confirm').type('12345678')
      cy.getByData('feedback-message').should('not.exist')
    })
    it('provides feedback on invalid confirm password', () => {
      cy.getByData('password').type('12345678')
      cy.getByData('password-confirm').type('seven')
      cy.getByData('feedback-message').should('exist')
    })
  })

  context('Password Reset', () => {
    beforeEach(() => {
      cy.getByData('new-account').click();
      cy.getByData('password-reset').click();
    })

    it('accepts valid email', () => {
      cy.getByData('email').type('test@test.com')
      cy.getByData('feedback-message').should('not.exist')
    })
    it('provides feedback on invalid email', () => {
      cy.getByData('email').type('test')
      cy.getByData('feedback-message').should('exist')
    })
  })
})