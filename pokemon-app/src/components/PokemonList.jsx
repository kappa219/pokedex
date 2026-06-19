import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemonList } from '../store/pokemonSlice'
import { PokemonCard } from './PokemonCard'
import { SearchBar } from './SearchBar'
import './PokemonList.css'
import { useNavigate } from 'react-router-dom'

export function PokemonList() {
  const dispatch = useDispatch()
  const { list, loading, error, searchTerm } = useSelector((state) => state.pokemon)
  const navigate = useNavigate()

  // Filtrare e ordinare i Pokemon in base alla ricerca (prefix match: startsWith)
  const filteredList = useMemo(() => {
    const q = (searchTerm ?? '').toString().toLowerCase().trim()
    if (!q) return [...list].sort((a, b) => a.id - b.id)

    const baseList = list.filter((pokemon) => {
      const name = pokemon.name.toLowerCase()
      if (name.startsWith(q)) return true
      return pokemon.types.some((type) => type.toLowerCase().startsWith(q))
    })

    return baseList.sort((a, b) => a.id - b.id)
  }, [list, searchTerm])

  useEffect(() => {
    dispatch(fetchPokemonList())
  }, [dispatch])

  if (loading) {
    return (
      <>
        <div className="pokedex-header">
          <h1>POKÉDEXX</h1>
          <p>Gotta catch 'em all!</p>
        </div>
        <div className="pokemon-list-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Pokémon...</p>
          </div>
        </div>
        <footer className="pokedex-footer">
          <p>© 2024 Pokédex - Powered by Pokémon API</p>
        </footer>
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className="pokedex-header">
          <p>Gotta catch 'em all!</p>
        </div>
        <div className="pokemon-list-container">
          <div className="error-container">
            <p className="error-message">⚠️ Error: {error}</p>
          </div>
        </div>
        <footer className="pokedex-footer">
          <p>by kevin</p>
        </footer>
      </>
    )
  }

  return (
    <>
      <div className="pokedex-header">
        <h1>POKÉDEXX</h1>
        <p>Gotta catch 'em all! ({list.length} Pokémon)</p>
    
      </div>
      <SearchBar />
       
      <div className="pokemon-list-container">
        {filteredList.length === 0 && !loading ? (
          <div className="no-results">
            <p className="no-results-text">
              Nessun Pokémon trovato per "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="pokemon-grid">
            {filteredList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              />
            ))}
          </div>
        )}
      </div>
      <footer className="pokedex-footer">
        <p>TantaFame Companyin Mannoo</p>
      </footer>
    </>
  )
}
