import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, clearSearch } from '../store/pokemonSlice'
import './SearchBar.css'

export function SearchBar() {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.pokemon.searchTerm)

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleClear = () => {
    dispatch(clearSearch())
  }

  return (
    <div className="search-container">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Poké Ball"
        className="search-logo"
      />
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Cerca un Pokémon..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="search-clear" onClick={handleClear} aria-label="Cancella ricerca">
            ✕
          </button>
        )}
        <span className="search-icon">🔍</span>
      </div>
    </div>
  )
}
