import { useState } from "react";
import './ToDoForm.css'

export function ToDoForm({ addToDo }) {
    const [todoData, setTodoData] = useState("");

    const handleChange = (e) => {
        setTodoData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todoData.trim() === "") return; // Evita agregar tareas vacías
        addToDo({ name: todoData });
        setTodoData("");
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={todoData}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>
    );
}
