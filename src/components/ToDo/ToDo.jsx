import './ToDo.css'
import { useState, useRef } from 'react';

export default function ToDo({ todo, utils }) {

    const { toggleToDo, editToDo, deleteTodo } = utils
    const menuRef = useRef(null);
    const [newTodo, setNewTodo] = useState(todo);

    const handleChange = (e) => {
        e.preventDefault();
        setNewTodo(prev => ({ ...prev, name: e.target.value }));
    }

    const handleBlur = () => {
        if (newTodo.name.trim() !== todo.name.trim()) {
            editToDo(newTodo, newTodo.id);
        }
    }

    return (
        <li className="todo" ref={menuRef}>
            <div className="left-section">
                <label htmlFor={`todo-${todo.id}`} className="">
                    <input
                        type="checkbox"
                        name={todo.name}
                        id={`todo-${todo.id}`}
                        checked={Boolean(todo.is_completed)}
                        onChange={(e) => {
                            toggleToDo(e.target.checked, todo.id)
                        }
                        } />
                    <span className="checkmark"></span>
                    {/* {todo.name} */}
                </label>
                <input type="text" value={newTodo.name} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div className="actions">
                <button onClick={() => {
                    deleteTodo(todo.id)
                }}><i className="fa-solid fa-trash-can"></i></button>
            </div>
        </li>
    )
}