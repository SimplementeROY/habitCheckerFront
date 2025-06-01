const API_URL = import.meta.env.VITE_API_URL

export async function fetchHabitsOfDate(date, day, token) {
    const response = await fetch(`${API_URL}/habitos?date=${date}&day=${day}`, {
        headers: {
            Authorization: token,
        },
    });

    return response
}

export async function toggleHabit(habitId, date, isCompleted, token) {
    await fetch(`${API_URL}/habit-records/${habitId}`, {
        method: "PUT",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date,
            isCompleted
        })

    });
}

export function addHabitService(token, habitData) {
    return fetch(`${API_URL}/habitos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token,
        },
        body: JSON.stringify(habitData),
    });
}

export function deleteHabitService(token, habitID) {
    fetch(`${API_URL}/habitos/${habitID}`, {
        method: 'DELETE',
        headers: {
            "Authorization": token,
        },
    });
}

export async function updateHabitService(token, updatedData, habitId) {
    await fetch(`${API_URL}/habitos/${habitId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify(updatedData),
    });
}
