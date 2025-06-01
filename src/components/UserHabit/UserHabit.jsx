import { useForm } from "../../context/FormContext";
import './UserHabit.css'
import { useHabits } from "../../context/HabitsContext";
import { useHabitsHistory } from "../../context/HabitsHistoryContext";
import { useRef, useState, useEffect } from "react";

export default function UserHabit({ habit, date }) {
    const { openForm } = useForm()
    const { deleteHabit, toggleHabitCompletion } = useHabits();
    const { updateHistory } = useHabitsHistory();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = () => {
        deleteHabit(habit.id);
    };

    const handleEdit = () => {
        openForm(habit)
    };


    return (
        <li ref={menuRef} className="habit-item">
            <div className="left-section">
                <label htmlFor={`habit-${habit.id}`} style={habit.is_completed ? { textDecoration: "line-through", transition: "0.2ms" } : {}}>
                    <input
                        type="checkbox"
                        name={habit.name}
                        id={`habit-${habit.id}`}
                        checked={Boolean(habit.is_completed)}
                        onChange={(e) => {
                            updateHistory(date, e.target.checked)
                            toggleHabitCompletion(habit.id, e.target.checked)
                        }

                        } />
                    <span className="checkmark"></span>
                    {habit.name}
                </label>
            </div>



            <button onClick={() => setIsOpen(prev => !prev)}><i className="fa-solid fa-ellipsis-vertical"></i></button>
            {
                <div className={`actions ${isOpen ? 'show' : ''}`}>
                    <button onClick={handleEdit} style={{ color: "hsl(210, 100%, 75%)" }}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                    <button onClick={handleDelete} style={{ color: "hsl(345, 100%, 76%)" }}><i className="fa-solid fa-trash-can"></i> Delete</button>
                </div>
            }

        </li>
    )
}