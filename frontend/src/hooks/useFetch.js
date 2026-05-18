import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

function useFetch(url, options = {}) {
  const { immediate = true } = options

  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error,   setError]   = useState(null)

  const fetch = useCallback(async (overrideUrl) => {
    const target = overrideUrl || url
    if (!target) return
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(target)
      setData(res.data)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
      return null
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (immediate && url) fetch()
  }, [url, immediate])

  return { data, loading, error, refetch: fetch }
}

export default useFetch