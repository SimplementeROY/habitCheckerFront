const API_URL = import.meta.env.VITE_API_URL

export function fetchUserInfoService(token) {
    return fetch(`${API_URL}/usuarios`,
        {
            headers: {
                "Authorization": token,
            }
        }
    )
}

export function registerUser(body) {
    return fetch(`${API_URL}/usuarios/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        })
}
export function logUser(body) {
    return fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body
    })
}