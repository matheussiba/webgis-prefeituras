import type { LatLngExpression } from 'leaflet'

export type UrbanLayer = {
  id: string
  name: string
  description: string
  color: string
  geometry: 'polygon' | 'line'
  coordinates: LatLngExpression[]
}

export type Contribution = {
  id: string
  title: string
  source: string
  status: string
  coordinates: LatLngExpression
}

export type PlanTier = {
  nameKey: string
  description: string
  features: string[]
}

export type PilotProject = {
  municipality: string
  phase: string
  scope: string
  duration: string
  channels: string[]
  deliverables: string[]
}

export type WorkflowStep = {
  title: string
  description: string
}

export type ComplianceItem = {
  title: string
  description: string
}

export const mapCenter: LatLngExpression = [-23.2237, -45.9009]

export const pilotProject: PilotProject = {
  municipality: 'São José dos Campos',
  phase: 'Consulta pública da minuta e zoneamento proposto',
  scope: 'Ambiente demonstrativo para revisão do Plano Diretor Municipal',
  duration: 'POC de 8 a 12 semanas',
  channels: ['Online / Web', 'Audiência pública', 'Unidade móvel', 'Ponto assistido'],
  deliverables: [
    'Portal público mobile-first',
    'WebGIS com camadas urbanísticas',
    'Contribuição territorial e documental',
    'Workflow de devolutivas',
    'Relatório executivo e exportação GIS',
  ],
}

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
    name: 'APP / área de preservação',
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
    name: 'Perímetro de interesse social',
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
    title: 'Melhorar travessia de pedestres no eixo estruturante',
    source: 'Online / Web',
    status: 'Em triagem',
    coordinates: [-23.214, -45.91],
  },
  {
    id: 'CON-002',
    title: 'Incluir equipamentos públicos próximos à ZEIS',
    source: 'Audiência pública',
    status: 'Análise técnica',
    coordinates: [-23.241, -45.908],
  },
  {
    id: 'CON-003',
    title: 'Preservar vegetação próxima ao córrego',
    source: 'Unidade móvel',
    status: 'Com devolutiva',
    coordinates: [-23.204, -45.884],
  },
]

export const planTiers: PlanTier[] = [
  {
    nameKey: 'plans.consultation',
    description: 'Portal público, formulários, cronograma, materiais e indicadores básicos.',
    features: ['Questionários tradicionais', 'Páginas do projeto', 'Exportação CSV/Excel'],
  },
  {
    nameKey: 'plans.webgis',
    description: 'Participação territorializada com camadas, mapas e análise espacial.',
    features: ['Pontos, linhas e polígonos', 'KML, KMZ, GeoJSON e Shapefile', 'Heatmaps e filtros'],
  },
  {
    nameKey: 'plans.governance',
    description: 'Workflow completo para triagem, parecer, validação e devolutiva.',
    features: ['Documentos em linguagem cidadã', 'Moderação e auditoria', 'Painel público avançado'],
  },
  {
    nameKey: 'plans.enterprise',
    description: 'Integrações institucionais, SSO, gov.br, APIs e GIS municipal.',
    features: ['Gov.br e CPF', 'GeoSanja ou ArcGIS', 'IA e múltiplos projetos'],
  },
]

export const workflowSteps: WorkflowStep[] = [
  {
    title: 'Captura com protocolo',
    description: 'Contribuição online ou presencial recebe ID, CPF validado, origem e timestamp.',
  },
  {
    title: 'Vínculo territorial ou textual',
    description: 'Registro fica conectado a uma coordenada, camada, bairro ou artigo da minuta.',
  },
  {
    title: 'Triagem técnica',
    description: 'Equipe agrupa por tema, território, instrumento urbanístico e pertinência.',
  },
  {
    title: 'Parecer e validação',
    description: 'Minuta de resposta passa pela equipe do Plano Diretor e homologação da prefeitura.',
  },
  {
    title: 'Devolutiva pública',
    description: 'Cidadão é notificado e dados consolidados alimentam relatório e exportação GIS.',
  },
]

export const complianceItems: ComplianceItem[] = [
  {
    title: 'gov.br e CPF',
    description:
      'Envio formal de propostas previsto com autenticação gov.br e vínculo do CPF à contribuição.',
  },
  {
    title: 'LGPD desde o desenho',
    description:
      'Consentimento explícito, minimização de dados, anonimização pública e criptografia em repouso.',
  },
  {
    title: 'Audit trail',
    description:
      'Ações de moderação, edição de parecer e decisões do conselho geram logs imutáveis.',
  },
  {
    title: 'Exportação pública',
    description:
      'Dados estruturados podem ser entregues em CSV, JSON, Excel, Shapefile e GeoJSON.',
  },
]
