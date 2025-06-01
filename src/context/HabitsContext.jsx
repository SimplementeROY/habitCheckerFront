import { createContext, useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDate } from './DateContext';
import { useEffect } from 'react';

import { toggleHabit, fetchHabitsOfDate, addHabitService, updateHabitService, deleteHabitService } from '../services/HabitServices';
const HabitsContext = createContext();

export function HabitsProvider({ children }) {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const { date, day } = useDate();

    const renderHabits = async (date, day) => {
        setLoading(true);
        try {
            const response = await fetchHabitsOfDate(date, day, token)
            const data = await response.json();
            setHabits(data);
        } catch (err) {

            setError("Parece que ha ocurrido un error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { renderHabits(date, day) }, [date, day])

    const toggleHabitCompletion = (habitId, isCompleted) => {
        try {
            setHabits(prevHabits => prevHabits.map(habit => {
                return (habit.id === habitId ? { ...habit, is_completed: isCompleted } : habit)
            }))

            toggleHabit(habitId, date, isCompleted, token)

        } catch (error) {
            console.error('Error al actualizar el hábito:', error);
        }
    };

    const addHabit = async (habitData) => {
        try {
            const response = await addHabitService(token, habitData)
            const newHabit = await response.json();
            setHabits((prev) => [...prev, newHabit]);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteHabit = async (habitId) => {
        try {
            setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
            deleteHabitService(token, habitId)
        } catch (err) {
            console.error(err.message);
        }
    };

    const updateHabit = async (habitId, updatedData) => {

        try {

            setHabits((prev) => {
                return prev.map((habit) => (habit.id === habitId ? { ...habit, ...updatedData } : habit))
            });

            await updateHabitService(token, updatedData, habitId)

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <HabitsContext.Provider
            value={{
                habits,
                loading,
                error,
                addHabit,
                deleteHabit,
                updateHabit,
                toggleHabitCompletion,
            }}
        >
            {children}
        </HabitsContext.Provider>
    );
}

export function useHabits() {
    return useContext(HabitsContext);
}
