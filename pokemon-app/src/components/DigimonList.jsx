import { useEffect, useState } from 'react'

export default function DigimonList() {
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

  if (loading) return <h2>Loading...</h2>

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px',
        padding: '20px'
      }}
    >
      {digimons.map((digimon) => (
        <div
          key={digimon.id}
          style={{
            background: '#fff',
            padding: '12px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <img
            src={digimon.image || digimon?.images?.[0]?.href}
            alt={digimon.name}
            style={{ width: '120px', height: '120px', objectFit: 'contain' }}
          />

          <h3>{digimon.name}</h3>
          <p>#{digimon.id}</p>

          {/* level opzionale */}
          <p style={{ fontSize: '12px' }}>
            {digimon.levels?.[0]?.level}
          </p>
        </div>
      ))}
    </div>
  )
}