const API_URL = import.meta.env.VITE_API_URL


export const fetchHabitsHistoryService = (token) => {
    return fetch(`${API_URL}/habit-records`, {
        headers: {
            "Authorization": token,
        }
    });
}

