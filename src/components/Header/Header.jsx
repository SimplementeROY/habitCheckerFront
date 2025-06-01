
import { useAuth } from "../../context/AuthContext"
import './Header.css'
import { Link } from "react-router-dom"

export default function Header({ setIsSideBarOpen }) {

    const { logout } = useAuth()

    const toggleSideBar = () => {
        setIsSideBarOpen(prev => !prev)
    }

    return (
        <header className="header">
            <div className="container">
                <div className="hamburger" onClick={toggleSideBar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h1>Habit Checker</h1>
                {/* <nav>
                    <ul>
                        <li><Link to="/home"><span>Home</span></Link></li>
                        <li><Link to="/statistics"><span>Progression</span></Link></li>
                    </ul>
                </nav> */}
                <button onClick={logout}><i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
        </header >
    )
}

