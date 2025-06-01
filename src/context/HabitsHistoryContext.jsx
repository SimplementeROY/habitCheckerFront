import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthContext";
import { fetchHabitsHistoryService } from "../services/HabitsHistoryServices";

const HabitsHistoryContext = createContext()

export function HabitsHistoryProvider({ children }) {
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

    const updateHistory = (completed_date, is_completed) => {
        setHabitsHistory(prevHistory => {
            const last30Index = Math.max(prevHistory.length - 30, 0);
            return prevHistory.map((history, index) => {
                if (index < last30Index || history.completed_date !== completed_date) {
                    return history;
                }
                const totalHabits = Number(history.total_habits);
                const completionRate = Number(history.completion_rate);
                const adjustment = Math.floor(100 / totalHabits);
                const newCompletion = is_completed
                    ? completionRate + adjustment
                    : completionRate - adjustment;
                return { ...history, completion_rate: newCompletion.toString() };
            });
        });
    };

    useEffect(() => {
        if (token) {
            fetchHistoryOfHabits()
        }
    }, [token])

    return (
        <HabitsHistoryContext.Provider
            value={{ isLoading, error, habitsHistory, updateHistory }}>
            {children}
        </HabitsHistoryContext.Provider>

    )

}

export function useHabitsHistory() {
    return useContext(HabitsHistoryContext)
}