import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DigimonDetail() {
  const { id } = useParams()
  const [digimon, setDigimon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `https://digi-api.com/api/v1/digimon/${id}`
        )

        const data = await res.json()
        setDigimon(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) return <h2>Loading...</h2>
  if (!digimon) return <h2>Not found</h2>

  const englishDesc = digimon.descriptions?.find(
    (d) => d.language === 'en_us'
  )?.description

  return (
    <div style={{ padding: 20 }}>
      <h1>{digimon.name}</h1>

      <img
        src={digimon.images?.[0]?.href}
        alt={digimon.name}
        width="400"
      />

      <p><b>Level:</b> {digimon.levels?.[0]?.level}</p>
      <p><b>Type:</b> {digimon.types?.[0]?.type}</p>

      <p style={{ marginTop: 20 }}>
        {englishDesc}
      </p>
    </div>
  )
}