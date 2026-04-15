# ShopFast: Estratégia de Governança SQA & Quality Gates (IEEE 730)

Este repositório estabelece as diretrizes de SQA para a blindagem da plataforma ShopFast, 
transicionando de um modelo reativo (SQC) para uma Governança Preventiva de Engenharia.

## A: Política de Quality Gate (Enforcement Baseado na IEEE 730)

Para garantir a integridade do processo de software, estabelecemos dois Quality Gates imutáveis no pipeline de CI/CD:

1. **Gate de Integridade de Contrato e Saldo (Automated Integration):** Fica proibido o merge de qualquer funcionalidade de desconto/checkout que não possua cobertura de 100% em testes de integração de fluxo financeiro. O pipeline bloqueará automaticamente o deploy caso a validação cruzada entre `Cupom`, `Estoque` e `Saldo em Carteira` não seja executada com sucesso no ambiente de Staging.
   * *Referência IEEE 730:* Seção de Verificação e Validação (V&V).

2. **Gate de Revisão Crítica via Checklist Normativo (Static Analysis & Peer Review):** Todo Pull Request deve passar por uma análise estática (Linter) com zero erros e uma revisão manual obrigatória (2 approvers). O revisor deve validar a presença de cláusulas de guarda (*Guard Clauses*) que tratem o cenário de "saldo insuficiente" ou "erro de gateway", sob pena de rejeição sumária do artefato.

## B: Sumário Executivo de Gestão de Risco

| Risco Identificado | Probabilidade | Impacto | Classificação |
|:--- |:--- |:--- |:--- |
| Evasão de estoque sem compensação financeira (Falha de Validação de API) | Alta | Crítico (Financeiro/Reputacional) | **Extremo** |

**Justificativa Técnica:**
A anomalia da última Black Friday não foi um erro de código isolado, mas uma falha de **Adequação Funcional (ISO 25010)**. O desvio ocorreu porque o processo permitiu que a interface ditasse a regra de negócio sem a devida sanção da camada de persistência financeira.

A introdução desta política de SQA atua diretamente na redução do **Change Failure Rate (DORA)** ao forçar o *Shift-Left Testing*. Ao validarmos a lógica de "Saldo vs. Cupom" antes do artefato chegar em produção, eliminamos a ambiguidade negocial na origem, garantindo que o sistema logístico só receba ordens de despacho de transações com status `Liquidado`.
