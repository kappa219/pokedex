import './PokemonCard.css'

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

function getTypeBackground(types) {
  if (!types || types.length === 0) return undefined
  const t0 = types[0]?.toLowerCase()
  const t1 = types[1]?.toLowerCase()
  const c0 = TYPE_COLORS[t0] || '#eee'
  const c1 = TYPE_COLORS[t1] || null
  if (c1) {
    return `linear-gradient(135deg, ${c0}, ${c1})`
  }
  // single type: subtle two-tone
  return `linear-gradient(135deg, ${c0}20, ${c0})`
}

export function PokemonCard({ pokemon, onClick }) {
  const handleKeyDown = (e) => {
    if (!onClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }
  const bg = getTypeBackground(pokemon.types)

  return (
    <div className="card" role="button" tabIndex={0} onClick={() => onClick && onClick()} onKeyDown={handleKeyDown}>
      <div className="card-image" style={bg ? { background: bg } : undefined}>
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=No+Image'
          }}
        />
      </div>
      <div className="card-content">
        <h2 className="card-name">{pokemon.name}</h2>
        <div className="card-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type type-${type}`}>
              {type}
            </span>
          ))}
        </div>
        <div className="card-stats">
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p><strong>Order:</strong> {pokemon.order}</p>
          <p><strong>Grido:</strong> {pokemon.grido}</p>
          <audio controls>
  <source src={pokemon.latest} type="audio/ogg" />
  Il tuo browser non supporta l'audio.
</audio>
<audio controls>
 <source src={pokemon.legacy} type="audio/ogg" />
  Il tuo browser non supporta l'audio.
</audio>

          <div className="card-actions">
            <button
              className="detail-button"
              onClick={(e) => {
                e.stopPropagation()
                if (onClick) onClick()
              }}
              aria-label={`Dettagli ${pokemon.name}`}
            >
              Dettagli
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
