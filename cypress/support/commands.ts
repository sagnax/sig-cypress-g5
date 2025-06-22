// cypress/support/commands.ts

Cypress.Commands.add('typelogin', (url, username, password) => {
  // Pré-condição: Realiza o login no sistema antes de cada teste
  cy.visit(url);
  cy.intercept('POST', '/login').as('loginRequest');

  cy.get('#login')
    .as('loginInput')
    .type(username)
    .should('have.value', username);

  cy.get('#senha')
    .as('passwordInput')
    .type(password)
    .should('have.value', password);
  
  cy.get('.css-1wz47u4 > .MuiButton-root')
    .should('be.visible')
    .should('not.be.disabled')
    .click();

  cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
  
  cy.url().should("include", "/editar-perfil"); // Confirma que o login foi bem-sucedido
});

Cypress.Commands.add('typeInCKEditor', (selector: string, content: string) => {
  return cy.get(selector).then(element => {
    const editorInstance = (element[0] as any).ckeditorInstance;
    if (editorInstance) {
      editorInstance.setData(content);
    } else {
      // Fallback if the instance isn't found directly
      cy.get(selector).find('.ck-editor__editable').clear().type(content);
    }
  });
});

Cypress.Commands.add('selectMuiOptionByText', (selectDataCy: string, optionText: string) => {
  cy.get(`[data-cy="${selectDataCy}"]`).click();

  cy.get('[role="listbox"]').should('be.visible');

  cy.get('[role="listbox"]').contains('li', optionText).click();

  cy.wait(250); // Aguarda a atualização do componente
});