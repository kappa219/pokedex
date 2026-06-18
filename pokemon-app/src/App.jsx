import { Routes, Route } from 'react-router-dom'
import { PokemonList } from './components/PokemonList'
import PokemonDetailPage from './components/PokemonDetailPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      <Route path="*" element={<h1>ROUTE NOT FOUND</h1>} />
    </Routes>
  )
}

export default App
