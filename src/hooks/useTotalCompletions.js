import { useState } from "react"
import { fetchTotalCompletionsService } from "../services/StatsService"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export function useTotalCompletions() {

    const [totalCompletions, setTotalCompletions] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { token } = useAuth()

    const fetchTotalCompletions = async () => {

        try {
            const response = await fetchTotalCompletionsService(token)
            const data = await response.json()
            // const mappedData = data.map()
            setTotalCompletions(data)
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTotalCompletions()
    }, [])

    return { totalCompletions, error, isLoading }

}