import { useDate } from "../../context/DateContext";
import { useForm } from "../../context/FormContext";
import DayFilter from "../DayFilter/DayFilter";
import UserHabits from "../UserHabits/UserHabits"
import './habitManager.css'

export default function HabitManager() {
    const { openForm } = useForm();
    const { setDate } = useDate();
    return (
        <>
            <article className='habit-management'>
                <div>
                    <h3>Your Habits:</h3>
                    <button onClick={() => setDate(new Date().toISOString().split('T')[0])}>Today</button>
                </div>
                <DayFilter />
                <UserHabits />
                <button className='add-habit-button' onClick={openForm}><span>+</span> <span>Add habit</span></button>
            </article >

        </>

    )
}