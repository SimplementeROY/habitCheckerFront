import './HabitStatCard.css'

const icons = [
    `<i class="fa-regular fa-star"></i>`,
]

export default function HabitStatCard({ habit, isLoading }) {

    return (
        <article className="habit-stat-card">
            <h3 className="habit-name">{habit.habit_name}</h3>
            <div>
                <div className="streak">
                    <p className="streak">{habit.streak} days</p>
                    <small>Current streak</small>
                </div>
                <div className="max-streak">
                    <p>{habit.max_streak} days</p>
                    <small>Max streak</small>
                </div>

            </div>
            <div>
                <p>Completion rate:</p>
                <p>{habit.completion_percentage}%</p>
            </div>
            {/* <ProgressBar percentage={habit.completion_percentage} /> */}
        </article>

    )
}