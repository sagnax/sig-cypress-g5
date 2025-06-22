import { getCurrentDateTime } from "../helpers/date.helper";
import * as loginData from "../fixtures/login-data.json";
import * as editalData from "../fixtures/edital-medio-data.json";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    cy.typelogin(
      loginData.url_sistema, // [URL do sistema]
      loginData.usuario, // [E-mail do usuário gestor]
      loginData.senha // [Senha do usuário gestor]
    );
  });

  it("Realiza login no sistema e cria um edital médio", () => {
    // Passo 1 e 2: Acessar a funcionalidade e iniciar a criação
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    // Fecha o menu lateral se estiver aberto
    cy.get(".css-jir0u").should("be.visible").click();
    // Clica no botão para adicionar um novo edital
    cy.get('[data-cy="add-publicar-edital"]').should("be.visible").click();

    // Passo 3 - Step 1: Informações do Edital (US-08)
    // Passo 3 - Substep Identificação do Edital (US-09)
    cy.get('[data-cy="nome"]')
      .type(editalData.titulo_projeto, { delay: 0 })
      .should("have.value", editalData.titulo_projeto);
    
    // Passo 3 - Substep Restrições (US-10)
    cy.get('[data-cy="restricoes"]').should("be.visible").click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]')
      .check()
      .should("be.checked");
    cy.get('[data-cy="duracaoProjetoEmMeses"]')
      .type(editalData.duracao_projeto_meses)
      .should("have.value", editalData.duracao_projeto_meses);
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]')
      .check()
      .should("be.checked");
    
    // Passo 3 - Substep Termo de Aceite (US-11)
    cy.get('[data-cy="termo-de-aceite"]').should("be.visible").click();
    cy.typeInCKEditor('[data-cy="termoDeAceite"]', editalData.termo_de_aceite);
    
    // Passo 3 - Substep Texto do Edital (US-12)
    cy.get('[data-cy="texto-do-edital"]').should("be.visible").click();
    cy.typeInCKEditor('[data-cy="texto"]', editalData.texto_do_edital);
    
    // Passo 3 - Substep Abrangência (US-13)
    cy.get('[data-cy="abrangencia"]').should("be.visible").click();
    cy.get('[data-cy="estado-sao-paulo"]')
      .should("be.visible")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get('[data-cy="estado-mato-grosso"]')
      .should("be.visible")
      .click()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get('[data-cy="estado-mato-grosso-do-s"]')
      .should("be.visible")
      .click()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    
    // Passo 4 - Step 2: Cronograma (US-16)
    // Passo 4 - Substep Período de Submissão (US-17)
    cy.get('[data-cy="cronograma"]').should("be.visible").click();
    cy.get('[data-cy="periodo-de-submissao"]').should("be.visible").click();
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 })); 
    cy.get('[data-cy="chamada-confirmar"]').should("be.visible").click();
    
    // Passo 5 - Step 3: Orçamento (US-19)
    // Passo 5 - Substep Programa (US-20)
    cy.get('[data-cy="orcamento"]').should("be.visible").click();
    cy.get('[data-cy="programa"]').should("be.visible").click();
    cy.selectMuiOptionByText('programaId', editalData.programa_index_id);
    
    // Passo 6 - Step 4: Perguntas (US-26)
    // Passo 6 - Substep Indicadores de Produção (US-28)
    cy.get('[data-cy="perguntas"]').should("be.visible").click();
    cy.get('[data-cy="indicadores-de-producao"]').should("be.visible").click();
    // Adiciona Indicador 1
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao1);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();
    // Adiciona Indicador 2
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao2);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();
    // Adiciona Indicador 3
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao3);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();

    // Passo 7 e 8: Salvar e Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

    // Resultado esperado:
    // Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.
    cy.url().should("include", "/edital"); // Confirma o retorno para a tela de gerenciamento
    cy.contains(editalData.titulo_projeto).should("be.visible"); // Verifica se o edital aparece na lista
  });
});