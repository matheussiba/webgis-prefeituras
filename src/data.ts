import type { LatLngExpression } from 'leaflet'

export type UrbanLayer = {
  id: string
  name: string
  description: string
  color: string
  geometry: 'polygon' | 'line'
  coordinates: LatLngExpression[]
}

export type ContributionCategoryId =
  | 'mobility'
  | 'housing'
  | 'environment'
  | 'public-equipment'
  | 'sanitation'
  | 'safety'
  | 'other'

export type ContributionCategory = {
  id: ContributionCategoryId
  name: string
  color: string
  icon: string
  description: string
}

export type ContributionStatus = 'Nova' | 'Em triagem' | 'Análise técnica' | 'Com devolutiva'

export type ContributionSource = 'Online' | 'Audiência pública' | 'Unidade móvel' | 'Ponto assistido'

export type Contribution = {
  id: string
  title: string
  description: string
  category: ContributionCategoryId
  source: ContributionSource
  status: ContributionStatus
  coordinates: [number, number]
  createdAt: string
}

export type MapStyleOption = {
  id: string
  name: string
  description: string
  url: string
}

export type PlanTier = {
  name: string
  badge?: string
  description: string
  priceLabel: string
  priceNote?: string
  accent: 'violet' | 'blue' | 'aqua' | 'green'
  features: string[]
}

export type FeatureComparisonGroup = {
  title: string
  rows: {
    feature: string
    description: string
    availability: [boolean, boolean, boolean, boolean]
  }[]
}

