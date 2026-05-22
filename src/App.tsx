import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as MapboxMap, Marker as MapboxMarker } from 'mapbox-gl'

type MapboxNamespace = (typeof import('mapbox-gl'))['default']
import {
  contributionCategories,
  contributionSources,
  faqItems,
  featureCategories,
  featureComparisonGroups,
  mapStyleOptions,
  planTiers,
  productFeatureSections,
  projectExamples,
  sampleContributions,
  subscriptionBenefits,
  urbanLayers,
} from './data'
import type {
  Contribution,
  ContributionCategory,
  ContributionCategoryId,
  ContributionSource,
  ContributionStatus,
} from './data'
import './App.css'

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined
const planNames = planTiers.map((tier) => tier.name)

const allStatuses: ContributionStatus[] = ['Nova', 'Em triagem', 'Análise técnica', 'Com devolutiva']

type Page = 'home' | 'pricing' | 'map' | 'about'
type MapTabId = 'layers' | 'contribute' | 'list' | 'style'

function getCurrentPage(): Page {
  if (window.location.hash === '#mapa') return 'map'
  if (window.location.hash === '#sobre') return 'about'
  if (window.location.hash === '#precos') return 'pricing'
  return 'home'
}

function getCategory(id: ContributionCategoryId): ContributionCategory {
  return contributionCategories.find((c) => c.id === id) ?? contributionCategories[0]
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(value: string): string {
  try {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch {
    return value
  }
}

function buildPopupHTML(contribution: Contribution, category: ContributionCategory): string {
  return `
    <div class="contribution-popup">
      <span class="contribution-popup-tag" style="background:${category.color}">${escapeHtml(category.name)}</span>
      <strong>${escapeHtml(contribution.title)}</strong>
      <p>${escapeHtml(contribution.description)}</p>
      <div class="contribution-popup-meta">
        <span>${escapeHtml(contribution.source)}</span>
        <span>${escapeHtml(contribution.status)}</span>
        <span>${escapeHtml(formatDate(contribution.createdAt))}</span>
      </div>
    </div>
  `
}

function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="WebGIS Prefeituras">
        <span className="brand-mark">WG</span>
        <span>WebGIS Prefeituras</span>
      </a>
      <nav className="site-nav" aria-label="Navegação principal">
        <a className={currentPage === 'pricing' ? 'nav-active' : ''} href="#precos">
          Preços
        </a>
        <a className={currentPage === 'map' ? 'nav-active' : ''} href="#mapa">
          Mapa interativo
        </a>
        <a className={currentPage === 'about' ? 'nav-active' : ''} href="#sobre">
          Sobre
        </a>
      </nav>
    </header>
  )
}

