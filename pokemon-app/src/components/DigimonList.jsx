import { useEffect, useState } from 'react'
import './DigimonList.css'
import { useNavigate } from 'react-router-dom'


export default function DigimonList() {
  const navigate = useNavigate()
  const [digimons, setDigimons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDigimons() {
      try {
        const res = await fetch(
          'https://digi-api.com/api/v1/digimon?pageSize=50&page=1&sortBy=id&sortOrder=asc'
        )

        const data = await res.json()
        setDigimons(data.content || [])
      } catch (err) {
        console.error('Errore API:', err)
      } finally {
        setLoading(false)
      }
    }

    loadDigimons()
  }, [])

  if (loading) {
    return (
      <div className="digimon-loading">
        <div className="spinner"></div>
        <p>Loading Digimons...</p>
      </div>
    )
  }

  return (
    <div className="digimon-container">
      {digimons.map((digimon) => (
        <div key={digimon.id} className="digimon-card">
          <div className="digimon-image-wrapper">
            <img
              src={digimon.image || digimon?.images?.[0]?.href}
              alt={digimon.name}
              className="digimon-image"
            />
          </div>

          <h3 className="digimon-name">{digimon.name}</h3>
          <p className="digimon-id">#{digimon.id}</p>

          <p className="digimon-level">
            {digimon.levels?.[0]?.level}
          </p>

          <button
            className="digimon-button"
            onClick={() => {
             // window.location.href = `/pokedex/digimon/${digimon.name}`
              navigate(`/digimon/${digimon.name}`)
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  )
}