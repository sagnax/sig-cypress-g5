import * as loginData from "../fixtures/login-data.json";
import { getCurrentDateTime } from "../helpers/date.helper";

const urlEdicao = 'https://novo-sig.ledes.net/minhas-propostas/2009';

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      loginData.url_sistema, // [URL do sistema]
      loginData.usuario_pesquisador, // [E-mail do usuário]
      loginData.senha_pesquisador // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });

  it("Testa campo de endereço em Apresentação > Orçamento > Diárias", () => {
    
    // cy.visit(urlEdicao);
    cy.get('[data-cy="breadcrumb-home"]').should('be.visible').click();

    cy.get('[data-cy-index="propostas-0"]').should('be.visible').click();

    cy.get('[data-cy="apresentacao"]').should('be.visible').click();

    // Orçamento
    cy.get('[data-cy="orcamento"]').should("be.visible").click();
    
    cy.get('[data-cy="diarias"]').should("be.visible").click();
    cy.get('[data-cy="add-button"]').should("be.visible").click();

    cy.wait(1500);

    //cy.get('.css-segi59:has([data-cy="rubricaDiariaUnsaved.paisId"])').should('be.visible').click();

    cy.selectMuiOptionByTextAddress("rubricaDiariaUnsaved.paisId", "Brasil");



    cy.wait(3000);

    cy.selectMuiOptionByTextAddress("rubricaDiariaUnsaved.estadoId", "São Paulo");
    cy.selectMuiOptionByText("rubricaDiariaUnsaved.municipio", "Adamantina");
    cy.get('[data-cy="rubricaDiariaUnsaved.numeroDiaria"]').clear().type("10",{ delay: 0 });
    cy.get('[data-cy="rubricaDiariaUnsaved.custoUnitario"]').clear().type("100",{ delay: 0 });
    cy.selectMuiOptionByText("rubricaDiariaUnsaved.mesPrevisto", "1");
    cy.get('[data-cy="rubricaDiariaUnsaved.justificativa"]').clear().type("Justificativa para as diárias",{ delay: 0 });
    cy.get('[data-cy="rubricaDiaria-confirmar"]').click();


    // Termos
    cy.get('[data-cy="termos"]').should("be.visible").click();
    // Termo de Aceite
    cy.get('[data-cy="termo-de-aceite"]').should("be.visible").click();
    cy.get('[data-cy="termoDeAceiteAceito"]').check().should("be.checked");

    // Finalizar a proposta
    cy.get('[data-cy="menu-verificar-penden"]').should("be.visible").click();
    cy.get('[data-cy="menu-salvar"]').should("be.visible").click();

  });
});
