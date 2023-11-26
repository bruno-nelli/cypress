const elem = require('./elements').ELEMENTS;

class AreaLogada {
  navegarParaAdicionarFotos() {
    cy.get(elem.btnAdicionarFotos).click();
  }
}

export default new AreaLogada();
