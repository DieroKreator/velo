# Casos de Teste - Velô Sprint

---

### CT01 - Acesso bem-sucedido à Landing Page

#### Objetivo
Validar se a Landing Page carrega corretamente com as informações do veículo e o botão de acesso ao configurador.

#### Pré-Condições
- O usuário possui acesso à internet.
- O sistema está no ar e acessível pelo navegador.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL base da aplicação. | A Landing Page é exibida corretamente. |
| 2  | Visualizar os elementos principais. | O título, a descrição do Velô Sprint e o botão "Configurar Agora" estão visíveis. |
| 3  | Clicar no botão "Configurar Agora". | O usuário é redirecionado para o módulo de Configurador de Veículo. |

#### Resultados Esperados
- A página inicial carrega completamente e redireciona o usuário para o configurador com sucesso.

#### Critérios de Aceitação
- A Landing Page carrega em tempo aceitável.
- Elementos essenciais de navegação estão funcionais.

---

### CT02 - Cálculo de valor base no Configurador de Veículo

#### Objetivo
Verificar se o Configurador exibe corretamente o valor base do veículo sem nenhum opcional.

#### Pré-Condições
- O usuário foi redirecionado para a tela do Configurador de Veículo.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar o Configurador. | As opções de customização são exibidas sem itens selecionados por padrão. |
| 2  | Observar o preço total exibido na tela. | O valor total exibido deve ser exatamente R$ 40.000,00. |

#### Resultados Esperados
- O sistema inicia o processo de configuração sempre com o valor base de R$ 40.000.

#### Critérios de Aceitação
- Nenhum opcional deve estar pré-selecionado por padrão.
- O preço base deve ser visível e correto.

---

### CT03 - Adição e cálculo dinâmico dos opcionais

#### Objetivo
Validar se o valor total da compra é atualizado corretamente ao selecionar diferentes combinações de opcionais.

#### Pré-Condições
- O usuário está na tela do Configurador de Veículo.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar o opcional "Sport". | O valor total é atualizado para R$ 42.000,00. |
| 2  | Selecionar "Precision Park". | O valor total é atualizado para R$ 47.500,00. |
| 3  | Selecionar "Flux Capacitor". | O valor total é atualizado para R$ 52.500,00. |
| 4  | Desmarcar a opção "Sport". | O valor total é reduzido e atualizado para R$ 50.500,00. |

#### Resultados Esperados
- O preço final reflete exatamente a soma do valor base (R$ 40.000) e os valores dos itens opcionais adicionados ou removidos.

#### Critérios de Aceitação
- A adição e remoção reflete o cálculo imediatamente em tela (dinâmico).
- Não há limite restritivo de quantos opcionais podem ser selecionados simultaneamente.

---

### CT04 - Validação de campos obrigatórios no Checkout

#### Objetivo
Garantir que o sistema impeça a submissão do pedido se os dados do cliente estiverem incompletos.

#### Pré-Condições
- O usuário configurou o veículo e avançou para a etapa de Checkout/Pedido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar campos obrigatórios (ex: Nome, E-mail, CPF) em branco. | - |
| 2  | Clicar no botão para submeter o pedido. | O sistema exibe mensagens de erro nos campos obrigatórios não preenchidos e impede a continuação. |

#### Resultados Esperados
- O pedido não é submetido contendo dados faltantes e avisa o cliente dos campos pendentes.

#### Critérios de Aceitação
- Bloqueio imediato na submissão com campos ausentes.
- Exibição de alertas visuais (ex: em vermelho, ou mensagens descritivas).

---

### CT05 - Cálculo de parcelamento em 12x (Juros Compostos)

#### Objetivo
Garantir que, na opção parcelada, o financiamento é sempre calculado em 12x e aplica uma taxa de juros compostos de 2% a.m.

#### Pré-Condições
- O usuário está na tela de Pagamento/Checkout com o valor total final calculado (Exemplo de simulação com carro a R$ 50.000,00).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar a forma de pagamento "Simular Financiamento" ou equivalente. | É exibido o campo para informar o valor da entrada. |
| 2  | Informar entrada de R$ 10.000,00. | O saldo a financiar é deduzido para R$ 40.000,00. |
| 3  | Simular o parcelamento. | O sistema deve exibir as parcelas fixadas em 12x. Os juros de 2% a.m. compostos incidem sobre o saldo a financiar (R$ 40 mil). O valor da parcela deve bater com o cálculo exato da fórmula de juros. |

#### Resultados Esperados
- O financiamento tem a regra cravada em 12x, aplicando os juros compostos (2% a.m.) no saldo devedor restante em relação à entrada. 

#### Critérios de Aceitação
- O valor financiado subtrai a entrada de imediato.
- A quantidade de parcelas é inalterável (apenas 12x).

---

### CT06 - Aprovação automática com Score > 700

