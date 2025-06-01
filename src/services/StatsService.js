const API_URL = import.meta.env.VITE_API_URL

export const fetchWeeklyAnalisisService = (token) => {
    return fetch(`${API_URL}/habit-records/weekly-analysis`, {
        headers: {
            "Authorization": token,
        }
    })
}
export const fetchCompletionRateService = (token) => {
    return fetch(`${API_URL}/habit-records/completion-rate`, {
        headers: {
            "Authorization": token,
        }
    })
}
export const fetchTotalCompletionsService = (token) => {
    return fetch(`${API_URL}/habit-records/total-completions`, {
        headers: {
            "Authorization": token,
        }
    })
}
export const fetchCompletionTrendService = (token) => {
    return fetch(`${API_URL}/habit-records/completion-trend`, {
        headers: {
            "Authorization": token,
        }
    })
}