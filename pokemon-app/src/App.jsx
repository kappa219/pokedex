import { Routes, Route } from 'react-router-dom'
import { PokemonList } from './components/PokemonList'
import PokemonDetailPage from './components/PokemonDetailPage'
import './App.css'
import Navebar from './assets/navebar'
import  DigimonList  from './components/DigimonList'
import DigimonDetail from './components/DigimonDetail'

function App() {
  return (
  <>

  <Navebar />
 


<Routes>
  <Route path="/" element={<PokemonList />} />
  <Route path="/pokemon/:name" element={<PokemonDetailPage />} />

  <Route path="/digimon" element={<DigimonList />} />
  <Route path="/digimon/:id" element={<DigimonDetail />} />

  <Route path="*" element={<h1>ROUTE NOT FOUND</h1>} />
</Routes>





</>



  )
}

export default App
