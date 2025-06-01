import { useState } from "react"
import { fetchCompletionRateService } from "../services/StatsService"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export function useCompletionRate() {

    const [completionRate, setCompletionRate] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { token } = useAuth()

    const fetchCompletionRate = async () => {

        try {
            const response = await fetchCompletionRateService(token)
            const data = await response.json()

            const formatedData = {
                completion_difference: parseFloat(data.completion_difference).toFixed(2),
                current_week_completion: parseFloat(data.current_week_completion).toFixed(2)
            }

            setCompletionRate(formatedData)
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCompletionRate()
    }, [])

    return { completionRate, error, isLoading }

}