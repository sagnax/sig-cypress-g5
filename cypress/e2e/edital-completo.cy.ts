import { getCurrentDateTime } from "../helpers/date.helper";
import * as loginData from "../fixtures/login-data.json";
import * as editalData from "../fixtures/edital-completo-data.json";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    cy.typelogin(
      loginData.url_sistema, // [URL do sistema]
      loginData.usuario, // [E-mail do usuário do gestor]
      loginData.senha // [Senha do usuário do gestor]
    );
  });

  it("Realiza login no sistema e cria um edital completo", () => {
    // Passo 1 e 2: Acessar a funcionalidade e iniciar a criação
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    // Fecha o menu lateral se estiver aberto
    cy.get(".css-jir0u").should("be.visible").click();
    // Clica no botão para adicionar novo edital
    cy.get('[data-cy="add-publicar-edital"]').should("be.visible").click();

    // Passo 3 - Step 1: Informações do Edital (US-08)
    // Passo 3 - Substep Identificação do Edital (US-09)
    cy.get('[data-cy="nome"]')
      .type(editalData.titulo_projeto, { delay: 0 })
      .should("have.value", editalData.titulo_projeto);
    
    // Passo 3 - Substep Restrições (US-10)
    cy.get('[data-cy="restricoes"]').should("be.visible").click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check().should("be.checked");
    cy.get('[data-cy="duracaoProjetoEmMeses"]')
      .type(editalData.duracao_projeto_meses)
      .should("have.value", editalData.duracao_projeto_meses);
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check().should("be.checked");
    
    // Passo 3 - Substep Termo de Aceite (US-11)
    cy.get('[data-cy="termo-de-aceite"]').should("be.visible").click();
    cy.typeInCKEditor('[data-cy="termoDeAceite"]', editalData.termo_de_aceite);
    
    // Passo 3 - Substep Texto do Edital (US-12)
    cy.get('[data-cy="texto-do-edital"]').should("be.visible").click();
    cy.typeInCKEditor('[data-cy="texto"]', editalData.texto_do_edital);
    
    // Passo 3 - Substep Abrangência (US-13)
    cy.get('[data-cy="abrangencia"]').should("be.visible").click();
    cy.get('[data-cy="estado-todos"]')
      .should("be.visible")
      .click()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    
    // Passo 3 - Substep Informações Complementares (US-14)
    cy.get('[data-cy="informacoes-complementares"]').should("be.visible").click();
    // Adicionar informações complementares
    cy.selectMuiOptionByText('perguntaInfoId', editalData.informacao_complementar1);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('perguntaInfoId', editalData.informacao_complementar2);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('perguntaInfoId', editalData.informacao_complementar3);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('perguntaInfoId', editalData.informacao_complementar4);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('perguntaInfoId', editalData.informacao_complementar5);
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').should("be.visible").click();

    // Passo 4 - Step 2: Cronograma (US-16)
    // Passo 4 - Substep Período de Submissão (US-17)
    cy.get('[data-cy="cronograma"]').should("be.visible").click();
    cy.get('[data-cy="periodo-de-submissao"]').should("be.visible").click();
    // Adiciona novo período de submissão
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); 
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addDays: 5 })); 
    cy.get('[data-cy="chamada-confirmar"]').should("be.visible").click();
    
    // Passo 5 - Step 3: Orçamento (US-19)
    // Passo 5 - Substep Programa (US-20)
    cy.get('[data-cy="orcamento"]').should("be.visible").click();
    cy.get('[data-cy="programa"]').should("be.visible").click();
    // Seleciona o programa
    cy.selectMuiOptionByText('programaId', editalData.orcamento_programa);

    // Passo 5 - Substep Rubricas (US-21)
    cy.get('[data-cy="rubricas"]').should("be.visible").click();
    // Adicionar Rubrica
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('editalRubricaUnsaved.tipoEditalRubrica', editalData.rubrica_tipo1);
    cy.selectMuiOptionByText('editalRubricaUnsaved.naturezaDespesaId', editalData.rubrica_natureza1);
    cy.get('[data-cy="editalRubrica-confirmar"]').should("be.visible").click();

    // Passo 5 - Substep Faixas de Financiamento (US-22)
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

    // Passo 6 - Step 4: Documentos (US-23)
    // Passo 6 - Substep Documentos da Proposta (US-24)
    cy.get('[data-cy="documentos"]').should("be.visible").click();
    cy.get('[data-cy="documentos-da-proposta"]').should("be.visible").click();
    // Adiciona novo documento da proposta 1
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').should("be.visible").click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').should("be.visible").click();
    cy.get('[data-cy-index="documentoPropostaEdital-0-expandable-item"]').should("be.visible").click();
    cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type(editalData.documento_proposta_nome1, { delay: 0 })
    cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').type(editalData.documento_proposta_descricao1, { delay: 0 })
    cy.selectMuiOptionByText("documentoPropostaEdital.0.formatoArquivo", editalData.documento_proposta_formato1);
    cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type(editalData.documento_proposta_tamanho1, { delay: 0 })
    // Adiciona novo documento da proposta 2
    cy.get('[data-cy-index="documentoPropostaEdital-1-expandable-item"]').should("be.visible").click();
    cy.get('[data-cy="documentoPropostaEdital.1.nome"]').type(editalData.documento_proposta_nome2, { delay: 0 })
    cy.get('[data-cy="documentoPropostaEdital.1.descricao"]').type(editalData.documento_proposta_descricao2, { delay: 0 })
    cy.selectMuiOptionByText("documentoPropostaEdital.1.formatoArquivo", editalData.documento_proposta_formato2);
    cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]').type(editalData.documento_proposta_tamanho2, { delay: 0 })

    // Passo 6 - Substep Documentos Pessoais (US-25)
    cy.get('[data-cy="documentos-pessoais"]').should("be.visible").click();
    // Adiciona novo documento pessoal 1
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('documentoPessoalEdital.0.documentoPessoalId', editalData.documento_pessoal1);
    // Adiciona novo documento pessoal 2
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('documentoPessoalEdital.1.documentoPessoalId', editalData.documento_pessoal2);
    // Adiciona novo documento pessoal 3
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('documentoPessoalEdital.2.documentoPessoalId', editalData.documento_pessoal3);
    // Adiciona novo documento pessoal 4
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('documentoPessoalEdital.3.documentoPessoalId', editalData.documento_pessoal4);
    // Adiciona novo documento pessoal 5
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').should("be.visible").click();
    cy.selectMuiOptionByText('documentoPessoalEdital.4.documentoPessoalId', editalData.documento_pessoal5);

    // Passso 7 - Step 5: Perguntas (US-26)
    // Passo 7 - Substep Descrição do Projeto (US-27)
    cy.get('[data-cy="perguntas"]').should("be.visible").click();
    cy.get('[data-cy="descricao-do-projeto"]').should("be.visible").click();
    // Adiciona nova descrição do projeto 1
    cy.selectMuiOptionByText('perguntaDescId', editalData.descricao_projeto1);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    // Adiciona nova descrição do projeto 2
    cy.selectMuiOptionByText('perguntaDescId', editalData.descricao_projeto2);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    // Adiciona nova descrição do projeto 3
    cy.selectMuiOptionByText('perguntaDescId', editalData.descricao_projeto3);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    // Adiciona nova descrição do projeto 4
    cy.selectMuiOptionByText('perguntaDescId', editalData.descricao_projeto4);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    // Adiciona nova descrição do projeto 5
    cy.selectMuiOptionByText('perguntaDescId', editalData.descricao_projeto5);
    cy.get('[data-cy="pergunta-adicionar"]').should("be.visible").click();
    
    //Passo 7 - Substep Indicadores de Produção (US-28)
    cy.get('[data-cy="indicadores-de-producao"]').should("be.visible").click();
    // Adiciona novo indicador de produção 1 
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao1);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();
    // Adiciona novo indicador de produção 2
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao2);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();
    // Adiciona novo indicador de produção 3
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('indicadorProducaoUnsaved.id', editalData.indicador_producao3);
    cy.get('[data-cy="indicadorProducao-confirmar"]').should("be.visible").click();

    // Passo 8 - Step 6: Bolsas do Edital (US-29)
    // Passo 8 - Substep Bolsas (US-30)
    cy.get('[data-cy="bolsas-do-edital"]').should("be.visible").click();
    cy.get('[data-cy="bolsas"]').should("be.visible").click();
    // Adiciona uma nova bolsa 1
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa1);
    cy.selectMuiOptionByText('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa1);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa 2
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa2);
    cy.selectMuiOptionByText('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa2);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa 3
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa3);
    cy.selectMuiOptionByText('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa3);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa 4
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa4);
    cy.selectMuiOptionByText('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa4);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();
    // Adiciona uma nova bolsa 5
    cy.get('[data-cy="add-button"]').should("be.visible").click();
    cy.selectMuiOptionByText('bolsaEditalUnsaved.modalidadeBolsaId', editalData.modalidade_bolsa5);
    cy.selectMuiOptionByText('bolsaEditalUnsaved.nivelBolsaId', editalData.nivel_bolsa5);
    cy.get('[data-cy="bolsaEdital-confirmar"]').should("be.visible").click();

    // Passo 9 e 10: Salvar e Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

    // Resultado esperado:
    // Após a realização do Teste Cypress se espera que o Edital tenha sido criado com sucesso e apareça na tela de visualização dos Editais.
    cy.url().should("include", "/edital"); // Confirma o retorno para a tela de gerenciamento
    cy.contains(editalData.titulo_projeto).should("be.visible"); // Verifica se o edital aparece na lista
  });
});