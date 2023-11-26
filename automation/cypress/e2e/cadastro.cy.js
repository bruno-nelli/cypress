import home from '../support/pages/home'
import cadastro from '../support/pages/cadastro'

describe('Validações da funcionalidade Cadastro', () => {
  let registrationData;

  beforeEach(() => {
    home.acessar()
  })

  it('Cadastro de novo usuário', () => {
    const timestamp = new Date().getTime()
    const email = `${timestamp}@email.com`

    home.acessarCadastro()
    cadastro.cadastrar(email, timestamp)

    registrationData = { timestamp, email };
  })

  it('Cadastro mal-sucedido com dados inválidos', () => {
    home.acessarCadastro()
    cadastro.cadastrarDadosInvalidos()
  })

  it('Cadastro mal-sucedido com usuário já existente', () => {
    home.acessarCadastro()
    cadastro.cadastrarDadosExistentes(registrationData.email, registrationData.timestamp)
  })

  it('Login bem-sucedido com os dados registrados', () => {
    home.logar(registrationData.timestamp, 'fghijklm')
  })
})
