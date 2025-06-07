import { useEffect, useState } from "react"
import { useForm } from "../../context/FormContext";
import './HabitForm.css'
import { useHabits } from "../../context/HabitsContext";
import { DAYS_OF_WEEK } from "../../variables/daysOfTheWeek";

export default function HabitForm() {
    const { isOpen, closeForm, editHabit } = useForm();
    const { updateHabit, addHabit } = useHabits()

    const [habitData, setHabitData] = useState({ name: '', time: '', days: [] })

    useEffect(() => {
        if (editHabit) {
            setHabitData({
                name: editHabit.name || '',
                time: editHabit.time || '',
                days: editHabit.days || []
            })
        }
    }, [editHabit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editHabit.id) {
            updateHabit(editHabit.id, habitData)
        }
        else {
            addHabit(habitData)
        }

        closeForm()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitData({
            ...habitData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (day) => {

        if (day === "allDays") {
            // Seleccionar o deseleccionar todos los días
            setHabitData((prev) => ({
                ...prev,
                days: prev.days.length === DAYS_OF_WEEK.length ? [] : DAYS_OF_WEEK.map((day) => day.eng),
            }));
        } else {
            // Manejar días individuales
            setHabitData((prev) => ({
                ...prev,
                days: prev.days.includes(day)
                    ? prev.days.filter((d) => d !== day) // Deseleccionar día
                    : [...prev.days, day], // Seleccionar día
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={isOpen ? "habit-form open" : "habit-form closed"}>
                <button className="close-form-button" onClick={closeForm}>X</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name your habit</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={habitData.name}
                            onChange={handleChange}
                            placeholder="Drink 8 glasses of water"
                            required
                        />
                    </div>
                    <div>
                        <p>Frequency</p>
                        <label htmlFor="allDays">
                            <input
                                type="checkbox"
                                name="days"
                                value="allDays"
                                id="allDays"
                                onChange={() => handleCheckboxChange('allDays')}
                            />
                            Everyday
                        </label>
                        {DAYS_OF_WEEK.map((day) => (
                            <label key={day.id}>
                                <input
                                    type="checkbox"
                                    name="days"
                                    value={day.eng}
                                    checked={habitData.days.includes(day.eng)}
                                    onChange={() => handleCheckboxChange(day.eng)}
                                />
                                {day.eng}
                            </label>
                        ))}
                    </div>
                    <button type="submit">{editHabit.id ? 'Actualizar' : 'Crear'} Hábito</button>
                </form>
            </div>
            <div className={isOpen ? "overlay" : "overlay closed"} onClick={closeForm}></div>
        </>

    )
}