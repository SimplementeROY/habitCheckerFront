import { useUser } from "../../hooks/useUser";
import './UserCard.css'
import Loader from "../Loader/Loader";

export default function UserCard() {
    const { userInfo, isLoading, error } = useUser()

    if (isLoading) {
        return (
            <article style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Loader />
            </article>
        )
    }

    if (error) {
        return <article>Errro</article>
    }

    return (
        <article>
            <h2>Welcome <strong>{userInfo.nombre}</strong></h2>
        </article>
    )
}