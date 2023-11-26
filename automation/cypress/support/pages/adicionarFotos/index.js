const elem = require('./elements').ELEMENTS;

class AdicionarFotos {
  adicionar() {
    cy.get(elem.inputFile).selectFile('cypress/fixtures/wishdragon.png', { force: true });
    cy.get(elem.buttonUpload).click();
    cy.contains('Upload complete').should('be.visible');
    cy.get(elem.imageThumbnail).should('be.visible');
  }
}

export default new AdicionarFotos();
