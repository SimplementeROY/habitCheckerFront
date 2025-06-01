const API_URL = import.meta.env.VITE_API_URL

export function fetchToDos(token) {
    return fetch(`${API_URL}/tasks`, {
        headers: {
            "Authorization": token
        }
    });
}

export async function toggleTodoService(token, todoID, isCompleted) {
    await fetch(`${API_URL}/tasks/completions/${todoID}`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            isCompleted
        })
    })
}

export function addToDoService(token, todo) {
    return fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
}

export async function editToDoService(body, todoID, token) {
    await fetch(`${API_URL}/tasks/${todoID}`, {
        method: "PUT",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export function deleteToDoService(todoID, token) {
    return fetch(`${API_URL}/tasks/${todoID}`, {
        method: "DELETE",
        headers: {
            "Authorization": token,
        }
    })
}


