# Cypress
## Projeto de automação E2E e API com Cypress + Aplicação localhost com Angular

## 1. Subir a aplicação alurapic

### Pré-requisitos:
-Node 16.13.1
Para fazer esse controle de versões do Node dentro do Windows, podemos utilizar uma ferramenta chamada NVM for Windows.
https://github.com/coreybutler/nvm-windows/releases
Depois de instalar, enviar os seguintes comandos no cmd ou powershell:

```sh
nvm install 16.13.1
nvm use 16.13.1
```

### Rodando a aplicação via localhost
acesse via terminal a pasta alurapic e digite npm start:
```sh
cd alurapic
npm start
```

A aplicação ficará disponível no endereço http://localhost:4200/

## 2. Preparando o ambiente de automação com Cypress
### Pré-requisitos:
#### Instalar o Cypress
Acesse via terminal a pasta automation e instale o Cypress
```sh
npm install cypress@12.10.0 --save-dev
```

#### Para abrir o Cypress:
```sh
npx cypress open
```

####  Para rodar os testes existentes:
```sh
npx cypress run
```
