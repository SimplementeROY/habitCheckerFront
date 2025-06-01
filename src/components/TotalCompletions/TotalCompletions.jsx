import { useTotalCompletions } from "../../hooks/useTotalCompletions";
import './TotalCompletions.css'
import Loader from "../Loader/Loader";


export default function TotalCompletions() {
    const { totalCompletions, error, isLoading } = useTotalCompletions()
    if (error) {
        return <div>error</div>
    }
    if (isLoading) {
        return <article className="total-completions" style={{ justifyContent: "center", alignItems: "center" }}>
            <Loader></Loader>
        </article>
    }

    const formatedDate = new Date(totalCompletions.user_creation_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <article className="total-completions">
            <h3>Total completions</h3>
            <p>{totalCompletions.total_completions}</p>
            <small>Since: {formatedDate}</small>
        </article>
    )
}