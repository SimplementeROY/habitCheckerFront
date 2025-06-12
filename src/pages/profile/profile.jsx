import { useUser } from "../../hooks/useUser";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import { deleteUser } from "../../services/UserServices";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { userInfo, isLoading, error } = useUser();
    const [userData, setUserData] = useState({ fullName: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            setUserData({
                fullName: `${userInfo.nombre ?? ''} ${userInfo.apellido ?? ''}`,
                email: userInfo.mail ?? ''
            });
        }
    }, [userInfo]);

    if (isLoading) {
        return (
            <main>
                <Loader />
            </main>
        );
    }

    if (error || !userInfo) {
        return <main>Error</main>;
    }

    const memberSince = new Date(userInfo.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías agregar lógica para guardar cambios, por ejemplo una función updateUser(userData)
        console.log("Datos actualizados:", userData);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (!confirmed) return;

        try {
            await deleteUser(token);
            navigate('/register');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="profile">
            <div>
                <span>
                    <h2>Personal information</h2>
                    <h4>Update your personal details and profile picture</h4>
                </span>
                <button onClick={() => setIsEditing(prev => !prev)}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            <article>
                <figure>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/266/266134.png"
                        alt={`${userInfo.nombre} photo`}
                    />
                </figure>
                <figcaption>
                    <h3>{userInfo.nombre} {userInfo.apellido}</h3>
                    <p>Member since: {memberSince}</p>
                </figcaption>
            </article>

            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullName">
                        Full name
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </label>
                    <label htmlFor="email">
                        Email Address
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </label>
                    {isEditing && <button type="submit">Save Changes</button>}
                </form>
            </section>

            <section>
                <h2>Danger Zone</h2>
                <h4>Irreversible actions for your account</h4>
                <div>
                    <span>
                        <h4>Delete Account</h4>
                        <p>Permanently delete your account and all associated data</p>
                    </span>
                    <button onClick={handleDelete}>
                        Delete account
                    </button>
                </div>
            </section>
        </main>
    );
}
