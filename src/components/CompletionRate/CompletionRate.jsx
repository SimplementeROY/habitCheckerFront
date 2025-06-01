import { useCompletionRate } from "../../hooks/useCompletionRate";
import './CompletionRate.css'
import Loader from "../Loader/Loader";

export default function CompletionRate() {
    const { completionRate, error, isLoading } = useCompletionRate()
    if (error) {
        return <div>error</div>
    }
    if (isLoading) {

        return (
            <article className="completion-rate-card" style={{ justifyContent: "center", alignItems: "center" }}>
                <Loader />
            </article>
        )
    }

    return (
        <article className="completion-rate-card">
            <h3>Completion Rate</h3>
            <p>{completionRate.current_week_completion}%</p>
            <small>{completionRate.completion_difference > 0 ? `+${completionRate.completion_difference}` : completionRate.completion_difference}% from last week</small>
        </article>
    )
}