function LandingPage() {
  return (
    <main id="pricing-main">
      <section className="pricing-hero">
        <div className="pricing-hero-copy">
          <p className="eyebrow">Plataforma de participação territorial</p>
          <h1>Transforme contribuição comunitária em decisões confiáveis.</h1>
          <p className="hero-description">
            Colete o feedback qualificado da população, comunique o progresso do Plano Diretor com
            transparência e fundamente cada decisão em informação territorial confiável.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="mailto:demo@webgisprefeituras.com">
              Agendar demonstração
            </a>
            <a className="button secondary" href="#precos">
              Ver planos e preços
            </a>
            <a className="button secondary" href="#mapa">
              Abrir mapa participativo
            </a>
          </div>
        </div>
        <aside className="pricing-note" aria-label="Resumo da plataforma">
          <span>Mapa no centro do processo</span>
          <strong>Quando a resposta depende de onde acontece, o mapa vira o coração da decisão.</strong>
          <p>
            Contribuições territoriais, documentos, audiência pública, análise técnica e devolutivas
            ficam conectados em um fluxo institucional único.
          </p>
        </aside>
      </section>

      <section id="produto" className="section product-story-section">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Recursos da plataforma</p>
          <h2>Participação comunitária com inteligência territorial real.</h2>
        </div>
        <div className="product-story-grid">
          {productFeatureSections.map((section) => (
            <article key={section.title} className="product-story-card">
              <span>{section.eyebrow}</span>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <a href="#precos">{section.linkLabel}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonial-section">
        <figure className="testimonial-photo" aria-hidden="true">
          <span>RM</span>
        </figure>
        <blockquote>
          “Quando a participação tem contexto territorial e devolutivas rastreáveis, o processo do Plano
          Diretor ganha legitimidade e velocidade na tomada de decisão.”
        </blockquote>
        <div className="testimonial-author">
          <strong>Rafael Moraes</strong>
          <span>Consultor em planejamento urbano</span>
          <a className="button outline" href="#recursos">
            Ler história completa
          </a>
        </div>
      </section>

      <section className="section category-section">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Recursos por categoria</p>
          <h2>Um conjunto completo para participação, mapas e gestão interna.</h2>
        </div>
        <div className="category-grid">
          {featureCategories.map((category) => (
            <a key={category} href="#precos">
              {category}
            </a>
          ))}
        </div>
      </section>

      <section id="incluso" className="section benefits-section">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Incluso em todos os planos</p>
          <h2>Toda assinatura inclui uma base institucional sólida.</h2>
        </div>
        <div className="benefits-grid">
          {subscriptionBenefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span className="benefit-icon">{index + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <a href="#faq">Saiba mais</a>
            </article>
          ))}
        </div>
      </section>

      <section id="solucoes" className="section project-section">
        <div className="section-heading">
          <p className="eyebrow">Projetos possíveis</p>
          <h2>Exemplos de uso para prefeituras e consultorias.</h2>
        </div>
        <div className="project-grid">
          {projectExamples.map((project) => (
            <article key={project.title}>
              <span>{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.location}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection />

      <section className="section final-cta">
        <h2>Pronto para começar?</h2>
        <p>
          Agende uma conversa para entender planos, módulos, integrações e o melhor caminho para o seu
          processo municipal.
        </p>
        <a className="button primary" href="mailto:demo@webgisprefeituras.com">
          Agendar demonstração
        </a>
        <span>Ou fale com nossa equipe comercial.</span>
      </section>

      <FooterLinks />
    </main>
  )
}

function PricingPage() {
  return (
    <main id="pricing-main">
      <section id="precos" className="section pricing-page-hero">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Planos e preços</p>
          <h1>Planos para participação pública e Plano Diretor.</h1>
          <p>
            Escolha o plano conforme a maturidade do município, a complexidade do processo e os
            recursos necessários para mapas, participação, análise e devolutivas.
          </p>
        </div>
      </section>

      <section id="planos" className="section plans-section">
        <div className="plans-grid">
          {planTiers.map((tier) => (
            <article key={tier.name} className={`plan-card plan-card-${tier.accent}`}>
              {tier.badge && <div className="featured-badge">{tier.badge}</div>}
              <div className="plan-header">
                <h3>{tier.name}</h3>
                <strong>{tier.priceLabel}</strong>
                {tier.priceNote && <em>{tier.priceNote}</em>}
              </div>
              <p>{tier.description}</p>
              <a
                className="button plan-button"
                href={`mailto:demo@webgisprefeituras.com?subject=Plano ${tier.name}`}
              >
                Agendar demonstração
              </a>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="pricing-footnote">
          <span>Módulos adicionais estão disponíveis para todos os planos.</span>
          <a className="button primary small-button" href="mailto:contato@webgisprefeituras.com">
            Fale com vendas
          </a>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Comparação de recursos</p>
          <h2>Veja o que entra em cada plano.</h2>
        </div>
        <div className="comparison-table" role="table" aria-label="Comparação de planos">
          <div className="comparison-row comparison-head" role="row">
            <div role="columnheader">Recurso</div>
            {planNames.map((name) => (
              <div key={name} role="columnheader">
                {name}
              </div>
            ))}
          </div>
          {featureComparisonGroups.map((group) => (
            <div key={group.title} className="comparison-group">
              <div className="comparison-group-title">{group.title}</div>
              {group.rows.map((row) => (
                <div key={row.feature} className="comparison-row" role="row">
                  <div className="feature-cell" role="cell">
                    <strong>{row.feature}</strong>
                    <span>{row.description}</span>
                  </div>
                  {row.availability.map((isAvailable, index) => (
                    <div key={`${row.feature}-${planNames[index]}`} role="cell">
                      <span
                        aria-label={isAvailable ? 'Incluído' : 'Não incluído'}
                        className={
                          isAvailable ? `status-dot status-dot-${index}` : 'status-empty'
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function MapPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const mapboxRef = useRef<MapboxNamespace | null>(null)
  const markersRef = useRef<Record<string, MapboxMarker>>({})
  const draftMarkerRef = useRef<MapboxMarker | null>(null)

  const [activeTab, setActiveTab] = useState<MapTabId>('layers')
  const [styleId, setStyleId] = useState<string>(mapStyleOptions[0].id)
  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(urbanLayers.map((layer) => [layer.id, true])),
  )
  const [contributions, setContributions] = useState<Contribution[]>(() => sampleContributions)
  const [draftLocation, setDraftLocation] = useState<{ lng: number; lat: number } | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formCategory, setFormCategory] = useState<ContributionCategoryId>('mobility')
  const [formSource, setFormSource] = useState<ContributionSource>('Online')
  const [filterCategory, setFilterCategory] = useState<'all' | ContributionCategoryId>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | ContributionStatus>('all')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const activeTabRef = useRef(activeTab)
  const mapCanvasRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    activeTabRef.current = activeTab
    if (activeTab === 'contribute') {
      window.requestAnimationFrame(() => {
        mapCanvasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else if (draftMarkerRef.current) {
      draftMarkerRef.current.remove()
      draftMarkerRef.current = null
      setDraftLocation(null)
    }
  }, [activeTab])

  const layerVisibilityRef = useRef(layerVisibility)
  useEffect(() => {
    layerVisibilityRef.current = layerVisibility
  }, [layerVisibility])

  const filteredContributions = useMemo(() => {
    return contributions.filter((contribution) => {
      const matchesCategory = filterCategory === 'all' || contribution.category === filterCategory
      const matchesStatus = filterStatus === 'all' || contribution.status === filterStatus
      return matchesCategory && matchesStatus
    })
  }, [contributions, filterCategory, filterStatus])

  const stats = useMemo(() => {
    const byCategory: Record<ContributionCategoryId, number> = {
      mobility: 0,
      housing: 0,
      environment: 0,
      'public-equipment': 0,
      sanitation: 0,
      safety: 0,
      other: 0,
    }
    contributions.forEach((c) => {
      byCategory[c.category] += 1
    })
    return {
      total: contributions.length,
      byCategory,
    }
  }, [contributions])

  useEffect(() => {
    if (!containerRef.current || !mapboxToken) return

    let isCancelled = false

    async function initialize() {
      const { default: mapbox } = await import('mapbox-gl')
      if (isCancelled || !containerRef.current) return

      mapboxRef.current = mapbox
      mapbox.accessToken = mapboxToken!

      const map = new mapbox.Map({
        center: [-45.9009, -23.2237],
        container: containerRef.current,
        pitch: 32,
        style: mapStyleOptions[0].url,
        zoom: 12.4,
      })

      mapRef.current = map

      map.addControl(new mapbox.NavigationControl({ visualizePitch: true }), 'top-right')
      map.addControl(
        new mapbox.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: false,
          showUserHeading: false,
        }),
        'top-right',
      )
      map.addControl(new mapbox.FullscreenControl(), 'top-right')
      map.addControl(new mapbox.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left')

      map.on('load', () => {
        addUrbanLayers(map)
        applyVisibility(map)
        setMapReady(true)
      })

      map.on('style.load', () => {
        addUrbanLayers(map)
        applyVisibility(map)
      })

      map.on('click', (event) => {
        if (activeTabRef.current !== 'contribute') return

        const next = { lng: event.lngLat.lng, lat: event.lngLat.lat }
        setDraftLocation(next)

        if (draftMarkerRef.current) {
          draftMarkerRef.current.setLngLat([next.lng, next.lat])
        } else {
          const element = document.createElement('div')
          element.className = 'draft-marker'
          element.innerHTML = '<span></span>'
          draftMarkerRef.current = new mapbox.Marker({ element, anchor: 'bottom' })
            .setLngLat([next.lng, next.lat])
            .addTo(map)
        }
      })
    }

    initialize()

    return () => {
      isCancelled = true
      Object.values(markersRef.current).forEach((marker) => marker.remove())
      markersRef.current = {}
      draftMarkerRef.current?.remove()
      draftMarkerRef.current = null
      mapRef.current?.remove()
      mapRef.current = null
      mapboxRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    applyVisibility(map)
  }, [layerVisibility, mapReady])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const option = mapStyleOptions.find((s) => s.id === styleId)
    if (option) map.setStyle(option.url)
  }, [styleId])

  useEffect(() => {
    const map = mapRef.current
    const mapbox = mapboxRef.current
    if (!map || !mapbox || !mapReady) return

    const visibleIds = new Set(filteredContributions.map((contribution) => contribution.id))

    Object.keys(markersRef.current).forEach((id) => {
      if (!visibleIds.has(id)) {
        markersRef.current[id].remove()
        delete markersRef.current[id]
      }
    })

    filteredContributions.forEach((contribution) => {
      if (markersRef.current[contribution.id]) return

      const category = getCategory(contribution.category)
      const element = document.createElement('div')
      element.className = 'category-marker'
      element.style.setProperty('--marker-color', category.color)
      element.innerHTML = `<span>${escapeHtml(category.icon)}</span>`

      const marker = new mapbox.Marker({ element, anchor: 'bottom' })
        .setLngLat([contribution.coordinates[1], contribution.coordinates[0]])
        .setPopup(new mapbox.Popup({ offset: 24 }).setHTML(buildPopupHTML(contribution, category)))
        .addTo(map)

      markersRef.current[contribution.id] = marker
    })
  }, [filteredContributions, mapReady])

  function addUrbanLayers(map: MapboxMap) {
    urbanLayers.forEach((layer) => {
      const lngLat = layer.coordinates.map((coord) => {
        const [lat, lng] = coord as [number, number]
        return [lng, lat] as [number, number]
      })

      const polygonCoords =
        layer.geometry === 'polygon' &&
        (lngLat[0][0] !== lngLat[lngLat.length - 1][0] ||
          lngLat[0][1] !== lngLat[lngLat.length - 1][1])
          ? [...lngLat, lngLat[0]]
          : lngLat

      if (!map.getSource(layer.id)) {
        map.addSource(layer.id, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: { name: layer.name, description: layer.description },
                geometry:
                  layer.geometry === 'line'
                    ? { type: 'LineString', coordinates: lngLat }
                    : { type: 'Polygon', coordinates: [polygonCoords] },
              },
            ],
          } as GeoJSON.FeatureCollection,
        })
      }

      if (layer.geometry === 'line') {
        const lineId = `${layer.id}-line`
        if (!map.getLayer(lineId)) {
          map.addLayer({
            id: lineId,
            source: layer.id,
            type: 'line',
            paint: {
              'line-color': layer.color,
              'line-width': 5,
              'line-opacity': 0.85,
            },
          })
        }
      } else {
        const fillId = `${layer.id}-fill`
        const outlineId = `${layer.id}-outline`
        if (!map.getLayer(fillId)) {
          map.addLayer({
            id: fillId,
            source: layer.id,
            type: 'fill',
            paint: {
              'fill-color': layer.color,
              'fill-opacity': 0.22,
            },
          })
        }
        if (!map.getLayer(outlineId)) {
          map.addLayer({
            id: outlineId,
            source: layer.id,
            type: 'line',
            paint: {
              'line-color': layer.color,
              'line-width': 2,
              'line-opacity': 0.9,
            },
          })
        }
      }
    })
  }

  function applyVisibility(map: MapboxMap) {
    const current = layerVisibilityRef.current
    urbanLayers.forEach((layer) => {
      const visibility = current[layer.id] === false ? 'none' : 'visible'
      if (layer.geometry === 'line') {
        const id = `${layer.id}-line`
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', visibility)
      } else {
        const fillId = `${layer.id}-fill`
        const outlineId = `${layer.id}-outline`
        if (map.getLayer(fillId)) map.setLayoutProperty(fillId, 'visibility', visibility)
        if (map.getLayer(outlineId)) map.setLayoutProperty(outlineId, 'visibility', visibility)
      }
    })
  }

  function flyToContribution(contribution: Contribution) {
    const map = mapRef.current
    if (!map) return
    map.flyTo({
      center: [contribution.coordinates[1], contribution.coordinates[0]],
      zoom: 15.4,
      speed: 1.2,
      essential: true,
    })
    const marker = markersRef.current[contribution.id]
    marker?.togglePopup()
  }

  function toggleLayer(layerId: string) {
    setLayerVisibility((prev) => ({ ...prev, [layerId]: !prev[layerId] }))
  }

  function setAllLayersVisible(visible: boolean) {
    setLayerVisibility(Object.fromEntries(urbanLayers.map((layer) => [layer.id, visible])))
  }

  function clearDraft() {
    setDraftLocation(null)
    draftMarkerRef.current?.remove()
    draftMarkerRef.current = null
  }

  function useMapCenterAsLocation() {
    const map = mapRef.current
    const mapbox = mapboxRef.current
    if (!map || !mapbox) return
    const center = map.getCenter()
    setDraftLocation({ lng: center.lng, lat: center.lat })
    draftMarkerRef.current?.remove()
    const element = document.createElement('div')
    element.className = 'draft-marker'
    element.innerHTML = '<span></span>'
    draftMarkerRef.current = new mapbox.Marker({ element, anchor: 'bottom' })
      .setLngLat([center.lng, center.lat])
      .addTo(map)
  }

  function handleSubmitContribution(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draftLocation) {
      setFeedback('Clique no mapa para escolher onde a contribuição acontece.')
      return
    }
    if (!formTitle.trim()) {
      setFeedback('Adicione um título para a sua contribuição.')
      return
    }

    const contribution: Contribution = {
      id: `CON-${Date.now().toString(36).toUpperCase()}`,
      title: formTitle.trim(),
      description: formDescription.trim() || 'Contribuição registrada pelo cidadão pelo mapa participativo.',
      category: formCategory,
      source: formSource,
      status: 'Nova',
      coordinates: [draftLocation.lat, draftLocation.lng],
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setContributions((prev) => [contribution, ...prev])
    setFormTitle('')
    setFormDescription('')
    clearDraft()
    setFeedback(`Contribuição "${contribution.title}" registrada com sucesso. Veja na aba Contribuições.`)

    window.setTimeout(() => setFeedback(null), 5000)
  }

  return (
    <main id="map-main">
      <section className="map-hero">
        <div className="map-hero-copy">
          <p className="eyebrow">Mapa participativo</p>
          <h1>Adicione sua contribuição no mapa do Plano Diretor.</h1>
          <p>
            Explore o zoneamento, áreas de preservação, equipamentos e propostas. Clique no mapa para
            registrar uma contribuição georreferenciada na revisão participativa.
          </p>
        </div>
        <div className="map-hero-stats" aria-label="Indicadores de participação">
          <div>
            <strong>{stats.total}</strong>
            <span>contribuições no mapa</span>
          </div>
          <div>
            <strong>{urbanLayers.length}</strong>
            <span>camadas urbanísticas</span>
          </div>
          <div>
            <strong>4</strong>
            <span>canais de participação</span>
          </div>
        </div>
      </section>

      <section className="map-workspace">
        <aside className="map-sidebar" aria-label="Ferramentas do mapa participativo">
          <div className="map-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'layers'}
              className={activeTab === 'layers' ? 'active' : ''}
              onClick={() => setActiveTab('layers')}
            >
              Camadas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'contribute'}
              className={activeTab === 'contribute' ? 'active' : ''}
              onClick={() => setActiveTab('contribute')}
            >
              Contribuir
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'list'}
              className={activeTab === 'list' ? 'active' : ''}
              onClick={() => setActiveTab('list')}
            >
              Contribuições
              <em>{contributions.length}</em>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'style'}
              className={activeTab === 'style' ? 'active' : ''}
              onClick={() => setActiveTab('style')}
            >
              Estilo
            </button>
          </div>

          <div className="map-tab-panel">
            {activeTab === 'layers' && (
              <div className="layers-panel">
                <div className="panel-heading">
                  <strong>Camadas urbanísticas</strong>
                  <p>Mostre ou oculte camadas do Plano Diretor para focar a análise.</p>
                </div>
                <div className="layers-actions">
                  <button type="button" className="ghost-button" onClick={() => setAllLayersVisible(true)}>
                    Mostrar todas
                  </button>
                  <button type="button" className="ghost-button" onClick={() => setAllLayersVisible(false)}>
                    Ocultar todas
                  </button>
                </div>
                <ul className="layer-list">
                  {urbanLayers.map((layer) => {
                    const visible = layerVisibility[layer.id]
                    return (
                      <li key={layer.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={visible}
                            onChange={() => toggleLayer(layer.id)}
                          />
                          <span className="layer-swatch" style={{ backgroundColor: layer.color }} />
                          <span className="layer-info">
                            <strong>{layer.name}</strong>
                            <em>{layer.description}</em>
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {activeTab === 'contribute' && (
              <form className="contribute-panel" onSubmit={handleSubmitContribution}>
                <div className="panel-heading">
                  <strong>Registrar contribuição</strong>
                  <p>
                    Clique no mapa para definir onde a sua proposta acontece e descreva-a abaixo.
                  </p>
                </div>

                <div className={`location-status ${draftLocation ? 'is-set' : 'is-empty'}`}>
                  {draftLocation ? (
                    <>
                      <span>Local selecionado</span>
                      <strong>
                        {draftLocation.lat.toFixed(5)}, {draftLocation.lng.toFixed(5)}
                      </strong>
                      <button type="button" className="ghost-button" onClick={clearDraft}>
                        Limpar local
                      </button>
                    </>
                  ) : (
                    <>
                      <span>Nenhum local selecionado</span>
                      <strong>Clique no mapa para escolher um ponto.</strong>
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={useMapCenterAsLocation}
                      >
                        Usar centro do mapa
                      </button>
                    </>
                  )}
                </div>

                <label className="field">
                  <span>Título da contribuição</span>
                  <input
                    type="text"
                    placeholder="Ex.: Travessia segura na Av. das Acácias"
                    value={formTitle}
                    onChange={(event) => setFormTitle(event.target.value)}
                    maxLength={120}
                  />
                </label>

                <label className="field">
                  <span>Descrição</span>
                  <textarea
                    rows={4}
                    placeholder="Descreva a sua proposta, problema ou observação no território."
                    value={formDescription}
                    onChange={(event) => setFormDescription(event.target.value)}
                    maxLength={600}
                  />
                </label>

                <label className="field">
                  <span>Tema da contribuição</span>
                  <div className="category-options" role="radiogroup">
                    {contributionCategories.map((category) => {
                      const checked = formCategory === category.id
                      return (
                        <button
                          type="button"
                          key={category.id}
                          role="radio"
                          aria-checked={checked}
                          className={`category-chip ${checked ? 'selected' : ''}`}
                          style={{ '--chip-color': category.color } as React.CSSProperties}
                          onClick={() => setFormCategory(category.id)}
                        >
                          <i>{category.icon}</i>
                          {category.name}
                        </button>
                      )
                    })}
                  </div>
                </label>

                <label className="field">
                  <span>Canal de participação</span>
                  <select
                    value={formSource}
                    onChange={(event) => setFormSource(event.target.value as ContributionSource)}
                  >
                    {contributionSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </label>

                {feedback && <p className="form-feedback">{feedback}</p>}

                <div className="form-actions">
                  <button type="submit" className="button primary">
                    Enviar contribuição
                  </button>
                  <button
                    type="button"
                    className="button outline"
                    onClick={() => {
                      setFormTitle('')
                      setFormDescription('')
                      setFormCategory('mobility')
                      setFormSource('Online')
                      clearDraft()
                    }}
                  >
                    Limpar formulário
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'list' && (
              <div className="list-panel">
                <div className="panel-heading">
                  <strong>Contribuições no território</strong>
                  <p>Filtre por tema ou etapa do processo. Clique para localizar no mapa.</p>
                </div>

                <div className="filters">
                  <label>
                    <span>Tema</span>
                    <select
                      value={filterCategory}
                      onChange={(event) =>
                        setFilterCategory(event.target.value as 'all' | ContributionCategoryId)
                      }
                    >
                      <option value="all">Todos os temas</option>
                      {contributionCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Status</span>
                    <select
                      value={filterStatus}
                      onChange={(event) =>
                        setFilterStatus(event.target.value as 'all' | ContributionStatus)
                      }
                    >
                      <option value="all">Todos os status</option>
                      {allStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <p className="filter-summary">
                  {filteredContributions.length} de {contributions.length} contribuições visíveis no
                  mapa.
                </p>

                <ul className="contribution-list">
                  {filteredContributions.length === 0 && (
                    <li className="empty-state">
                      Nenhuma contribuição encontrada com os filtros atuais.
                    </li>
                  )}
                  {filteredContributions.map((contribution) => {
                    const category = getCategory(contribution.category)
                    return (
                      <li key={contribution.id}>
                        <button type="button" onClick={() => flyToContribution(contribution)}>
                          <span className="list-tag" style={{ backgroundColor: category.color }}>
                            {category.icon}
                          </span>
                          <span className="list-body">
                            <strong>{contribution.title}</strong>
                            <em>{contribution.description}</em>
                            <span className="list-meta">
                              <span>{category.name}</span>
                              <span>{contribution.source}</span>
                              <span>{contribution.status}</span>
                              <span>{formatDate(contribution.createdAt)}</span>
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {activeTab === 'style' && (
              <div className="style-panel">
                <div className="panel-heading">
                  <strong>Estilo do mapa</strong>
                  <p>Troque o estilo conforme o tipo de análise e contexto do território.</p>
                </div>
                <div className="style-options">
                  {mapStyleOptions.map((option) => {
                    const selected = option.id === styleId
                    return (
                      <button
                        type="button"
                        key={option.id}
                        className={`style-option ${selected ? 'selected' : ''}`}
                        onClick={() => setStyleId(option.id)}
                      >
                        <span className={`style-preview style-preview-${option.id}`} aria-hidden="true" />
                        <span className="style-info">
                          <strong>{option.name}</strong>
                          <em>{option.description}</em>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>

        <div className="map-canvas" ref={mapCanvasRef}>
          {mapboxToken ? (
            <div ref={containerRef} className="map-container" />
          ) : (
            <div className="map-token-warning">
              Configure a variável de ambiente para carregar o mapa interativo.
            </div>
          )}

          {activeTab === 'contribute' && (
            <div className="map-floating-hint">
              <strong>Modo contribuição ativo</strong>
              <span>Clique em qualquer ponto do mapa para definir o local da sua proposta.</span>
            </div>
          )}

          <div className="map-floating-summary" aria-label="Resumo das categorias">
            <strong>Contribuições por tema</strong>
            <ul>
              {contributionCategories.map((category) => (
                <li key={category.id}>
                  <span className="category-dot" style={{ backgroundColor: category.color }} />
                  <span>{category.name}</span>
                  <em>{stats.byCategory[category.id]}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section map-cta">
        <div>
          <p className="eyebrow">Para a equipe técnica</p>
          <h2>Conheça os planos para conduzir o processo participativo do seu município.</h2>
        </div>
        <a className="button primary" href="#precos">
          Ver planos e preços
        </a>
      </section>
    </main>
  )
}

function AboutPage() {
  const partners = [
    {
      name: 'Thales Tito',
      image: '/team/thales-tito.jpg',
      description:
        'Thales Tito atua desde 2014 no planejamento urbano e ambiental, liderando projetos voltados à construção de cidades mais inteligentes, sustentáveis e centradas nas pessoas. Com experiência em políticas públicas, planos diretores, licenciamento ambiental, participação cidadã e urbanismo tático, desenvolve soluções que integram tecnologia, análise territorial e inovação para transformar desafios urbanos em oportunidades de desenvolvimento. Engenheiro ambiental com formação complementar em Política do Solo na Espanha e Mudanças Climáticas no Brasil, possui trajetória marcada pela liderança de equipes multidisciplinares, gestão pública, consultoria e advocacy, sempre com foco em governança, engajamento social e criação de ambientes urbanos mais resilientes, humanos e habitáveis.',
    },
    {
      name: 'Matheus Barros',
      image: '/team/matheus-barros.jpg',
      description:
        'Matheus Barros é engenheiro ambiental e especialista em geotecnologias, com atuação voltada ao desenvolvimento de soluções sustentáveis por meio de análise espacial, automação e inteligência territorial. Com experiência em equipes internacionais e multiculturais, destaca-se pela capacidade de integrar tecnologia, dados geoespaciais e inovação em projetos ambientais, urbanos e territoriais. Possui formação em Engenharia Ambiental pela Universidade Federal de Itajubá e mestrado em Geotecnologias pela Universität Münster, além de especializações em Geociências, GIS e Direito Ambiental. Seu objetivo é aplicar geotecnologias e engenharia ambiental para criar soluções inteligentes, eficientes e sustentáveis, contribuindo para um futuro mais resiliente e orientado por dados.',
    },
  ]

  return (
    <main id="about-main">
      <section className="section about-hero">
        <p className="eyebrow">Nossa missão</p>
        <h1>Transformar a relação entre pessoas, cidades e territórios.</h1>
        <p>
          Nosso propósito é transformar a forma como territórios, cidades e destinos turísticos se
          conectam com as pessoas. Acreditamos que tecnologia, participação social e inteligência
          territorial podem criar experiências mais humanas, sustentáveis e acessíveis, fortalecendo
          comunidades locais e aproximando cidadãos, gestores públicos, visitantes e tomadores de
          decisão.
        </p>
        <p>
          Trabalhamos lado a lado com governos, especialistas, planejadores, pesquisadores e atores
          locais para desenvolver soluções digitais que promovam transparência, engajamento e
          valorização do território, contribuindo para cidades e regiões mais resilientes,
          inovadoras e conectadas ao futuro.
        </p>
      </section>

      <section className="section trusted-section">
        <div className="section-heading centered-heading">
          <p className="eyebrow">Um parceiro de confiança</p>
          <h2>Experiência em planejamento, participação e inteligência territorial.</h2>
        </div>
        <div className="partner-grid">
          {partners.map((partner) => (
            <article key={partner.name} className="partner-card">
              <img src={partner.image} alt={partner.name} />
              <div>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="section faq-section">
      <div className="section-heading centered-heading">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2>Tire suas dúvidas sobre planos, mapa participativo e contratação.</h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function FooterLinks() {
  const footerGroups = [
    {
      title: 'Produto',
      links: ['Recursos', 'Planos', 'Novidades'],
    },
    {
      title: 'Soluções',
      links: ['Plano Diretor', 'Participação social', 'Mobilidade urbana', 'Meio ambiente'],
    },
    {
      title: 'Recursos',
      links: ['Blog', 'Casos de uso', 'Webinars', 'Central de ajuda'],
    },
    {
      title: 'Empresa',
      links: ['Sobre nós', 'Carreiras', 'Contato', 'Programa de parceiros'],
    },
  ]

  return (
    <section id="sobre" className="footer-links-section">
      <div className="footer-links-grid">
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#precos">{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <a className="brand" href="#" aria-label="WebGIS Prefeituras">
          <span className="brand-mark">WG</span>
          <span>WebGIS Prefeituras</span>
        </a>
        <div className="social-links" aria-label="Redes sociais">
          <a href="#sobre">LinkedIn</a>
          <a href="#sobre">X / Twitter</a>
        </div>
        <small>© 2026 WebGIS Prefeituras. Todos os direitos reservados.</small>
        <div className="legal-links">
          <a href="#sobre">Política de Privacidade</a>
          <a href="#sobre">Termos de Serviço</a>
          <a href="#sobre">Cookies</a>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => getCurrentPage())

  useEffect(() => {
    const syncPage = () => setCurrentPage(getCurrentPage())
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  return (
    <div className={`app-shell app-shell-${currentPage}`}>
      <Header currentPage={currentPage} />
      {currentPage === 'home' && <LandingPage />}
      {currentPage === 'map' && <MapPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'pricing' && <PricingPage />}
      <footer id="recursos" className="site-footer">
        <p>WebGIS Prefeituras — Participação social e inteligência territorial para Planos Diretores.</p>
      </footer>
    </div>
  )
}

export default App
