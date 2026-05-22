# Abordagem de Identidade, LGPD e Auditoria

## Autenticacao gov.br

Na versao institucional, o envio formal de propostas deve usar gov.br para autenticar o cidadao e vincular CPF ao protocolo de contribuicao.

Diretrizes:

- Aceitar contas Bronze, Prata ou Ouro, conforme regra do contrato.
- Capturar CPF apenas para legitimidade juridica e rastreabilidade do processo.
- Separar dados pessoais da camada publica de indicadores.
- Exibir consentimento antes do envio da contribuicao.
- Permitir acompanhamento por protocolo.

## CPF e unicidade

O mesmo CPF pode enviar multiplas contribuicoes, desde que cada registro tenha ID proprio, timestamp, origem e vinculo territorial ou textual.

Regra recomendada:

- Nao bloquear multiplas participacoes do mesmo CPF.
- Diferenciar contribuicoes por canal de origem.
- Preservar registros online e presenciais como entradas independentes.

## LGPD

Medidas previstas:

- Consentimento explicito para tratamento de dados pessoais.
- Minimização dos dados coletados.
- Criptografia em repouso para CPF, e-mail e demais dados sensiveis.
- Anonimizacao em paineis publicos e relatorios abertos.
- Controle de acesso por perfil.
- Registro de finalidade do tratamento.
- Canal para solicitacao de direitos do titular.

## Moderacao

Nenhuma contribuicao deve ser apagada sem justificativa legal vinculada.

Estados recomendados:

- Recebida
- Em triagem
- Em analise tecnica
- Devolvida para ajuste
- Encaminhada ao conselho
- Homologada
- Respondida
- Nao pertinente ao escopo
- Ocultada com justificativa legal

## Audit trail

Toda acao relevante deve gerar log imutavel:

- Criacao de contribuicao
- Alteracao de status
- Edicao de parecer
- Validacao da prefeitura
- Deliberacao do conselho
- Ocultacao/moderacao de conteudo
- Exportacao de dados

Campos minimos:

- ID do evento
- ID do ator
- Perfil do ator
- Data e hora
- IP ou identificador de sessao
- Tipo de acao
- Registro afetado
- Antes/depois quando houver alteracao
- Justificativa quando exigida

## Exportacao e propriedade dos dados

Ao final do contrato, os dados coletados pertencem ao municipio.

Formatos previstos:

- CSV
- JSON
- Excel
- GeoJSON
- Shapefile

Integracoes futuras:

- GeoSanja
- ArcGIS Online
- GeoServer
- MapServer
- APIs municipais
