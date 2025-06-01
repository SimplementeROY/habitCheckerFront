import { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logUser } from '../../services/UserServices';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function Login() {

    const emailRef = useRef(null);
    const passwdRef = useRef(null)
    const navigate = useNavigate();
    const { login } = useAuth();

    const [failedLogin, setFailedLogin] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: emailRef.current.value,
            password: passwdRef.current.value
        }
        try {
            const response = await logUser(JSON.stringify(data))
            if (!response.ok) {
                throw new Error('Fallo en la autenticación')
            }
            const { token } = await response.json();
            login(token)
            navigate('/home')
        } catch (error) {
            setFailedLogin(true);
            console.error(error);
        }
    }

    return (
        <main className="login">

            <form onSubmit={handleSubmit}>
                <h1>LogIn</h1>
                {failedLogin && <small style={{ color: "red", fontSize: "0.8rem" }}>Incorrect email or password</small>}

                <div>
                    <label htmlFor="email">Email:</label>
                    <input ref={emailRef} type="email" id="email" placeholder="johndoe@gmail.com" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input ref={passwdRef} type="password" id="password" placeholder='Type your password' name="password" />
                </div>
                <input type="submit" value="LOG IN" />
                <div className='sign-up'>
                    <p>Not a member?</p>
                    <Link to="/register" >SIGN UP</Link>
                </div>

            </form>
        </main>
    )
}