import { useEffect, useState } from 'react'

type Driver = {
  id: string
  name: string
  full_name: string
  abbreviation: string
  nationality_country_id: string
  total_championship_wins: number
  total_race_entries: number
  total_race_wins: number
  total_podiums: number
}

type DriversResponse = {
  data: Driver[]
  page: number
  limit: number
  total: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

const DRIVERS_URL = 'https://racinghub.net/api/v1/drivers?page=1&limit=35&order_by=total_championship_wins&sort_by=desc'

function Drivers() {
  const [data, setData] = useState<DriversResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const opts = {
      signal: controller.signal,
    }

    async function fetchDrivers() {
      try {
        const response = await fetch(DRIVERS_URL, opts)

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`)
        }

        const result: DriversResponse = await response.json()
        setData(result)
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        setError(
          err instanceof Error ? err.message : 'Impossible de charger les pilotes',
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchDrivers()

    return () => controller.abort()
  }, [])

  return (
    <section>
      {loading && <p>Chargement des pilotes...</p>}
      {error && <p>Une erreur est survenue : {error}</p>}
      {data && (
        <div>
          <h1>Voici les pilotes :</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}

export default Drivers