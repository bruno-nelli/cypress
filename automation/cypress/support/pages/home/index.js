const elem = require('./elements').ELEMENTS;

class Home {
    acessar() {
      cy.visit('http://localhost:4200/#/home');
    }

    acessarCadastro() {
        cy.get(elem.buttonRegister).should('be.visible');
        cy.get(elem.buttonRegister).click();
    }

    logar(usuario, senha) {
      cy.get(elem.inputUserName).type(usuario)
      cy.get(elem.inputPassword).type(senha)
      cy.get(elem.buttonLogin).click()

      cy.get(elem.divUserName).should('contain', usuario)
      cy.get(elem.divPhotos).should('contain', 'Sorry, no photos')
      cy.get(elem.divNavbar).should('be.visible')
      cy.get(elem.divNavbarBrand).should('be.visible')
    }
}

export default new Home();