export type SubscriptionBenefit = {
  title: string
  description: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type ProductFeatureSection = {
  eyebrow: string
  title: string
  description: string
  linkLabel: string
}

export type ProjectExample = {
  title: string
  location: string
  tag?: string
}

export const contributionCategories: ContributionCategory[] = [
  {
    id: 'mobility',
    name: 'Mobilidade urbana',
    color: '#3f7ee8',
    icon: 'M',
    description: 'Calçadas, transporte, ciclovias, travessias e eixos viários.',
  },
  {
    id: 'housing',
    name: 'Habitação',
    color: '#f07c54',
    icon: 'H',
    description: 'Moradia, regularização fundiária e áreas de interesse social.',
  },
  {
    id: 'environment',
    name: 'Meio ambiente',
    color: '#23a36b',
    icon: 'A',
    description: 'Áreas verdes, preservação, drenagem e arborização urbana.',
  },
  {
    id: 'public-equipment',
    name: 'Equipamentos públicos',
    color: '#5a67d8',
    icon: 'E',
    description: 'Saúde, educação, cultura, esporte e atendimento ao cidadão.',
  },
  {
    id: 'sanitation',
    name: 'Saneamento',
    color: '#06b6d4',
    icon: 'S',
    description: 'Água, esgoto, drenagem urbana e resíduos sólidos.',
  },
  {
    id: 'safety',
    name: 'Segurança e iluminação',
    color: '#a855f7',
    icon: 'P',
    description: 'Iluminação pública, sensação de segurança e zeladoria.',
  },
  {
    id: 'other',
    name: 'Outros',
    color: '#6b7280',
    icon: 'O',
    description: 'Demais temas territoriais propostos pelo participante.',
  },
]

export const contributionSources: ContributionSource[] = [
  'Online',
  'Audiência pública',
  'Unidade móvel',
  'Ponto assistido',
]

export const mapStyleOptions: MapStyleOption[] = [
  {
    id: 'streets',
    name: 'Ruas',
    description: 'Vias, lotes e referência urbana clara.',
    url: 'mapbox://styles/mapbox/streets-v12',
  },
  {
    id: 'light',
    name: 'Claro',
    description: 'Base discreta para destacar camadas e contribuições.',
    url: 'mapbox://styles/mapbox/light-v11',
  },
  {
    id: 'outdoors',
    name: 'Topográfico',
    description: 'Relevo, áreas verdes e contexto ambiental.',
    url: 'mapbox://styles/mapbox/outdoors-v12',
  },
  {
    id: 'satellite',
    name: 'Satélite',
    description: 'Imagem aérea com nomes de ruas para diagnóstico territorial.',
    url: 'mapbox://styles/mapbox/satellite-streets-v12',
  },
]

export const mapCenter: LatLngExpression = [-23.2237, -45.9009]

export const urbanLayers: UrbanLayer[] = [
  {
    id: 'current-zoning',
    name: 'Zoneamento atual',
    description: 'Camada base para comparar regras vigentes com a proposta da revisão.',
    color: '#64748b',
    geometry: 'polygon',
    coordinates: [
      [-23.199, -45.938],
      [-23.197, -45.889],
      [-23.225, -45.875],
      [-23.252, -45.896],
      [-23.247, -45.932],
    ],
  },
  {
    id: 'zoning',
    name: 'Zoneamento proposto',
    description: 'Macroárea de adensamento qualificado no eixo urbano principal.',
    color: '#2563eb',
    geometry: 'polygon',
    coordinates: [
      [-23.2108, -45.9325],
      [-23.2053, -45.8848],
      [-23.2321, -45.8717],
      [-23.2428, -45.9165],
    ],
  },
  {
    id: 'zeis',
    name: 'ZEIS prioritária',
    description: 'Perímetro demonstrativo para política habitacional e regularização.',
    color: '#d97706',
    geometry: 'polygon',
    coordinates: [
      [-23.235, -45.924],
      [-23.229, -45.904],
      [-23.246, -45.897],
      [-23.252, -45.916],
    ],
  },
  {
    id: 'environment',
    name: 'Áreas de preservação',
    description: 'Camada ambiental para orientar comentários sobre proteção e uso do solo.',
    color: '#15803d',
    geometry: 'polygon',
    coordinates: [
      [-23.191, -45.902],
      [-23.199, -45.873],
      [-23.218, -45.867],
      [-23.219, -45.899],
    ],
  },
  {
    id: 'mobility',
    name: 'Eixo estruturante',
    description: 'Corredor demonstrativo para mobilidade, adensamento e uso misto.',
    color: '#7c3aed',
    geometry: 'line',
    coordinates: [
      [-23.203, -45.934],
      [-23.214, -45.91],
      [-23.226, -45.887],
      [-23.238, -45.862],
    ],
  },
  {
    id: 'urban-perimeter',
    name: 'Perímetro urbano',
    description: 'Limite demonstrativo para orientar expansão urbana e aplicação de instrumentos.',
    color: '#be123c',
    geometry: 'polygon',
    coordinates: [
      [-23.182, -45.944],
      [-23.183, -45.858],
      [-23.255, -45.84],
      [-23.272, -45.915],
      [-23.239, -45.956],
    ],
  },
  {
    id: 'neighborhoods',
    name: 'Bairros e regiões',
    description: 'Divisão territorial para agrupar participação por bairro e região administrativa.',
    color: '#0891b2',
    geometry: 'polygon',
    coordinates: [
      [-23.211, -45.914],
      [-23.212, -45.887],
      [-23.231, -45.882],
      [-23.236, -45.907],
    ],
  },
  {
    id: 'social-interest',
    name: 'Interesse social',
    description: 'Área demonstrativa para debate sobre equipamentos públicos e regularização.',
    color: '#c026d3',
    geometry: 'polygon',
    coordinates: [
      [-23.222, -45.938],
      [-23.219, -45.918],
      [-23.237, -45.913],
      [-23.241, -45.933],
    ],
  },
]

export const sampleContributions: Contribution[] = [
  {
    id: 'CON-001',
    title: 'Travessia segura no eixo estruturante',
    description:
      'Sugestão de implantar faixa elevada e semáforo para pedestres na região do principal corredor viário.',
    category: 'mobility',
    source: 'Online',
    status: 'Em triagem',
    coordinates: [-23.214, -45.91],
    createdAt: '2026-04-12',
  },
  {
    id: 'CON-002',
    title: 'Equipamentos públicos próximos à ZEIS',
    description:
      'Demanda por unidade básica de saúde e creche na área de interesse social do bairro.',
    category: 'public-equipment',
    source: 'Audiência pública',
    status: 'Análise técnica',
    coordinates: [-23.241, -45.908],
    createdAt: '2026-04-18',
  },
  {
    id: 'CON-003',
    title: 'Preservar vegetação ao redor do córrego',
    description:
      'Proposta de manutenção da mata ciliar, recuperação de áreas degradadas e plantio de árvores nativas.',
    category: 'environment',
    source: 'Unidade móvel',
    status: 'Com devolutiva',
    coordinates: [-23.204, -45.884],
    createdAt: '2026-05-02',
  },
  {
    id: 'CON-004',
    title: 'Iluminação pública no entorno da praça',
    description:
      'Reforço da iluminação e poda de árvores para melhorar a sensação de segurança no entorno da praça central.',
    category: 'safety',
    source: 'Ponto assistido',
    status: 'Em triagem',
    coordinates: [-23.227, -45.9],
    createdAt: '2026-05-04',
  },
  {
    id: 'CON-005',
    title: 'Ampliar a rede de drenagem urbana',
    description:
      'Pontos recorrentes de alagamento exigem revisão da rede de drenagem e bocas de lobo.',
    category: 'sanitation',
    source: 'Online',
    status: 'Análise técnica',
    coordinates: [-23.219, -45.92],
    createdAt: '2026-05-08',
  },
  {
    id: 'CON-006',
    title: 'Regularização e moradia digna',
    description:
      'Solicitação de continuidade do programa de regularização fundiária na região da ZEIS.',
    category: 'housing',
    source: 'Audiência pública',
    status: 'Nova',
    coordinates: [-23.245, -45.918],
    createdAt: '2026-05-15',
  },
]

export const planTiers: PlanTier[] = [
  {
    name: 'Inicial',
    priceLabel: 'Sob consulta',
    priceNote: 'Para iniciar um processo participativo.',
    accent: 'violet',
    description: 'Para pequenas equipes públicas ou consultorias iniciando um projeto participativo.',
    features: [
      '1 usuário gestor',
      '1 projeto ativo',
      'Participantes ilimitados',
      'Suporte padrão',
      'Recursos essenciais',
    ],
  },
  {
    name: 'Padrão',
    priceLabel: 'Sob consulta',
    priceNote: 'Para equipes em crescimento.',
    accent: 'blue',
    description: 'Para equipes em crescimento que precisam escalar a participação pública.',
    features: [
      'Até 3 usuários gestores',
      'Até 3 projetos ativos',
      'Participantes ilimitados',
      'Suporte padrão',
      'Recursos essenciais',
      'Domínio personalizado',
    ],
  },
  {
    name: 'Profissional',
    badge: 'MAIS POPULAR',
    priceLabel: 'Sob consulta',
    priceNote: 'Recomendado para municípios.',
    accent: 'aqua',
    description: 'Para organizações que tratam participação pública como prioridade institucional.',
    features: [
      'Até 10 usuários gestores',
      'Projetos ativos ilimitados',
      'Participantes ilimitados',
      'Suporte padrão',
      'Recursos essenciais',
      'Domínio personalizado',
      'Análise avançada',
      'Integrações',
      'Gamificação',
    ],
  },
  {
    name: 'Corporativo',
    priceLabel: 'Sob consulta',
    priceNote: 'Para grandes processos institucionais.',
    accent: 'green',
    description: 'Para grandes organizações, consórcios ou prefeituras com necessidades complexas.',
    features: [
      'Usuários ilimitados',
      'Projetos ativos ilimitados',
      'Participantes ilimitados',
      'Suporte prioritário',
      'Recursos essenciais',
      'Domínio personalizado',
      'Análise avançada',
      'Integrações',
      'Gamificação',
      'Desenvolvimento sob medida',
      'Gerente de sucesso dedicado',
      'Treinamento personalizado',
    ],
  },
]

export const featureComparisonGroups: FeatureComparisonGroup[] = [
  {
    title: 'Recursos essenciais',
    rows: [
      {
        feature: 'Portal público do projeto',
        description: 'Página pública com informações, cronograma, materiais e chamadas de participação.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Participantes ilimitados',
        description: 'A participação cidadã não é limitada por quantidade de respostas.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Gestão de projetos ativos',
        description: 'Controle de projetos publicados, rascunhos e fases participativas.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Domínio personalizado',
        description: 'Publicação em endereço institucional próprio.',
        availability: [false, true, true, true],
      },
    ],
  },
  {
    title: 'Construtor de pesquisas',
    rows: [
      {
        feature: 'Perguntas padrão',
        description: 'Texto aberto, múltipla escolha, ranking, escala, número e data.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Lógica condicional',
        description: 'Exibição de perguntas conforme respostas anteriores ou perfil do participante.',
        availability: [false, true, true, true],
      },
      {
        feature: 'Mídias e anexos',
        description: 'Receba fotos, documentos, vídeos ou áudios associados às contribuições.',
        availability: [false, true, true, true],
      },
      {
        feature: 'Gamificação e orçamento participativo',
        description: 'Votação, priorização, alocação de recursos e etapas de decisão.',
        availability: [false, false, true, true],
      },
    ],
  },
  {
    title: 'Mapa e dados territoriais',
    rows: [
      {
        feature: 'Contribuições no mapa',
        description: 'Coleta por ponto, linha, polígono ou seleção de área predefinida.',
        availability: [false, true, true, true],
      },
      {
        feature: 'Camadas urbanísticas',
        description: 'Zoneamento, ZEIS, áreas de preservação, eixos, perímetros e bairros.',
        availability: [false, true, true, true],
      },
      {
        feature: 'Importação geográfica',
        description: 'KML, KMZ, GeoJSON e Shapefile para bases cartográficas da prefeitura.',
        availability: [false, true, true, true],
      },
      {
        feature: 'Mapas de calor e filtros espaciais',
        description: 'Análise visual por região, bairro, tema ou instrumento urbanístico.',
        availability: [false, true, true, true],
      },
      {
        feature: 'Integração com GIS municipal',
        description: 'Conexão com bases cartográficas oficiais da prefeitura.',
        availability: [false, false, false, true],
      },
    ],
  },
  {
    title: 'Análise e relatórios',
    rows: [
      {
        feature: 'Painéis de participação',
        description: 'Indicadores por território, tema, canal e etapa do processo.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Análise avançada',
        description: 'Filtros combinados, mapas de calor, cruzamentos e visões salvas.',
        availability: [false, false, true, true],
      },
      {
        feature: 'Relatórios atualizáveis',
        description: 'Resultados compartilháveis que podem ser atualizados conforme novas respostas chegam.',
        availability: [false, true, true, true],
      },
      {
        feature: 'IA para análise qualitativa',
        description: 'Agrupamento temático, sumarização e apoio à leitura técnica.',
        availability: [false, false, true, true],
      },
    ],
  },
  {
    title: 'Segurança e conformidade',
    rows: [
      {
        feature: 'LGPD e anonimização pública',
        description: 'Consentimento, minimização, criptografia e relatórios públicos anonimizados.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Autenticação gov.br',
        description: 'Vinculação de CPF para legitimidade jurídica das contribuições formais.',
        availability: [false, false, false, true],
      },
      {
        feature: 'Trilha de auditoria',
        description: 'Histórico de moderação, pareceres, alterações e validações institucionais.',
        availability: [false, false, true, true],
      },
      {
        feature: 'Acesso institucional unificado',
        description: 'Autenticação corporativa para equipes técnicas e gestores.',
        availability: [false, false, false, true],
      },
    ],
  },
  {
    title: 'Suporte e serviços',
    rows: [
      {
        feature: 'Suporte padrão',
        description: 'Atendimento para configuração, dúvidas operacionais e boas práticas.',
        availability: [true, true, true, true],
      },
      {
        feature: 'Treinamento personalizado',
        description: 'Capacitação sob medida para prefeitura, conselho, consultoria e equipe de campo.',
        availability: [false, false, false, true],
      },
      {
        feature: 'Gerente de sucesso dedicado',
        description: 'Acompanhamento estratégico para processos complexos e múltiplos projetos.',
        availability: [false, false, false, true],
      },
      {
        feature: 'Desenvolvimento sob medida',
        description: 'Recursos, integrações ou relatórios específicos para o processo institucional.',
        availability: [false, false, false, true],
      },
    ],
  },
]

export const subscriptionBenefits: SubscriptionBenefit[] = [
  {
    title: 'Participantes ilimitados',
    description:
      'A participação cidadã pode crescer sem cobrança por resposta, pergunta ou participante.',
  },
  {
    title: 'Segurança dos dados',
    description:
      'Controle de acesso, anonimização pública, consentimento e boas práticas de proteção de dados.',
  },
  {
    title: 'Engajamento comunitário',
    description:
      'Ferramentas para comunicação, consultas online, oficinas presenciais e devolutivas públicas.',
  },
  {
    title: 'Base de conhecimento',
    description:
      'Biblioteca de tutoriais, guias e materiais para apoiar equipes técnicas e consultorias.',
  },
  {
    title: 'Rede de prática',
    description:
      'Acesso a referências, metodologias e aprendizados para processos participativos territoriais.',
  },
]

export const faqItems: FaqItem[] = [
  {
    question: 'O que é um usuário da plataforma?',
    answer:
      'É uma pessoa da prefeitura, consultoria ou equipe técnica com acesso ao painel administrativo para configurar projetos, mapas, perguntas, relatórios ou devolutivas.',
  },
  {
    question: 'Como vocês contam projetos ativos?',
    answer:
      'Projeto ativo é uma iniciativa publicada ou em coleta, como revisão do Plano Diretor, consulta de zoneamento ou oficina territorial. Projetos arquivados não contam como ativos.',
  },
  {
    question: 'Podemos ter um ambiente de teste?',
    answer:
      'Sim. Para processos institucionais, é possível organizar uma demonstração guiada ou ambiente de avaliação técnica.',
  },
  {
    question: 'Há condições para universidades, ONGs ou consórcios públicos?',
    answer:
      'Sim. A proposta pode considerar a natureza institucional, o volume de projetos e a capacidade operacional da organização.',
  },
  {
    question: 'Posso mudar de plano depois?',
    answer:
      'Sim. O plano pode evoluir conforme o município adiciona mapas, integrações, relatórios, governança ou múltiplos projetos.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'A contratação pode ser estruturada conforme o processo administrativo do cliente, com proposta comercial e condições definidas em contrato.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer:
      'Sim. A arquitetura considera controle de acesso, anonimização pública, consentimento, registros de auditoria e boas práticas de segurança.',
  },
  {
    question: 'Qual é a duração do contrato?',
    answer:
      'A duração depende do escopo, do ciclo do Plano Diretor e dos módulos contratados. Normalmente acompanha o período institucional do processo.',
  },
  {
    question: 'Posso cancelar a assinatura a qualquer momento?',
    answer:
      'As condições de cancelamento, renovação e encerramento são definidas em contrato, conforme o modelo de contratação escolhido.',
  },
  {
    question: 'Vocês oferecem desenvolvimento sob medida?',
    answer:
      'Sim. Integrações, relatórios, fluxos de validação e recursos específicos podem ser contratados em planos corporativos.',
  },
  {
    question: 'Como posso acionar o suporte?',
    answer:
      'O suporte pode ser acionado pelos canais definidos em contrato, com nível de atendimento conforme o plano contratado.',
  },
  {
    question: 'Como funciona a precificação?',
    answer:
      'A contratação acompanha o nível de complexidade do processo e dos módulos necessários. O preço não aumenta pelo número de cidadãos, respostas, perguntas ou contribuições recebidas.',
  },
  {
    question: 'Prefeituras pequenas podem usar a plataforma?',
    answer:
      'Sim. O plano Inicial atende processos mais simples, enquanto Padrão, Profissional e Corporativo adicionam recursos conforme a maturidade institucional do município.',
  },
  {
    question: 'Os dados podem ser exportados?',
    answer:
      'Sim. A plataforma prevê exportações tabulares e geoespaciais, incluindo CSV, JSON, Excel, GeoJSON e Shapefile.',
  },
  {
    question: 'A plataforma substitui audiências públicas?',
    answer:
      'Não. Ela organiza e fortalece a participação híbrida, integrando canais digitais, audiências, oficinas, unidade móvel e pontos assistidos em uma base única.',
  },
]

export const productFeatureSections: ProductFeatureSection[] = [
  {
    eyebrow: 'Mapeamento comunitário',
    title: 'Ferramentas participativas para perguntas que dependem de lugar.',
    description:
      'Crie consultas territoriais com mapas interativos, camadas oficiais, perguntas georreferenciadas e comentários públicos que ajudam a prefeitura a entender onde cada demanda acontece.',
    linkLabel: 'Ver recursos do mapa',
  },
  {
    eyebrow: 'Pesquisas públicas',
    title: 'Combine perguntas no mapa com formulários tradicionais.',
    description:
      'Use perguntas abertas, múltipla escolha, ranking, escala, orçamento participativo e anexos junto a pontos, linhas, polígonos e áreas de interesse.',
    linkLabel: 'Ver recursos de pesquisa',
  },
  {
    eyebrow: 'Compatível com fluxos territoriais',
    title: 'Use camadas municipais e devolva resultados para a base técnica.',
    description:
      'Trabalhe com formatos abertos como GeoJSON, Shapefile e KML, e integre com sistemas territoriais existentes na prefeitura ou consultoria.',
    linkLabel: 'Ver compatibilidade e integrações',
  },
  {
    eyebrow: 'Comunicação pública do processo',
    title: 'Construa páginas do Plano Diretor para informar e engajar.',
    description:
      'Publique cronogramas, documentos, mapas, devolutivas, discussões e resultados em uma experiência única, reduzindo barreiras entre informação oficial e participação cidadã.',
    linkLabel: 'Ver recursos de comunicação',
  },
  {
    eyebrow: 'Engajamento híbrido',
    title: 'Online, oficina presencial, audiência pública e campo no mesmo fluxo.',
    description:
      'Registre contribuições de canais assistidos, unidades móveis e eventos presenciais com a mesma rastreabilidade dos canais digitais.',
    linkLabel: 'Ver recursos para participação híbrida',
  },
  {
    eyebrow: 'Análise, relatórios e devolutivas',
    title: 'Transforme contribuições em evidências para decisão pública.',
    description:
      'Monitore métricas, filtre por bairro ou tema, visualize concentrações, gere relatórios e publique respostas consolidadas para apoiar o relatório final e a minuta de lei.',
    linkLabel: 'Ver recursos de análise',
  },
]

export const featureCategories = [
  'Participação no mapa',
  'Consultas e formulários',
  'Comunicação do projeto',
  'Orçamento participativo',
  'Mobilização e divulgação',
  'Análise e relatórios',
  'Segurança e LGPD',
  'Suporte e treinamento',
  'Compatibilidade de dados',
  'Gestão interna do processo',
]

export const projectExamples: ProjectExample[] = [
  {
    title: 'Revisão participativa do zoneamento urbano',
    location: 'Município de médio porte',
    tag: 'Plano Diretor',
  },
  {
    title: 'Consulta sobre eixos de mobilidade e adensamento',
    location: 'Região metropolitana',
    tag: 'Mobilidade',
  },
  {
    title: 'Mapeamento de áreas de interesse social',
    location: 'Prefeitura municipal',
    tag: 'Habitação',
  },
  {
    title: 'Audiência pública com devolutivas georreferenciadas',
    location: 'Processo híbrido',
    tag: 'Governança',
  },
  {
    title: 'Diagnóstico territorial com contribuições por bairro',
    location: 'Consórcio público',
    tag: 'Diagnóstico',
  },
  {
    title: 'Portal de transparência para minuta do Plano Diretor',
    location: 'Consultoria urbanística',
    tag: 'Comunicação',
  },
]
