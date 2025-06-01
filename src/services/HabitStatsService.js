const API_URL = import.meta.env.VITE_API_URL

export const fetchHabitsStatsService = (token) => {
    return fetch(`${API_URL}/habit-records/stats`, {
        headers: {
            "Authorization": token,
        }
    })
}
