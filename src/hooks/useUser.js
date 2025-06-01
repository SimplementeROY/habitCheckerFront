import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserInfoService } from "../services/UserServices";
import { useEffect } from "react";

export function useUser() {
    const { token } = useAuth()
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUserInfo = async () => {
        try {
            const response = await fetchUserInfoService(token)
            const userData = await response.json()
            setUserInfo(userData);
        } catch (error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return { userInfo, isLoading, error }
}