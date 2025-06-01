
import { useToDos } from "../../hooks/useToDos"
import ToDo from "../ToDo/ToDo"
import { ToDoForm } from "../ToDoForm/ToDoForm";
import './ToDos.css'
import Loader from "../Loader/Loader";

export default function ToDos() {

    const { todos, isLoading, error, addTodo, ...utils } = useToDos();

    if (isLoading) {
        return (
            <ul style={{ display: 'flex', justifyContent: "center", alignItems: "center", backgroundColor: 'white', padding: '1rem', borderRadius: '1rem' }}>
                <Loader></Loader>
            </ul>
        )
    }

    if (error) {

        return <div>error</div>
    }

    return (
        <article className="tasks">
            <h3>ToDos:</h3>
            <ToDoForm addToDo={addTodo} />
            <ul>
                {todos.map((todo) => {
                    return (
                        <ToDo key={`todo-${todo.id}`} todo={todo} utils={utils}></ToDo>
                    )
                })}
            </ul>
        </article>

    )
}