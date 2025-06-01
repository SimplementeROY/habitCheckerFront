import { useWeeklyAnalisis } from "../../hooks/useWeeklyAnalisis"
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, CartesianGrid } from "recharts"
import './WeeklyAnalysisChart.css'
import Loader from "../Loader/Loader";

export default function WeeklyAnalysisChart() {
    const { weeklyAnalisis, error, isLoading } = useWeeklyAnalisis();

    if (error) {
        return <div>Esto no se ha cargado</div>
    }

    if (isLoading) {
        return <section className="weekly-anaylisis-chart" style={{ justifyContent: "center", alignItems: "center" }}>
            <Loader></Loader>
        </section>
    }

    return (
        <section className="weekly-anaylisis-chart">
            <h2>Weekly Analysis</h2>
            <ResponsiveContainer width="100%" height="100%" maxHeight="45dvh">
                <BarChart data={weeklyAnalisis} margin={{ left: -25 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day_name" tickFormatter={(value) => value.slice(0, 3)} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completion_percentage" fill="hsl(35, 100%, 64%)" radius={6} />
                </BarChart>
            </ResponsiveContainer >
        </section >
    )
}