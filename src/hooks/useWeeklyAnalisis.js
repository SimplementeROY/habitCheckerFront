import { useState } from "react"
import { fetchWeeklyAnalisisService } from "../services/StatsService"
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export function useWeeklyAnalisis() {

    const [weeklyAnalisis, setWeeklyAnalisis] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { token } = useAuth()

    const fetchWeeklyAnalisis = async () => {

        try {
            const response = await fetchWeeklyAnalisisService(token)
            const data = await response.json()
            setWeeklyAnalisis(data)
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWeeklyAnalisis()
    }, [])

    return { weeklyAnalisis, error, isLoading }

}