import './PokemonDetail.css'

export function PokemonDetail({ pokemon, onClose }) {
  if (!pokemon) return null

  return (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pd-close" onClick={onClose} aria-label="Close">×</button>
        <div className="pd-content">
          <div className="pd-image">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          <div className="pd-info">
            <h2>{pokemon.name} (#{pokemon.id})</h2>
            <div className="pd-types">
              {pokemon.types.map((t) => (
                <span key={t} className={`type type-${t}`}>{t}</span>
              ))}
            </div>
            <div className="pd-stats">
              <p><strong>Height:</strong> {pokemon.height}</p>
              <p><strong>Weight:</strong> {pokemon.weight}</p>
              <p><strong>Order:</strong> {pokemon.order}</p>
              <p><strong>Grido:</strong> {pokemon.grido}</p>
              <p><strong>Description:</strong>  <p>{pokemon.description}</p> </p>
            </div>
            { (pokemon.latest || pokemon.legacy) && (
              <div className="pd-audio">
                {pokemon.latest && (
                  <audio controls>
                    <source src={pokemon.latest} type="audio/ogg" />
                    Il tuo browser non supporta l'audio.
                  </audio>
                )}
                {pokemon.legacy && (
                  <audio controls>
                    <source src={pokemon.legacy} type="audio/ogg" />
                    Il tuo browser non supporta l'audio.
                  </audio>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
