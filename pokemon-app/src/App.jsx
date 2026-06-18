import { Routes, Route } from 'react-router-dom'
import { PokemonList } from './components/PokemonList'
import PokemonDetailPage from './components/PokemonDetailPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/pokedex" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
    </Routes>
  )
}

export default App
