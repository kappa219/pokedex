import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './DigimonDetail.css'

export default function DigimonDetail() {
  const { name } = useParams()
  const navigate = useNavigate()

  const [digimon, setDigimon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDigimon() {
      try {
        setLoading(true)

        const res = await fetch(
          `https://digi-api.com/api/v1/digimon/${name}`
        )

        if (!res.ok) throw new Error('Digimon not found')

        const data = await res.json()
        setDigimon(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDigimon()
  }, [name])

  const englishDescription =
    digimon?.descriptions?.find(
      d => d.language === 'en_us'
    )?.description

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
        <p>Loading Digimon...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="detail-error">
        <p>❌ {error}</p>
        <button onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    )
  }

  if (!digimon) return null

  return (
    <div className="detail-page">

      <button className="back-btn" onClick={() => navigate('/digimon/')}>
        ← Back
      </button>

      {/* 🔥 HEADER */}
      <div className="detail-header">
        <h1>{digimon.name}</h1>
        <span className="digimon-id">#{digimon.id}</span>
      </div>

      {/* 🔥 MAIN SECTION */}
      <div className="detail-main">

        {/* LEFT: IMAGE */}
        <div className="detail-image-box">
          <img
            src={digimon.images?.[0]?.href}
            alt={digimon.name}
          />
        </div>

        {/* RIGHT: INFO */}
        <div className="detail-info-box">

          <div className="info-row">
            <span>Level</span>
            <strong>{digimon.levels?.[0]?.level || 'N/A'}</strong>
          </div>

          <div className="info-row">
            <span>Type</span>
            <strong>{digimon.types?.[0]?.type || 'N/A'}</strong>
          </div>

          <div className="info-row">
            <span>Release</span>
            <strong>{digimon.releaseDate || 'N/A'}</strong>
          </div>

          <div className="info-row">
            <span>Attributes</span>
            <strong>
              {digimon.attributes?.map(a => a.attribute).join(', ') || 'N/A'}
            </strong>
          </div>

        </div>
      </div>

      {/* 🔥 DESCRIPTION */}
      <div className="detail-description">
        <h3>Description</h3>
        <p>
          {englishDescription || "No description available"}
        </p>
      </div>

    </div>
  )
}