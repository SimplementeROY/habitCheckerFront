import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";
import './HabitForm.css';
import { useHabits } from "../../context/HabitsContext";
import { DAYS_OF_WEEK } from "../../variables/daysOfTheWeek";

export default function HabitForm() {
    const { isOpen, closeForm, editHabit } = useForm();
    const { updateHabit, addHabit } = useHabits();

    const [habitData, setHabitData] = useState({ name: '', time: '', days: [] });
    const [error, setError] = useState('');
    const [touchedName, setTouchedName] = useState(false);

    // Reiniciar formulario al abrir (si es nuevo hábito)
    useEffect(() => {
        if (isOpen && !editHabit) {
            setHabitData({ name: '', time: '', days: [] });
            setError('');
            setTouchedName(false);
        }
    }, [isOpen]);

    // Cargar datos si se está editando
    useEffect(() => {
        if (editHabit) {
            setHabitData({
                name: editHabit.name || '',
                time: editHabit.time || '',
                days: editHabit.days || []
            });
            setError('');
            setTouchedName(false);
        }
    }, [editHabit]);

    const isFormValid = () => {
        return habitData.name.trim() !== '' && habitData.days.length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            if (!habitData.name.trim()) {
                setTouchedName(true);
                setError("Please enter a name for the habit.");
            } else if (habitData.days.length === 0) {
                setError("Please select at least one day.");
            }
            return;
        }

        setError('');
        setTouchedName(false);

        if (editHabit?.id) {
            updateHabit(editHabit.id, habitData);
        } else {
            addHabit(habitData);
        }

        closeForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitData({
            ...habitData,
            [name]: value,
        });
        if (error) setError('');
    };

    const handleBlur = (e) => {
        if (e.target.name === 'name') {
            setTouchedName(true);
            if (!habitData.name.trim()) {
                setError("Please enter a name for the habit.");
            } else {
                setError('');
            }
        }
    };

    const handleCheckboxChange = (day) => {
        setError('');

        if (day === "allDays") {
            setHabitData((prev) => ({
                ...prev,
                days: prev.days.length === DAYS_OF_WEEK.length ? [] : DAYS_OF_WEEK.map((day) => day.eng),
            }));
        } else {
            setHabitData((prev) => ({
                ...prev,
                days: prev.days.includes(day)
                    ? prev.days.filter((d) => d !== day)
                    : [...prev.days, day],
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={isOpen ? "habit-form open" : "habit-form closed"}>
                <button className="close-form-button" onClick={closeForm}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name your habit</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={habitData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Drink 8 glasses of water"
                        />
                        {touchedName && habitData.name.trim() === '' && (
                            <p className="error-message">Please enter a name for the habit.</p>
                        )}
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
                                checked={habitData.days.length === 7}
                            />
                            <span className="checkmark"></span>
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
                                <span className="checkmark"></span>
                                {day.eng}
                            </label>
                        ))}
                    </div>

                    {/* Error general si se intenta enviar sin días */}
                    {!touchedName && error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={!isFormValid()} className={!isFormValid() ? "disabled" : ""}>
                        Confirm
                    </button>
                </form>
            </div>
            <div className={isOpen ? "overlay" : "overlay closed"} onClick={closeForm}></div>
        </>
    );
}
