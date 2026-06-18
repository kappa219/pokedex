import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemon } from '../store/pokemonSlice'
import './PokemonDetail.css'

export function PokemonDetailPage() {
  const { name } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { single, loading, error } = useSelector((state) => state.pokemon)

  useEffect(() => {
    if (name) dispatch(fetchPokemon(name))
  }, [dispatch, name])

  if (loading) {
    return (
      <div className="pokemon-list-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading Pokémon...</p>
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

  return (
    <div className="pd-page">
      <header className="pokedex-header">
        <button className="back-button" onClick={() => navigate(-1)}>Indietro</button>
        <h1>Dettaglio: {p.name}</h1>
      </header>

      <div className="pd-page-content">
        <aside className="pd-aside">
          <div className="pd-image">
            <img src={p.image} alt={p.name} />
          </div>
          <div className="pd-sprites">
            {p.sprites && (
              <>
                {p.sprites.front_default && <img src={p.sprites.front_default} alt="front" />}
                {p.sprites.back_default && <img src={p.sprites.back_default} alt="back" />}
                {p.sprites.front_shiny && <img src={p.sprites.front_shiny} alt="front shiny" />}
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

            <section className="pd-abilities">
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

            <section className="pd-moves">
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
