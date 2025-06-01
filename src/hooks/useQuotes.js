import { useEffect, useState } from "react";
import { fetchQuote } from "../services/QuotesService";

export default function useQuotes() {
    const [quote, setQuote] = useState("");
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getQuote = async () => {
        try {
            const response = await fetchQuote();
            const data = await response.json(); // Asegúrate de que la respuesta es JSON

            setQuote(data); // Guarda los datos obtenidos
        } catch (err) {
            setError(err.message || "Error fetching quotes");
        } finally {
            setIsLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        getQuote();
    }, []);

    return { quote, loading, error };
}
