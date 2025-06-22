import { getCurrentDateTime } from "../helpers/date.helper";
import * as loginData from "../fixtures/login-data.json";
import * as editalData from "../fixtures/edital-medio-data.json";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    cy.typelogin(
      loginData.url_sistema, // [URL do sistema]
      loginData.usuario, // [E-mail do usuário]
      loginData.senha // [Senha do usuário]
    );
  });

  // it('Deve verificar corretude da pagina de login acessada', () => {
  //   cy.title().should('eq', 'SigFap');
  // })

  it("Realiza login no sistema e cria um edital médio", () => {
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
    // verifica a url após logado
    cy.url().should("include", "/editar-perfil");

    // Navega para a página de Editais
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();

    // Fecha o menu lateral se estiver aberto
    cy.get(".css-jir0u").should("be.visible").click();

    // Clica no botão para adicionar um novo edital
    cy.get('[data-cy="add-publicar-edital"]').should("be.visible").click();

    // Preenche os campos do edital médio
    // Nome do edital
    cy.get('[data-cy="nome"]')
      .as("nomeEditalInput")
      .type(editalData.titulo_projeto, { delay: 0 })
      .should("have.value", editalData.titulo_projeto);
    
      // Restrições do edital
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
    
      // Termo de Aceite
    cy.get('[data-cy="termo-de-aceite"]').should("be.visible").click();
    cy.typeInCKEditor('[data-cy="termoDeAceite"]', editalData.termo_de_aceite);
    
    // Texto do Edital
    cy.get('[data-cy="texto-do-edital"]').should("be.visible").click();
    cy.typeInCKEditor('[data-cy="texto"]', editalData.texto_do_edital);
    
    // Abrangência
    cy.get('[data-cy="abrangencia"]').should("be.visible").click();
    // Se já estiver selecionado, não precisa clicar novamente
    cy.get('[data-cy="estado-sao-paulo"]')
      .should("be.visible")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get('[data-cy="estado-mato-grosso-do-s"]')
      .should("be.visible")
      .click()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    
      // Cronograma
    cy.get('[data-cy="cronograma"]').should("be.visible").click();
    cy.get('[data-cy="periodo-de-submissao"]').should("be.visible").click();
    
    // Adiciona um novo período de submissão
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 })); 
    cy.get('[data-cy="chamada-confirmar"]').should("be.visible").click();
    
    // Orçamento
    cy.get('[data-cy="orcamento"]').should("be.visible").click();
    cy.get('[data-cy="programa"]').should("be.visible").click();
    
    // Seleciona o programa
    cy.selectMuiOptionByText('programaId', editalData.programa_index_id);
    
    // Perguntas
    cy.get('[data-cy="perguntas"]').should("be.visible").click();
    cy.get('[data-cy="indicadores-de-producao"]').should("be.visible").click();
    // Adiciona um novo indicador de produção
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao1);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();
    // Adiciona um novo indicador de produção
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao2);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();
    // Adiciona um novo indicador de produção
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao3);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();

    // Salva o edital
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

    // Resultado esperado:
    // Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.
  });
});