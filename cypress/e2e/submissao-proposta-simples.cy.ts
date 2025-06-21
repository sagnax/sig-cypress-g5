import * as loginData from "../fixtures/login-data.json";

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

  it("Realiza login no sistema e submete uma proposta", () => {
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="editais-ver-mais"]').click();

    cy.get(".MuiInputBase-input").type("Grupo-05 E.S. 001/2025 lucas-marques");

    cy.get('[data-cy="visualizar-edital-grupo-05-e-s-001"]').click();

    cy.wait(500);
    cy.get('[data-cy="criar-proposta"]').should("be.visible").click();
    cy.wait(500);

    cy.get('[data-cy="tituloDoProjeto"]').type("Submissão de Proposta Cypress",{ delay: 0 });

    cy.selectMuiOptionByText("unidadeExecutoraId", "FACOM/");

    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click();
    cy.selectMuiOptionByText("areaDeConhecimento.0.areaId", "Ciência da Computação");
    cy.selectMuiOptionByText("areaDeConhecimento.0.subAreaId", "Sistemas de Computação");
    cy.selectMuiOptionByText("areaDeConhecimento.0.especialidadeId", "Arquitetura de Sistemas de Computação");

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-cy="abrangencia-adicionar"]').click();
    cy.selectMuiOptionByText("abrangencia.0.estadoId", "São Paulo");
    cy.selectMuiOptionByText("abrangencia.0.abrangenciaMunicipio", "Adamantina");

    cy.get('[data-cy="next-button"]').click();
    cy.selectMuiOptionByText("criadoPor.racaCorId", "Branco(a)");
    cy.get('[data-cy="criadoPor.nome"]').clear().type("Lucas Marques",{ delay: 0 });
    cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type("Lucas",{ delay: 0 });
    cy.selectMuiOptionByText("criadoPor.paisId", "Brasil");
    cy.get('[data-cy="criadoPor.dataNascimento"]').type("01/02/1991",{ delay: 0 });
    cy.get('[data-cy="criadoPor.documento"]').type("44215890047",{ delay: 0 });

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-cy="criadoPor.endereco.cep"]').type("79090060",{ delay: 0 });
    cy.get('[data-cy="criadoPor.endereco.numero"]').type("123",{ delay: 0 });
    cy.get('[data-cy="criadoPor.endereco.complemento"]').type("Apto 101",{ delay: 0 });
    
    cy.wait(3000);
    cy.get('[data-cy="next-button"]').click();

    cy.selectMuiOptionByText("criadoPor.unidadeId", "FACOM/Faculdade de Computação");
    cy.selectMuiOptionByText("criadoPor.nivelAcademicoId", "Ensino Superior");
    cy.get('[data-cy="criadoPor.lattes"]').clear().type("http://lattes.cnpq.br/1234567890123456",{ delay: 0 });
    cy.get('[data-cy="criadoPor.linkedin"]').clear().type("https://www.linkedin.com/in/lucas-marques-123456789",{ delay: 0 });
    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click();
    cy.selectMuiOptionByText("criadoPor.areaDeConhecimento.0.areaId", "Ciência da Computação");
    cy.selectMuiOptionByText("criadoPor.areaDeConhecimento.0.subAreaId", "Sistemas de Computação");
    cy.selectMuiOptionByText("criadoPor.areaDeConhecimento.0.especialidadeId", "Arquitetura de Sistemas de Computação");

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-cy="termoDeAceiteAceito"]').check().should("be.checked");


  });
});
