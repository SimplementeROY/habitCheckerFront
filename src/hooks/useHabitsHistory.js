import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchHabitsHistoryService } from "../services/HabitsHistoryServices";
import { useState } from "react";

export function useHabitsHistory() {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [habitsHistory, setHabitsHistory] = useState([])

    const fetchHistoryOfHabits = async () => {
        try {
            const response = await fetchHabitsHistoryService(token)
            if (!response.ok) throw new Error('Error al cargar los hábitos');
            const data = await response.json();
            setHabitsHistory(data);
        } catch (err) {
            setError("Parece que ha ocurrido un error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchHistoryOfHabits()
    }, [])

    return { isLoading, error, habitsHistory }
}