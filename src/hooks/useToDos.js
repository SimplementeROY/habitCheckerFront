import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { fetchToDos, editToDoService, toggleTodoService, addToDoService, deleteToDoService } from "../services/ToDosServices";

export function useToDos() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const { token } = useAuth()

    const getToDos = async () => {
        try {
            const response = await fetchToDos(token)
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { getToDos() }, [])

    const toggleToDo = async (isCompleted, todoID) => {
        try {
            setTodos(prevTodos => prevTodos.map(todo => todo.id === todoID ? { ...todo, is_completed: isCompleted } : todo))
            toggleTodoService(token, todoID, isCompleted)
        } catch (error) {
            throw new Error('Error al completar la tarea', error)
        }
    }

    const addTodo = async (todo) => {
        try {

            const response = await addToDoService(token, todo);
            const newTodo = await response.json();

            setTodos(prevTodos => [...prevTodos, newTodo])

        } catch (error) {
            throw new Error('Error al crear la tareaa', error)
        }
    }

    const editToDo = async (body, todoID) => {
        try {
            editToDoService(body, todoID, token)
            setTodos(prevTodos => prevTodos.map(todo => todo.id === todoID ? body : todo))
        } catch (error) {
            throw new Error('Error al editar el hábito', error)
        }
    }

    const deleteTodo = async (todoID) => {
        try {

            await deleteToDoService(todoID, token)
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoID))

        } catch (error) {
            throw new Error('Error al eliminar el hábito', error)
        }
    }

    return {
        todos,
        isLoading,
        error,
        toggleToDo,
        editToDo,
        getToDos,
        addTodo,
        deleteTodo
    }
}