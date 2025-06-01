import useQuotes from "../../hooks/useQuotes"
import Loader from "../Loader/Loader";
import './quote.css'

export default function Quote() {
    const { error, loading, quote } = useQuotes();

    if (error) {
        return (
            <article className="quote">Ha ocurrido un error</article>
        )
    }
    if (loading) {
        return (
            <article className="quote" style={{ justifyContent: "center", alignItems: "center" }}>
                <Loader />
            </article>
        )
    }
    return (
        <article className="quote">
            <p>{quote.q}</p>
            <small>- {quote.a}</small>
        </article>

    )
}