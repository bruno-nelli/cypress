const elem = require('./elements').ELEMENTS;

class Cadastro {
  cadastrar(email, timestamp) {
    cy.get(elem.inputEmail).type(email);
    cy.get(elem.inputFullName).type(timestamp);
    cy.intercept('GET', `/user/exists/${timestamp}`).as('userExists')
    cy.get(elem.inputUserName).type(timestamp);
    cy.wait('@userExists').its('response.body').should('eq', false);
    cy.get(elem.inputPassword).type('fghijklm');
    cy.intercept('POST', `/user/signup`).as('userSignup')
    cy.get(elem.buttonRegister).click();
    cy.wait('@userSignup').its('response.statusCode').should('eq', 204);
  }

  cadastrarDadosExistentes(email, timestamp) {
    cy.get(elem.inputEmail).type(email);
    cy.get(elem.inputFullName).type(timestamp);
    cy.intercept('GET', `/user/exists/${timestamp}`).as('userExists')
    cy.get(elem.inputUserName).type(timestamp);
    cy.wait('@userExists').its('response.body').should('eq', true);
    cy.contains('Username already taken').should('be.visible')
  }

  cadastrarDadosInvalidos() {
    cy.get(elem.buttonRegister).click();
    cy.get(elem.textError).should('contain', 'Email is required')
    cy.get(elem.inputEmail).type('invalid')
    cy.contains('Email is required').should('not.exist')
    cy.get(elem.textError).should('contain', 'Invalid e-mail')
    cy.get(elem.inputEmail).clear()
    cy.get(elem.inputEmail).type('valid@email.com')
    cy.contains('Invalid e-mail').should('not.exist')
    cy.get(elem.buttonRegister).click();
    cy.contains('Full name is required!').should('be.visible')
    cy.contains('User name is required!').should('be.visible')
    cy.contains('Password is required!').should('be.visible')
    cy.get(elem.inputFullName).type('Full Name')
    cy.contains('Full name is required!').should('not.exist')
    cy.get(elem.inputUserName).type('NewUserName')
    cy.contains('User name is required!').should('not.exist')
    cy.contains('Must be lower case').should('be.visible')
    cy.get(elem.inputUserName).clear()
    cy.get(elem.inputUserName).type('newusername')
    cy.contains('Must be lower case').should('not.exist')
    cy.get(elem.inputPassword).type('123456')
    cy.contains('Password is required!').should('not.exist')
    cy.contains('Mininum length is 8').should('be.visible')
    cy.get(elem.inputPassword).type('78')
    cy.contains('Mininum length is 8').should('not.exist')
  }
}

export default new Cadastro();
