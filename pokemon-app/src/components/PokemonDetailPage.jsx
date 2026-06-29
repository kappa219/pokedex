import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemon } from '../store/pokemonSlice'
import './PokemonDetail.css'
import Tilt from 'react-parallax-tilt'

export function PokemonDetailPage() {
  const { name } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { single, loading, error } = useSelector((state) => state.pokemon)

  const [selectedImage, setSelectedImage] = useState(null)
  //const imageRef = useRef(null)
  //const rafRef = useRef(null)
  //const pointerRef = useRef({ x: 0, y: 0, rect: null })

  useEffect(() => {
    if (name) dispatch(fetchPokemon(name))
  }, [dispatch, name])

  useEffect(() => {
    setSelectedImage(single?.image ?? null)
  }, [single])

  // useEffect(() => {
  //   return () => {
  //     if (rafRef.current) cancelAnimationFrame(rafRef.current)
  //   }
  // }, [])

  if (loading) {
    return (
      <div className="pokemon-list-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>caricamento del pokedex...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pokemon-list-container">
        <p className="error-message">Errore: {error}</p>
      </div>
    )
  }

  if (!single) {
    return (
      <div className="pokemon-list-container">
        <p>Nessun dato disponibile per "{name}"</p>
      </div>
    )
  }

  const p = single

  const TYPE_COLORS = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  }

  function getPageBackground(types) {
    if (!types || types.length === 0) return undefined
    const t0 = types[0]?.toLowerCase()
    const t1 = types[1]?.toLowerCase()
    const c0 = TYPE_COLORS[t0] || '#eef6ff'
    const c1 = TYPE_COLORS[t1] || null
    if (c1) {
      return `linear-gradient(135deg, ${c0}33, ${c0}99 40%, ${c1}99)`
    }
    return `linear-gradient(180deg, ${c0}20, ${c0}66)`
  }

  const pageBg = getPageBackground(p?.types)

  return (
    <div className="pd-page" style={pageBg ? { background: pageBg } : undefined}>
      <header className="pokedex-header">
        <button className="back-button" onClick={() => navigate(-1)}>Indietro</button>
        <h1>Dettaglio: {p.name}</h1>
      </header>

      <div className="pd-page-content">
        <aside className="pd-aside">
          <Tilt
            className="pd-image"
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
            perspective={1200}
            scale={1.12}
            transitionSpeed={400}
            gyroscope={true}
          // onMouseMove={(e) => {
          //   const rect = e.currentTarget.getBoundingClientRect()
          //   pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, rect }
          //   if (!rafRef.current) {
          //     rafRef.current = requestAnimationFrame(() => {
          //       rafRef.current = null
          //       const img = imageRef.current
          //       if (!img) return
          //       const r = pointerRef.current.rect
          //       const w = r.width
          //       const h = r.height
          //       const px = (pointerRef.current.x / w) - 0.5
          //       const py = (pointerRef.current.y / h) - 0.5
          //       const rotateY = px * 12
          //       const rotateX = -py * 10
          //       const translateX = px * 12
          //       const translateY = py * 8
          //       img.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`
          //     })
          //   }
          // }}
          // onMouseLeave={() => {
          //   const img = imageRef.current
          //   if (!img) return
          //   img.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)'
          //   img.style.transform = 'none'
          //   setTimeout(() => { if (img) img.style.transition = '' }, 450)
          // }}
          >

            {/* <img ref={imageRef} src={selectedImage || p.image} alt={p.name} /> */}

            <img src={selectedImage || p.image} alt={p.name}
               style={{marginRight: "20px"}}
            />
          </Tilt>
          <div className="pd-sprites">
            {p.sprites && (
              <>
                {p.sprites.front_default && (
                  <img
                  style={{marginRight: "20px"}}
                    src={p.sprites.front_default}
                    alt="front"
                    className={`sprite-thumb ${selectedImage === p.sprites.front_default ? 'active' : ''}`}
                    tabIndex={0}
                    onClick={() => setSelectedImage(p.sprites.front_default)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedImage(p.sprites.front_default)}
                  />
                )}
                {p.sprites.back_default && (
                  <img
                    src={p.sprites.back_default}
                    alt="back"
                    className={`sprite-thumb ${selectedImage === p.sprites.back_default ? 'active' : ''}`}
                    tabIndex={0}
                    onClick={() => setSelectedImage(p.sprites.back_default)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedImage(p.sprites.back_default)}
                  />
                )}
                {p.sprites.front_shiny && (
                  <img
                    src={p.sprites.front_shiny}
                    alt="front shiny"
                    className={`sprite-thumb ${selectedImage === p.sprites.front_shiny ? 'active' : ''}`}
                    tabIndex={0}
                    onClick={() => setSelectedImage(p.sprites.front_shiny)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedImage(p.sprites.front_shiny)}
                  />
                )}
              </>
            )}
          </div>
          {(p.latest || p.legacy) && (
            <div className="pd-audio">
              {p.latest && (
                <audio controls>
                  <source src={p.latest} type="audio/ogg" />
                </audio>
              )}
              {p.legacy && (
                <audio controls>
                  <source src={p.legacy} type="audio/ogg" />
                </audio>
              )}
            </div>
          )}
        </aside>

        <main className="pd-main">
          <div className="pd-info">
            <h2>{p.name} (#{p.id})</h2>
            <section className="pd-description">
  <h3>Pokédex</h3>
  <p>{p.description}</p>
</section>
            <div className="pd-types">
              {p.types.map((t) => (
                <span key={t} className={`type type-${t}`}>{t}</span>
              ))}
            </div>

            <div className="pd-basics-grid">
              <div className="basic-item">
                <div className="basic-label">Height</div>
                <div className="basic-value">{p.height}</div>
              </div>
              <div className="basic-item">
                <div className="basic-label">Weight</div>
                <div className="basic-value">{p.weight}</div>
              </div>
              <div className="basic-item">
                <div className="basic-label">Order</div>
                <div className="basic-value">{p.order}</div>
              </div>
              <div className="basic-item">
                <div className="basic-label">Grido</div>
                <div className="basic-value">{p.grido}</div>
              </div>
            </div>

            <section className="pd-abilities" style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h3>Abilities</h3>
              <div className="ability-list">
                {p.abilities.map((a) => (
                  <span key={a} className="ability-chip">{a}</span>
                ))}
              </div>
            </section>

            <section className="pd-stats-list">
              <h3>Stats</h3>
              {p.stats.map((s) => (
                <div key={s.name} className="pd-stat-row">
                  <div className="pd-stat-name">{s.name}</div>
                  <div className="pd-stat-bar">
                    <div className="pd-stat-fill" style={{ width: Math.min(100, (s.value / 255) * 100) + '%' }} />
                  </div>
                  <div className="pd-stat-value">{s.value}</div>
                </div>
              ))}
            </section>

            <section className="pd-moves" style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h3>Moves</h3>
              <div className="pd-move-list">
                {p.moves.map((m) => (
                  <span key={m} className="move-chip">{m}</span>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PokemonDetailPage
