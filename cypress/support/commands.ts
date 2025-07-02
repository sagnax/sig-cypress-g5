// cypress/support/commands.ts

// Adiciona um comando customizado para realizar login no sistema
Cypress.Commands.add('typelogin', (url, username, password) => {
  // Pré-condição: Realiza o login no sistema antes de cada teste
  cy.visit(url);
  cy.intercept('POST', '/login').as('loginRequest');

  // Preenche o campo de login
  cy.get('#login')
    .as('loginInput')
    .type(username)
    .should('have.value', username);

  // Preenche o campo de senha
  cy.get('#senha')
    .as('passwordInput')
    .type(password)
    .should('have.value', password);
  
  // Clica no botão de login
  cy.get('.css-1wz47u4 > .MuiButton-root')
    .should('be.visible')
    .should('not.be.disabled')
    .click();

  // Aguarda a resposta da requisição de login e valida o status
  cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
  
  // Confirma que o login foi bem-sucedido pela URL
  cy.url().should("include", "/editar-perfil");
});

// Adiciona um comando customizado para digitar texto em um CKEditor
Cypress.Commands.add('typeInCKEditor', (selector: string, content: string) => {
  return cy.get(selector).then(element => {
    // Tenta acessar a instância do CKEditor diretamente
    const editorInstance = (element[0] as any).ckeditorInstance;
    if (editorInstance) {
      editorInstance.setData(content);
    } else {
      // Fallback: digita diretamente no editor se a instância não for encontrada
      cy.get(selector).find('.ck-editor__editable').clear().type(content);
    }
  });
});

// Adiciona um comando customizado para selecionar uma opção em um componente MUI Select pelo texto
Cypress.Commands.add('selectMuiOptionByText', (selectDataCy: string, optionText: string) => {
  
  // Abre o dropdown do select
  cy.get(`[data-cy="${selectDataCy}"]`).click();

  // Garante que a lista de opções está visível
  cy.get('[role="listbox"]').should('be.visible');

  // Seleciona a opção desejada pelo texto
  cy.get('[role="listbox"]').contains('li', optionText).click();

  // Aguarda a atualização do componente após a seleção
  cy.wait(250);
});


// Adiciona um comando customizado para selecionar uma opção em um componente MUI Select pelo texto
Cypress.Commands.add('selectMuiOptionByTextAddress', (selectDataCy: string, optionText: string) => {
  
  // Abre o dropdown do select
  cy.get(`[data-cy="${selectDataCy}"]`).parent('.MuiInputBase-root').click();

  cy.wait(250); // Aguarda o dropdown abrir

  // Garante que a lista de opções está visível
  cy.get('[role="listbox"]')
    .scrollIntoView()
    .should('be.visible');

  // Seleciona a opção desejada pelo texto
  cy.get('[role="listbox"]').contains('li', optionText).click({ force: true});

  // Aguarda a atualização do componente após a seleção
  cy.wait(250);
});