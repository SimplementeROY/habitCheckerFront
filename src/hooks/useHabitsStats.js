import { useEffect } from "react"
import { useState } from "react"
import { fetchHabitsStatsService } from "../services/HabitStatsService"
import { useAuth } from "../context/AuthContext"

export const useHabitsStats = () => {
    const { token } = useAuth()
    const [stats, setStats] = useState({})
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchHabitsStats = async () => {
        try {
            const response = await fetchHabitsStatsService(token)
            const data = await response.json();
            const mappedStats = data.map((stat) => {
                return {
                    id_habit: stat.id_habit,
                    habit_name: stat.habit_name,
                    max_streak: stat.max_streak,
                    streak: stat.current_streak,
                    completion_percentage: stat.completion_percentage
                }
            })
            setStats(mappedStats)
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchHabitsStats()
    }, [])

    return { stats, error, isLoading }

}