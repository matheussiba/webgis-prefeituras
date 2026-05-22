import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircleMarker,
  MapContainer,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import type { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import {
  complianceItems,
  mapCenter,
  pilotProject,
  planTiers,
  sampleContributions,
  urbanLayers,
  workflowSteps,
} from './data'
import './App.css'

function MapClickHandler({ onSelect }: { onSelect: (event: LeafletMouseEvent) => void }) {
  useMapEvents({
    click: onSelect,
  })

  return null
}

function App() {
  const { t } = useTranslation()
  const [activeLayers, setActiveLayers] = useState(() => new Set(urbanLayers.map((layer) => layer.id)))
  const [selectedPoint, setSelectedPoint] = useState<LatLngExpression | null>(null)

  const activeUrbanLayers = useMemo(
    () => urbanLayers.filter((layer) => activeLayers.has(layer.id)),
    [activeLayers],
  )

  const toggleLayer = (layerId: string) => {
    setActiveLayers((currentLayers) => {
      const nextLayers = new Set(currentLayers)

      if (nextLayers.has(layerId)) {
        nextLayers.delete(layerId)
      } else {
        nextLayers.add(layerId)
      }

      return nextLayers
    })
  }

  const selectedPointLabel = Array.isArray(selectedPoint)
    ? `${selectedPoint[0].toFixed(5)}, ${selectedPoint[1].toFixed(5)}`
    : ''

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="WebGIS Prefeituras">
          <span className="brand-mark">WG</span>
          <span>WebGIS Prefeituras</span>
        </a>
        <nav className="site-nav" aria-label="Navegacao principal">
          <a href="#product">{t('nav.product')}</a>
          <a href="#map">{t('nav.map')}</a>
          <a href="#plans">{t('nav.plans')}</a>
          <a className="nav-cta" href="mailto:demo@webgisprefeituras.com">
            {t('nav.demo')}
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-content">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="hero-description">{t('hero.description')}</p>
            <div className="hero-actions">
              <a className="button primary" href="#product">
                {t('hero.primaryCta')}
              </a>
              <a className="button secondary" href="#map">
                {t('hero.secondaryCta')}
              </a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Resumo da plataforma">
            <div>
              <strong>3</strong>
              <span>{t('proof.channels')}</span>
            </div>
            <div>
              <strong>{urbanLayers.length}</strong>
              <span>{t('proof.layers')}</span>
            </div>
            <div>
              <strong>1</strong>
              <span>{t('proof.flow')}</span>
            </div>
            <div>
              <strong>12</strong>
              <span>{t('proof.projects')}</span>
            </div>
          </div>
        </section>

        <section id="product" className="section split-section">
          <div>
            <p className="eyebrow">Plataforma integrada</p>
            <h2>{t('pain.title')}</h2>
          </div>
          <p>{t('pain.description')}</p>
        </section>

        <section className="section pilot-section">
          <div className="pilot-card">
            <p className="eyebrow">Município piloto</p>
            <h2>{pilotProject.municipality}</h2>
            <p>{pilotProject.scope}</p>
          </div>
          <div className="pilot-details">
            <article>
              <span>Fase simulada</span>
              <strong>{pilotProject.phase}</strong>
            </article>
            <article>
              <span>Ciclo de implantação</span>
              <strong>{pilotProject.duration}</strong>
            </article>
            <article>
              <span>Canais de participação</span>
              <ul>
                {pilotProject.channels.map((channel) => (
                  <li key={channel}>{channel}</li>
                ))}
              </ul>
            </article>
            <article>
              <span>Entregáveis</span>
              <ul>
                {pilotProject.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="feature-grid" aria-label="Beneficios principais">
          <article className="feature-card">
            <span>01</span>
            <h3>{t('cards.geolocated.title')}</h3>
            <p>{t('cards.geolocated.text')}</p>
          </article>
          <article className="feature-card">
            <span>02</span>
            <h3>{t('cards.hybrid.title')}</h3>
            <p>{t('cards.hybrid.text')}</p>
          </article>
          <article className="feature-card">
            <span>03</span>
            <h3>{t('cards.governance.title')}</h3>
            <p>{t('cards.governance.text')}</p>
          </article>
        </section>

        <section className="section journey-section">
          <div>
            <p className="eyebrow">Fluxo institucional</p>
            <h2>{t('journey.title')}</h2>
          </div>
          <ol className="journey-list">
            <li>{t('journey.steps.design')}</li>
            <li>{t('journey.steps.collect')}</li>
            <li>{t('journey.steps.analyze')}</li>
            <li>{t('journey.steps.decide')}</li>
            <li>{t('journey.steps.report')}</li>
          </ol>
        </section>

        <section id="map" className="section map-section">
          <div className="section-heading">
            <p className="eyebrow">{t('map.eyebrow')}</p>
            <h2>{t('map.title')}</h2>
            <p>{t('map.description')}</p>
          </div>

          <div className="map-layout">
            <div className="map-card">
              <MapContainer center={mapCenter} zoom={13} scrollWheelZoom className="map-container">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler
                  onSelect={(event) => setSelectedPoint([event.latlng.lat, event.latlng.lng])}
                />
                {activeUrbanLayers.map((layer) =>
                  layer.geometry === 'line' ? (
                    <Polyline
                      key={layer.id}
                      pathOptions={{ color: layer.color, weight: 5 }}
                      positions={layer.coordinates}
                    >
                      <Popup>
                        <strong>{layer.name}</strong>
                        <p>{layer.description}</p>
                      </Popup>
                    </Polyline>
                  ) : (
                    <Polygon
                      key={layer.id}
                      pathOptions={{ color: layer.color, fillOpacity: 0.18, weight: 2 }}
                      positions={layer.coordinates}
                    >
                      <Popup>
                        <strong>{layer.name}</strong>
                        <p>{layer.description}</p>
                      </Popup>
                    </Polygon>
                  ),
                )}
                {sampleContributions.map((contribution) => (
                  <CircleMarker
                    key={contribution.id}
                    center={contribution.coordinates}
                    pathOptions={{ color: '#0f172a', fillColor: '#f97316', fillOpacity: 0.9 }}
                    radius={7}
                  >
                    <Popup>
                      <strong>{contribution.title}</strong>
                      <p>
                        {t('map.source')}: {contribution.source}
                      </p>
                    </Popup>
                  </CircleMarker>
                ))}
                {selectedPoint && (
                  <CircleMarker
                    center={selectedPoint}
                    pathOptions={{ color: '#be123c', fillColor: '#be123c', fillOpacity: 0.85 }}
                    radius={9}
                  />
                )}
              </MapContainer>
            </div>

            <aside className="map-sidebar">
              <div className="sidebar-block">
                <h3>{t('map.layerTitle')}</h3>
                <div className="layer-list">
                  {urbanLayers.map((layer) => (
                    <label key={layer.id} className="layer-toggle">
                      <input
                        checked={activeLayers.has(layer.id)}
                        onChange={() => toggleLayer(layer.id)}
                        type="checkbox"
                      />
                      <span style={{ backgroundColor: layer.color }} />
                      {layer.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-block contribution-form">
                <h3>{t('map.formTitle')}</h3>
                {selectedPoint ? (
                  <form>
                    <p className="form-hint">{t('map.formHint')}</p>
                    <label>
                      {t('map.coordinates')}
                      <input readOnly value={selectedPointLabel} />
                    </label>
                    <label>
                      {t('map.subjectLabel')}
                      <select defaultValue="zoneamento">
                        <option value="zoneamento">Zoneamento</option>
                        <option value="habitacao">Habitação</option>
                        <option value="mobilidade">Mobilidade</option>
                        <option value="meio-ambiente">Meio ambiente</option>
                      </select>
                    </label>
                    <label>
                      {t('map.messageLabel')}
                      <textarea
                        defaultValue="Gostaria de registrar uma sugestão para este ponto do território."
                        rows={4}
                      />
                    </label>
                    <button type="button">{t('map.submit')}</button>
                  </form>
                ) : (
                  <p className="empty-state">{t('map.emptyState')}</p>
                )}
              </div>
            </aside>
          </div>
        </section>

        <section className="analytics-strip" aria-label="Indicadores publicos">
          <h2>{t('analytics.title')}</h2>
          <div className="analytics-grid">
            <div>
              <strong>128</strong>
              <span>{t('analytics.contributions')}</span>
            </div>
            <div>
              <strong>18</strong>
              <span>{t('analytics.neighborhoods')}</span>
            </div>
            <div>
              <strong>42</strong>
              <span>{t('analytics.pending')}</span>
            </div>
            <div>
              <strong>86</strong>
              <span>{t('analytics.answered')}</span>
            </div>
          </div>
        </section>

        <section className="section workflow-section">
          <div className="section-heading">
            <p className="eyebrow">Workflow multinível</p>
            <h2>Da contribuição à devolutiva homologada.</h2>
            <p>
              A plataforma organiza o caminho operacional previsto para processos participativos,
              mantendo rastreabilidade entre captura, análise técnica e resposta pública.
            </p>
          </div>
          <div className="workflow-grid">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="workflow-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section document-section">
          <div>
            <p className="eyebrow">Linguagem cidadã</p>
            <h2>{t('documents.title')}</h2>
          </div>
          <div className="document-grid">
            <article>
              <span>{t('documents.technical')}</span>
              <p>{t('documents.technicalText')}</p>
            </article>
            <article>
              <span>{t('documents.citizen')}</span>
              <p>{t('documents.citizenText')}</p>
            </article>
          </div>
        </section>

        <section className="section compliance-section">
          <div className="section-heading">
            <p className="eyebrow">gov.br, LGPD e auditoria</p>
            <h2>Conformidade tratada como requisito de produto.</h2>
            <p>
              A primeira versão apresenta a arquitetura de confiança que será implementada nas fases
              institucionais do produto.
            </p>
          </div>
          <div className="compliance-grid">
            {complianceItems.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="plans" className="section plans-section">
          <div className="section-heading">
            <p className="eyebrow">Pricing</p>
            <h2>{t('plans.title')}</h2>
            <p>{t('plans.subtitle')}</p>
          </div>
          <div className="plans-grid">
            {planTiers.map((tier) => (
              <article key={tier.nameKey} className="plan-card">
                <h3>{t(tier.nameKey)}</h3>
                <p>{tier.description}</p>
                <ul>
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section proposal-section">
          <div>
            <p className="eyebrow">Implantação institucional</p>
            <h2>Pronta para apoiar processos oficiais de Plano Diretor.</h2>
          </div>
          <div className="proposal-copy">
            <p>
              A plataforma reúne portal público, WebGIS, consulta documental, participação híbrida,
              triagem, devolutiva e exportação dos dados consolidados para subsidiar o relatório
              final e o Projeto de Lei do Plano Diretor.
            </p>
            <p>
              A arquitetura foi pensada para equipes técnicas, consultorias, conselhos e gestão
              municipal trabalharem em um fluxo único, com transparência pública e segurança jurídica.
            </p>
          </div>
        </section>

        <footer className="site-footer">
          <p>{t('footer.text')}</p>
        </footer>
      </main>
    </div>
  )
}

export default App