#### Objetivo
Verificar o fluxo de análise de crédito aprovado automaticamente quando o perfil tem score acima de 700.

#### Pré-Condições
- Usuário finalizou o preenchimento de dados de Checkout e possui Score mapeado como > 700 na API (Exemplo: 750).
- Nova entrada não é >= 50% do total da compra.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Submeter a solicitação do pedido com financiamento. | A API de Análise de Crédito é consultada. |
| 2  | Aguardar a resposta e redirecionamento. | O sistema recebe a devolutiva de Score (750), aprova o pedido e prossegue para a tela de Confirmação. |

#### Resultados Esperados
- O sistema confia no Score e gera a aprovação automatizada sem delongas.

#### Critérios de Aceitação
- Cliente transita para página de sucesso.

---

### CT07 - Análise de crédito no status "Em análise" (Score 501 a 700)

#### Objetivo
Validar se clientes com score mediano (501 a 700) são encaminhados para a esteira "Em análise" e o pedido informa o status pendente de verificação manual.

#### Pré-Condições
- A simulação de Score para o cliente na API é de 600.
- A entrada dada é inferior a 50% do total.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Submeter pedido. | A requisição de API é realizada. |
| 2  | Avaliar o retorno do frontend da aplicação. | A tela apresenta mensagem informando que a solicitação está "Em análise" ou necessita de verificação de equipe. |

#### Resultados Esperados
- Transição do fluxo com a restrição temporal (não reprovado sumariamente, mas sem a aprovação garantida).

#### Critérios de Aceitação
- A tela ou modal exibe textualmente o status condizente com a regra.

---

### CT08 - Reprovação automática com Score Baixo (<= 500)

#### Objetivo
Verificar se o sistema reprova o crédito se o Score for igual ou inferior a 500 na integração com a API.

#### Pré-Condições
- Perfil configurado para o teste cujo CPF devolverá um Score <= 500.
- A entrada estipulada é inferior aos 50% obrigatórios que quebram a regra.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Submeter checkout para finalizar a compra do carro. | A chamada da API é enviada aos retornos traseiros. |
| 2  | Conferir o resultado da submissão. | O sistema exibe um alerta de "Financiamento Reprovado" e impede a finalização em sucesso do pedido de financiamento. |

#### Resultados Esperados
- O sistema bloqueia a continuação por restrição de crédito (risk score altíssimo).

#### Critérios de Aceitação
- Regra de trava ativada e feedback visual exposto ao cliente final.

---

### CT09 - Exceção de Crédito por Entrada (>= 50%) com Score Baixo

#### Objetivo
Validar o "bypass" da aprovação do financiamento: se o cliente tiver o pagamento de Entrada no valor de 50% (ou mais) do Total da Compra, a sua aprovação de pedido dispensa o filtro de Score.

#### Pré-Condições
- O cliente possui Score 300 (perfil negado em `CT08`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | No Checkout de um veículo que totaliza R$ 50.000,00, informar nas opções de financiamento uma Entrada de R$ 25.000,00. | A entrada representa 50% exatos do valor da operação. |
| 2  | Submeter pedido. | O sistema envia a requisição e calcula as regras de negócio. |
| 3  | Verificar resultado da operação. | O sistema aprova a compra automaticamente não importando o Score negativo. O cliente aterriza na Confirmação sem barragem de "Score Baixo". |

#### Resultados Esperados
- Regra excepcional prevalece sob a regra de Score, garantindo a concretização positiva de compra.

#### Critérios de Aceitação
- Se Input de Entrada >= 50% Total -> Status sempre Aprovado no Checkout Final.

---

### CT10 - Geração e Consulta de Confirmação com Número do Pedido

#### Objetivo
Verificar se na etapa de Confirmação e na Consulta de Pedidos, o `order_number` é gerado e funciona como chave de busca sem requerer autenticação ou gerando falha de segurança para outros pedidos de terceiros.

#### Pré-Condições
- O cliente tem uma submissão de aprovação completada com sucesso.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar a tela de "Pedido Confirmado / Sucesso". | O sistema fornece um identificador de pedido (`order_number`) gerado nesta compra. |
| 2  | Anotar ou copiar esse identificador de confirmação. | - |
| 3  | Navegar para a tela/área de "Consulta de Pedidos". | A página requer um número de pedido. |
| 4  | Informar o Identificador de Pedido real anotado. | O sistema responde extraindo todos os dados do veículo pedido, confirmando status. |
| 5  | Informar um número genérico inexistente ou vazio. | A consulta retorna em erro ou o formulário não submete, não exibindo em log ou painel os pedidos alheios. |

#### Resultados Esperados
- O pedido possui uma chave única identificadora obrigatória para acompanhamento, protegendo a segurança dos dados.

#### Critérios de Aceitação
- O sistema não lista pedidos que não correspondam à chave enviada.
- Não existem endpoints expostos com os dados do cliente sem referenciar a chave identificadora via request segura.
