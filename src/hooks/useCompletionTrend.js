import { useState, useEffect } from "react"
import { fetchCompletionTrendService } from "../services/StatsService"
import { useAuth } from "../context/AuthContext"

export function useCompletionTrend() {

    const [completionTrend, setCompletionTrend] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { token } = useAuth()

    const fetchCompletionTrend = async () => {
        try {
            const response = await fetchCompletionTrendService(token)
            const data = await response.json()

            const mappedData = data.map(data => {
                return {
                    id: data.id_habit,
                    name: data.habit_name,
                    color: data.color_hex,
                    value: parseFloat(data.porcentaje_completado)
                }
            })

            setCompletionTrend(mappedData)
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCompletionTrend()
    }, [])

    return { completionTrend, error, isLoading }

}