import { getCurrentDateTime } from "../helpers/date.helper";
import * as loginData from "../fixtures/login-data.json";
import * as editalData from "../fixtures/edital-completo-data.json";

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
    // Seleciona a abrangência
    cy.get('[data-cy="estado-sao-paulo"]')
      .should("be.visible")
      .should("have.css", "background-color", "rgb(255, 255, 255)")
      .click();
    cy.get('[data-cy="estado-todos"]')
      .should("be.visible")
      .click()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    
    // Informações Complementares
    cy.get('[data-cy="informacoes-complementares"]').should("be.visible").click();
    // Adicionar informações complementares
    cy.selectInputOption('perguntaInfoId', editalData.informacao_complementar1);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaInfoId', editalData.informacao_complementar2);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaInfoId', editalData.informacao_complementar3);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaInfoId', editalData.informacao_complementar4);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaInfoId', editalData.informacao_complementar5);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();

    // Cronograma
    cy.get('[data-cy="cronograma"]').should("be.visible").click();
    cy.get('[data-cy="periodo-de-submissao"]').should("be.visible").click();
    
    // Adiciona um novo período de submissão
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]')
      .as("periodoSubmissaoInicio")
      .should("be.visible")
      .type(editalData.periodo_de_submissao_inicio)
      .should("have.value", editalData.periodo_de_submissao_inicio);
    cy.get('[data-cy="chamadaUnsaved.termino"]')
      .as("periodoSubmissaoFim")
      .should("be.visible")
      .type(editalData.periodo_de_submissao_fim)
      .should("have.value", editalData.periodo_de_submissao_fim);
    cy.get('[data-cy="chamada-confirmar"]').should("be.visible").click();
    
    // Orçamento -> Programa
    cy.get('[data-cy="orcamento"]').should("be.visible").click();
    cy.get('[data-cy="programa"]').should("be.visible").click();
    
    // Seleciona o programa
    cy.selectInputOption('programaId', editalData.orcamento_programa);

    // Rubrica
    cy.get('[data-cy="rubricas"]').should("be.visible").click();
    
    // Adicionar Rubrica
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('editalRubricaUnsaved.tipoEditalRubrica', editalData.rubrica_tipo1);
    cy.selectInputOption('editalRubricaUnsaved.naturezaDespesaId', editalData.rubrica_natureza1);
    cy.get('[data-cy="editalRubrica-confirmar"]').should("be.visible").click();

    // Faixas de Financiamento
    cy.get('[data-cy="faixas-de-financiamento"]').should("be.visible").click();
    
    // Adicionar Faixa de Financiamento 1
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').clear().type(editalData.nome_faixa_financiamento1, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').clear().type(editalData.valor_minimo_faixa_financiamento1, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').clear().type(editalData.valor_maximo_faixa_financiamento1, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').clear().type(editalData.observacao_faixa_financiamento1, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').should("be.visible").click();
    // Adicionar Faixa de Financiamento 2
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(editalData.nome_faixa_financiamento2, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').clear().type(editalData.valor_minimo_faixa_financiamento2, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').clear().type(editalData.valor_maximo_faixa_financiamento2, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').clear().type(editalData.observacao_faixa_financiamento2, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').should("be.visible").click();
    // Adicionar Faixa de Financiamento 3
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').clear().type(editalData.nome_faixa_financiamento3, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').clear().type(editalData.valor_minimo_faixa_financiamento3, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').clear().type(editalData.valor_maximo_faixa_financiamento3, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').clear().type(editalData.observacao_faixa_financiamento3, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').should("be.visible").click();
    // Adicionar Faixa de Financiamento 4
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').clear().type(editalData.nome_faixa_financiamento4, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').clear().type(editalData.valor_minimo_faixa_financiamento4, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').clear().type(editalData.valor_maximo_faixa_financiamento4, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').clear().type(editalData.observacao_faixa_financiamento4, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').should("be.visible").click();
    // Adicionar Faixa de Financiamento 5
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').clear().type(editalData.nome_faixa_financiamento5, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').clear().type(editalData.valor_minimo_faixa_financiamento5, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').clear().type(editalData.valor_maximo_faixa_financiamento5, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').clear().type(editalData.observacao_faixa_financiamento5, { delay: 0 })
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').should("be.visible").click();

    // Documentos
    cy.get('[data-cy="documentos"]').should("be.visible").click();
    cy.get('[data-cy="documentos-da-proposta"]').should("be.visible").click();
    
    // Adiciona um novo documento da proposta 1
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').should("be.visible").click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').should("be.visible").click();
    cy.get('[data-cy-index="documentoPropostaEdital-0-expandable-item"]').should("be.visible").click();
    cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type(editalData.documento_proposta_nome1, { delay: 0 })
    cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').type(editalData.documento_proposta_descricao1, { delay: 0 })
    cy.selectInputOption("documentoPropostaEdital.0.formatoArquivo", editalData.documento_proposta_formato1);
    cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type(editalData.documento_proposta_tamanho1, { delay: 0 })
    // Adiciona um novo documento da proposta 2
    cy.get('[data-cy-index="documentoPropostaEdital-1-expandable-item"]').should("be.visible").click();
    cy.get('[data-cy="documentoPropostaEdital.1.nome"]').type(editalData.documento_proposta_nome2, { delay: 0 })
    cy.get('[data-cy="documentoPropostaEdital.1.descricao"]').type(editalData.documento_proposta_descricao2, { delay: 0 })
    cy.selectInputOption("documentoPropostaEdital.1.formatoArquivo", editalData.documento_proposta_formato2);
    cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]').type(editalData.documento_proposta_tamanho2, { delay: 0 })

    cy.get('[data-cy="documentos-pessoais"]').should("be.visible").click();
    // Adiciona novo documento pessoal 1
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectInputOption('documentoPessoalEdital.0.documentoPessoalId', editalData.documento_pessoal1);
    // Adiciona novo documento pessoal 2
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectInputOption('documentoPessoalEdital.1.documentoPessoalId', editalData.documento_pessoal2);
    // Adiciona novo documento pessoal 3
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectInputOption('documentoPessoalEdital.2.documentoPessoalId', editalData.documento_pessoal3);
    // Adiciona novo documento pessoal 4
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectInputOption('documentoPessoalEdital.3.documentoPessoalId', editalData.documento_pessoal4);
    // Adiciona novo documento pessoal 5
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectInputOption('documentoPessoalEdital.4.documentoPessoalId', editalData.documento_pessoal5);

    // Perguntas
    cy.get('[data-cy="perguntas"]').should("be.visible").click();
    
    cy.get('[data-cy="descricao-do-projeto"]').should("be.visible").click();
    // Adiciona um novo descrição do projeto
    cy.selectInputOption('perguntaDescId', editalData.descricao_projeto1);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaDescId', editalData.descricao_projeto2);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaDescId', editalData.descricao_projeto3);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaDescId', editalData.descricao_projeto4);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    cy.selectInputOption('perguntaDescId', editalData.descricao_projeto5);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    
    cy.get('[data-cy="indicadores-de-producao"]').should("be.visible").click();
    // Adiciona um novo indicador de produção
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('indicadorProducaoUnsaved.id', editalData.indicador_producao1);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();

    // Adiciona um novo indicador de produção
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('indicadorProducaoUnsaved.id', editalData.indicador_producao2);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();

    // Adiciona um novo indicador de produção
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('indicadorProducaoUnsaved.id', editalData.indicador_producao3);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();

    //Bolsas do Edital
    cy.get('[data-cy="bolsas-do-edital"]').should("be.visible").click();
    cy.get('[data-cy="bolsas"]').should("be.visible").click();
    // Adiciona uma nova bolsa
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa1);
    cy.selectInputOption('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa1);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa2);
    cy.selectInputOption('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa2);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa3);
    cy.selectInputOption('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa3);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa4);
    cy.selectInputOption('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa4);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectInputOption('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa5);
    cy.selectInputOption('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa5);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();

    // Salva o edital
    cy.get('[data-cy="menu-salvar"]').should("be.visible").click();
    cy.get('[data-cy="menu-finalizar"]').should("be.visible").click();

    // Resultado esperado:
    // Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.
  });
});