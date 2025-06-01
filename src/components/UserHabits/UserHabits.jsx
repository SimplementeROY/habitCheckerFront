import UserHabit from '../UserHabit/UserHabit';
import { useHabits } from '../../context/HabitsContext';
import './UserHabits.css'
import { useDate } from '../../context/DateContext';
import Loader from '../Loader/Loader';

export default function UserHabits() {

    const { habits, loading, error } = useHabits();
    const { date } = useDate();
    if (loading) {
        return (

            <ul className="habits-list" style={{ justifyContent: "center", alignItems: "center" }}>
                <Loader></Loader>
            </ul>
        )
    }


    if (error) {
        return <div>{error}</div>;
    }

    if (!habits) {
        return
    }

    return (
        <ul className='habits-list'>
            {habits.length > 0 ? (
                habits.map((habit) => <UserHabit habit={habit} key={habit.id} date={date} />)
            ) : (
                <li>Nada que mostrar</li>
            )}
        </ul>
    );
}
