import { useHabitsStats } from "../../hooks/useHabitsStats";
import HabitStatCard from "../HabitStatCard/HabitStatCard";
import './HabitStats.css'
import Loader from "../Loader/Loader";

export default function HabitsStats() {
    const { stats, error, isLoading } = useHabitsStats()

    if (error) {
        return <div>err</div>
    }
    if (isLoading) {
        return (
            <section className="habits-stats loading">
                <Loader></Loader>
            </section>
        )
    }

    return (
        <section className="habits-stats">
            {stats.length > 0 ?
                stats.map(habit => <HabitStatCard habit={habit} key={`habitStat-${habit.id_habit}`} />) :
                <div>Nada que mostrar</div>
            }
        </section>
    )
}