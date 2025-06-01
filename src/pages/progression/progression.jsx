import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import './progression.css'
import { useHabitsHistory } from '../../hooks/useHabitsHistory';
import Loader from '../../components/Loader/Loader';

export default function Progression() {
    const { isLoading, error, habitsHistory } = useHabitsHistory()

    if (isLoading) {
        return (

            <main className="progression" style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <Loader></Loader>
            </main>
        )
    }
    if (error) {
        return <div>Hay un error</div>
    }

    const maxPercentage = habitsHistory.map(history => Number(history.cumulative_percentage))
    const maxPercentageValue = Math.max(...maxPercentage)

    return (
        <main className="progression">
            <h2>Your progress: </h2>
            <section>
                <ResponsiveContainer width="100%" height="100%" minHeight="70dvh" >
                    <LineChart
                        accessibilityLayer
                        data={habitsHistory}
                        margin={{ left: -10 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="completed_date" tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-EN", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }} />
                        <Tooltip />
                        <YAxis domain={[0, maxPercentageValue + 1]} />
                        <Line type="monotone" dataKey="cumulative_percentage" stroke="hsl(345, 100%, 76%)" dot={false} strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </section>

        </main>
    );
}