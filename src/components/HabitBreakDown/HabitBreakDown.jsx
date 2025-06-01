import { useCompletionTrend } from "../../hooks/useCompletionTrend"
import { PieChart, Cell, Pie, ResponsiveContainer } from 'recharts';
import './HabitBreakDown.css'
import Loader from "../Loader/Loader";

export default function HabitBreakdown() {
    const { completionTrend, error, isLoading } = useCompletionTrend()

    if (error) {
        return <div>error</div>
    }

    if (isLoading) {
        return (
            <section className="completion-chart" style={{ justifyContent: "center", alignItems: "center" }}>
                <Loader></Loader>
            </section>
        )

    }

    return (
        <section className="completion-chart">
            <h2>Habit Breakdown</h2>
            <ResponsiveContainer minHeight="320px" maxHeight="50dvh">
                <PieChart>
                    <Pie
                        data={completionTrend}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                        {completionTrend.map((habit) => (
                            <Cell key={`cell-${habit.id}`} fill={habit.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer >
        </section >

    )

}