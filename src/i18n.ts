import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  'pt-BR': {
    translation: {
      nav: {
        product: 'Produto',
        map: 'Mapa',
        plans: 'Planos',
        demo: 'Solicitar demo',
      },
      hero: {
        eyebrow: 'WebGIS para Plano Diretor',
        title: 'Pare de adivinhar. Comece a mapear a participação cidadã.',
        description:
          'Uma plataforma para prefeituras e consultorias conduzirem Planos Diretores com mapas interativos, participação social híbrida, linguagem cidadã, transparência e devolutivas rastreáveis.',
        primaryCta: 'Explorar plataforma',
        secondaryCta: 'Ver mapa demonstrativo',
      },
      proof: {
        projects: 'processos participativos simuláveis',
        layers: 'camadas urbanísticas',
        channels: 'canais de participação',
        flow: 'fluxo de devolutiva',
      },
      pain: {
        title: 'Substitua formulários soltos por participação territorializada.',
        description:
          'A plataforma mostra como audiências, mapas, documentos públicos e contribuições presenciais podem alimentar uma única base de dados urbana.',
      },
      cards: {
        geolocated: {
          title: 'Contribuições georreferenciadas',
          text: 'Cidadãos comentam diretamente sobre bairros, zonas, eixos, perímetros e instrumentos urbanísticos.',
        },
        hybrid: {
          title: 'Participação híbrida',
          text: 'A experiência nasce mobile-first e já prevê coleta assistida em campo, audiências e unidades móveis.',
        },
        governance: {
          title: 'Governança com devolutiva',
          text: 'Cada contribuição pode seguir para triagem, parecer, validação, deliberação e resposta final.',
        },
      },
      journey: {
        title: 'Do mapa público ao parecer técnico.',
        steps: {
          design: 'Desenhe a consulta',
          collect: 'Colete no mapa e nos documentos',
          analyze: 'Agrupe por tema e território',
          decide: 'Valide com prefeitura e conselho',
          report: 'Publique devolutivas e exporte dados',
        },
      },
      map: {
        eyebrow: 'Mapa demonstrativo',
        title: 'Clique no território para simular uma contribuição.',
        description:
          'As camadas abaixo representam dados urbanos comuns em um Plano Diretor. No produto real, esses dados viriam de Shapefile, KML, KMZ, GeoJSON ou integrações GIS municipais.',
        selectedPoint: 'Ponto selecionado',
        formTitle: 'Nova contribuição territorial',
        formHint: 'Este formulário simula a captura cidadã vinculada à coordenada clicada.',
        subjectLabel: 'Tema',
        messageLabel: 'Contribuição',
        submit: 'Registrar contribuição',
        emptyState: 'Clique no mapa para iniciar uma contribuição.',
        layerTitle: 'Camadas urbanísticas',
        contributionTitle: 'Contribuições recentes',
        coordinates: 'Coordenadas',
        source: 'Canal',
      },
      analytics: {
        title: 'Painel público simples',
        contributions: 'Contribuições',
        neighborhoods: 'Bairros impactados',
        pending: 'Em triagem',
        answered: 'Com devolutiva',
      },
      documents: {
        title: 'Documentos públicos com linguagem cidadã',
        technical: 'Texto técnico',
        citizen: 'Linguagem cidadã',
        technicalText:
          'Art. 24. Ficam instituídos os Eixos de Estruturação Urbana como áreas prioritárias para adensamento qualificado, mobilidade sustentável e uso misto do solo.',
        citizenText:
          'A prefeitura quer concentrar crescimento urbano em áreas com melhor transporte, serviços e infraestrutura, evitando expansão desordenada.',
      },
      plans: {
        title: 'Planos pensados para o processo participativo',
        subtitle:
          'O preço deve acompanhar a complexidade institucional, não o número de cidadãos que participam.',
        consultation: 'Consulta',
        webgis: 'WebGIS',
        governance: 'Governança',
        enterprise: 'Enterprise',
      },
      footer: {
        text: 'Plataforma brasileira de participação social e WebGIS para Planos Diretores.',
      },
    },
  },
  en: {
    translation: {
      nav: {
        product: 'Product',
        map: 'Map',
        plans: 'Plans',
        demo: 'Book a demo',
      },
      hero: {
        eyebrow: 'WebGIS for Master Plans',
        title: 'Stop guessing. Start mapping citizen participation.',
        description:
          'A platform for cities and planning consultants to run master plan processes with interactive maps, hybrid participation, plain language, transparency, and traceable feedback.',
        primaryCta: 'Explore platform',
        secondaryCta: 'View demo map',
      },
      proof: {
        projects: 'participatory processes to simulate',
        layers: 'urban planning layers',
        channels: 'participation channels',
        flow: 'feedback workflow',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
