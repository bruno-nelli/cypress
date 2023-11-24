describe('Validações da funcionalidade Cadastro', () => {
  let registrationData;

  beforeEach(() => {
    cy.visit('http://localhost:4200/#/home')
  })

  it('Cadastro de novo usuário', () => {
    const timestamp = new Date().getTime()
    const email = `${timestamp}@email.com`
    
    cy.get('[data-test="register"]').click()
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="fullName"]').type(timestamp)
    cy.intercept('GET', `http://localhost:3000/user/exists/${timestamp}`).as('userExists')
    cy.get('[data-test="registerUserName"]').type(timestamp)
    cy.wait('@userExists').its('response.body').should('eq', false);
    cy.get('[data-test="registerPassword"]').type('fghijklm')
    cy.intercept('POST', `http://localhost:3000/user/signup`).as('userSignup')
    cy.get('[data-test="btnRegister"]').click()
    cy.wait('@userSignup').its('response.statusCode').should('eq', 204);

    registrationData = { timestamp, email };
  })

  it('Cadastro mal-sucedido com dados inválidos', () => {
    cy.get('[data-test="register"]').click()
    cy.get('[data-test="btnRegister"]').click()
    cy.get('.text-danger').should('contain', 'Email is required')
    cy.get('[data-test="email"]').type('invalid')
    cy.get('.text-danger').should('contain', 'Invalid e-mail')
    cy.get('[data-test="email"]').clear()
    cy.get('[data-test="email"]').type('valid@email.com')
    cy.get('[data-test="btnRegister"]').click()
    cy.contains('Full name is required!').should('be.visible')
    cy.contains('User name is required!').should('be.visible')
    cy.contains('Password is required!').should('be.visible')
    cy.get('[data-test="fullName"]').type('Full Name')
    cy.contains('Full name is required!').should('not.exist')
    cy.get('[data-test="registerUserName"]').type('NewUserName')
    cy.contains('User name is required!').should('not.exist')
    cy.contains('Must be lower case').should('be.visible')
    cy.get('[data-test="registerUserName"]').clear()
    cy.get('[data-test="registerUserName"]').type('newusername')
    cy.contains('Must be lower case').should('not.exist')
    cy.get('[data-test="registerPassword"]').type('123456')
    cy.contains('Password is required!').should('not.exist')
    cy.contains('Mininum length is 8').should('be.visible')
    cy.get('[data-test="registerPassword"]').type('78')
    cy.contains('Mininum length is 8').should('not.exist')
  })

  it('Cadastro mal-sucedido com usuário já existente', () => {
    const timestamp = registrationData.timestamp;
    const email = registrationData.email;

    cy.get('[data-test="register"]').click()
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="fullName"]').type(timestamp)
    cy.intercept('GET', `http://localhost:3000/user/exists/${timestamp}`).as('userExists')
    cy.get('[data-test="registerUserName"]').type(timestamp)
    cy.wait('@userExists').its('response.body').should('eq', true);
    cy.contains('Username already taken').should('be.visible')
  })

  it('Login bem-sucedido com os dados registrados', () => {
    const timestamp = registrationData.timestamp;

    cy.get('[data-test="loginUserName"]').type(timestamp)
    cy.get('[data-test="loginPassword"]').type('fghijklm')
    cy.get('[data-test="loginBtn"]').click()

    cy.get('a.mr-1').should('contain', timestamp)
    cy.get('ap-photos > .text-center').should('contain', 'Sorry, no photos')
    cy.get('.navbar').should('be.visible')
    cy.get('.navbar-brand').should('be.visible')
  })
})
