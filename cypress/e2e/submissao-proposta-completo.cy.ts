import * as loginData from "../fixtures/login-data.json";
import { getCurrentDateTime } from "../helpers/date.helper";

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

  it("Realiza login no sistema e submete uma proposta para um Edital Completo", () => {
    // Navega para a página inicial
    cy.get('[data-cy="breadcrumb-home"]').click();
    // Navega para a pagina de ver mais editais
    cy.get('[data-cy="editais-ver-mais"]').click();

    // Pesquisa pelo edital
    cy.get(".MuiInputBase-input").type("Grupo-05 E.C. 005/2025 lucas-marques");
    // Visualiza o primeiro edital encontrado
    cy.get(':nth-child(1) > .MuiListItem-root > .e1w0rc4q5 > .e1w0rc4q2 > .MuiButtonBase-root').click();

    // Espera o carregamento do edital
    cy.wait(500);
    // Clica no botão de submeter proposta
    cy.get('[data-cy="criar-proposta"]').should("be.visible").click();
    // Espera o carregamento da página de submissão de proposta
    cy.wait(500);

    // Caracterização
    cy.get('[data-cy="caracterizacao"]').should("be.visible").click();
    // Informações Iniciais
    cy.get('[data-cy="informacoes-iniciais"]').should("be.visible").click();
    // Preenchendo os campos de informações iniciais
    cy.get('[data-cy="tituloDoProjeto"]').type("Submissão de Proposta Cypress",{ delay: 0 });
    cy.selectMuiOptionByText("unidadeExecutoraId", "FACOM/");
    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click();
    cy.selectMuiOptionByText("areaDeConhecimento.0.areaId", "Ciência da Computação");
    cy.selectMuiOptionByText("areaDeConhecimento.0.subAreaId", "Sistemas de Computação");
    cy.selectMuiOptionByText("areaDeConhecimento.0.especialidadeId", "Arquitetura de Sistemas de Computação");
    // Informações Complementares
    cy.get('[data-cy="informacoes-complementares"]').should("be.visible").click();

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-smart-city"]')
      .click()
    cy.wait(250)
    cy.get('[data-cy-index="formularioPropostaInformacaoComplementar.pergunta-25-item-0"]').click();
    cy.get('[data-cy-index="formularioPropostaInformacaoComplementar.pergunta-25-item-1"]').click();


    //formularioPropostaInformacaoComplementar.pergunta-25-item-agronegocios

    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-agronegocios"]').click();
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]').clear().type("30/07/2025",{ delay: 0 });
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]').clear().type("Lorem Ipsum Dolor Met",{ delay: 0 });
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-23-item-ods01-erradicar"]').click();
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-24-item-grande-faturamen"]').click();


    cy.get('[data-cy="menu-salvar"]').should("be.visible").click();
    cy.wait(1500);

    // cy.pause()

    // Abrangência
    // ========== atencao
    // esta etapa esta com bug e nao deixa salvar no final

    // cy.get('[data-cy="abrangencia"]').should("be.visible").click();
    // // Preenchendo os campos de abrangência
    // cy.get('[data-cy="abrangencia-adicionar"]').click();
    // cy.selectMuiOptionByText("abrangencia.0.estadoId", "São Paulo");
    // cy.selectMuiOptionByText("abrangencia.0.abrangenciaMunicipio", "Adamantina");

    cy.get('[data-cy="menu-salvar"]').should("be.visible").click();
    cy.wait(1500);

    //Coordenação
    cy.get('[data-cy="coordenacao"]').should("be.visible").click();
    // Dados Pessoais
    cy.get('[data-cy="dados-pessoais"]').should("be.visible").click();
    cy.get('[data-cy="criadoPor.nome"]').clear().type("Lucas Marques",{ delay: 0 });
    cy.selectMuiOptionByText("criadoPor.racaCorId", "Branco(a)");
    cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type("Lucas",{ delay: 0 });
    cy.selectMuiOptionByText("criadoPor.paisId", "Brasil");
    cy.get('[data-cy="criadoPor.dataNascimento"]').clear().type("01/02/1991",{ delay: 0 });
    cy.get('[data-cy="criadoPor.documento"]').clear().type("44215890047",{ delay: 0 });
    // Endereço
    cy.get('[data-cy="endereco"]').should("be.visible").click();
    cy.get('[data-cy="criadoPor.endereco.cep"]').type("79090060",{ delay: 0 });
    cy.get('[data-cy="criadoPor.endereco.numero"]').type("123",{ delay: 0 });
    cy.get('[data-cy="criadoPor.endereco.complemento"]').type("Apto 101",{ delay: 0 });
    cy.wait(3000);
    // Dados Academicos
    cy.get('[data-cy="dados-academicos"]').should("be.visible").click();
    cy.selectMuiOptionByText("criadoPor.unidadeId", "FACOM/Faculdade de Computação");
    cy.selectMuiOptionByText("criadoPor.nivelAcademicoId", "Ensino Superior");
    cy.get('[data-cy="criadoPor.lattes"]').clear().type("http://lattes.cnpq.br/1234567890123456",{ delay: 0 });
    cy.get('[data-cy="criadoPor.linkedin"]').clear().type("https://www.linkedin.com/in/lucas-marques-123456789",{ delay: 0 });
    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click();
    cy.selectMuiOptionByText("criadoPor.areaDeConhecimento.0.areaId", "Ciência da Computação");
    cy.selectMuiOptionByText("criadoPor.areaDeConhecimento.0.subAreaId", "Sistemas de Computação");
    cy.selectMuiOptionByText("criadoPor.areaDeConhecimento.0.especialidadeId", "Arquitetura de Sistemas de Computação");
    // Dados Profissionais
    cy.get('[data-cy="dados-academicos"]').should("be.visible").click();

    // Apresentação
    cy.get('[data-cy="apresentacao"]').should("be.visible").click();
    // Descrição
    cy.get('[data-cy="descricao"]').should("be.visible").click();
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-6"]').clear().type("Objetivos do projeto de pesquisa utilizando Cypress",{ delay: 0 });
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-7"]').clear().type("Metodologia do projeto de pesquisa utilizando Cypress",{ delay: 0 });
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-3"]').clear().type("Resumo do projeto de pesquisa utilizando Cypress",{ delay: 0 });
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-4"]').clear().type("Sintese do projeto de pesquisa utilizando Cypress",{ delay: 0 });
    cy.get('[data-cy="formularioPropostaDescritiva.pergunta-5"]').clear().type("Objetivo Geral do projeto de pesquisa utilizando Cypress",{ delay: 0 });
    // Indicadores de Produção
    cy.get('[data-cy="indicadores-de-producao"]').should("be.visible").click();
    // Membros
    cy.get('[data-cy="membros"]').should("be.visible").click();
    // Atividades
    cy.get('[data-cy="atividades"]').should("be.visible").click();

    // Orçamento
    cy.get('[data-cy="orcamento"]').should("be.visible").click();
    // Faixa de Financiamento
    cy.get('[data-cy="faixa-de-financiamento"]').should("be.visible").click();
    cy.selectMuiOptionByText("faixaFinanciamentoId", "faixa-1");
    cy.get('[data-cy="diarias"]').should("be.visible").click();
    cy.get('[data-cy="add-button"]').should("be.visible").click();


    cy.wait(1500);

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
