import type { LatLngExpression } from 'leaflet'

export type UrbanLayer = {
  id: string
  name: string
  description: string
  color: string
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

export const mapCenter: LatLngExpression = [-23.2237, -45.9009]

export const urbanLayers: UrbanLayer[] = [
  {
    id: 'zoning',
    name: 'Zoneamento proposto',
    description: 'Macroárea de adensamento qualificado no eixo urbano principal.',
    color: '#2563eb',
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
    coordinates: [
      [-23.235, -45.924],
      [-23.229, -45.904],
      [-23.246, -45.897],
      [-23.252, -45.916],
    ],
  },
  {
    id: 'environment',
    name: 'Área de preservação',
    description: 'Camada ambiental para orientar comentários sobre proteção e uso do solo.',
    color: '#15803d',
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
    coordinates: [
      [-23.203, -45.934],
      [-23.214, -45.91],
      [-23.226, -45.887],
      [-23.238, -45.862],
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
