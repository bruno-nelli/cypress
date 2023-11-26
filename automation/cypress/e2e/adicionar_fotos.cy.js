import home from '../support/pages/home'
import areaLogada from '../support/pages/areaLogada'
import adicionarFotos from '../support/pages/adicionarFotos'

describe('Validações da funcionalidade de upload', () => {

  beforeEach(() => {
    home.acessar()
  })

  it('Realizar upload de uma foto em uma nova conta', () => {
    const timestamp = new Date().getTime()
    cy.criarConta(timestamp)
    home.logar(timestamp, 'fghijklm')
    areaLogada.navegarParaAdicionarFotos()
    adicionarFotos.adicionar()
  })
})
