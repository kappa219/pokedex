import './PokemonCard.css'

export function PokemonCard({ pokemon, onClick }) {
  const handleKeyDown = (e) => {
    if (!onClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div className="card" role="button" tabIndex={0} onClick={() => onClick && onClick()} onKeyDown={handleKeyDown}>
      <div className="card-image">
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
