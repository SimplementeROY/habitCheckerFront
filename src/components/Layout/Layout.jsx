import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import Header from "../Header/Header";
import { useState } from "react";

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const closeSideBar = () => {
        setIsSideBarOpen(false)
    }

    return (
        <>
            <div className="habitChecker">
                <Header setIsSideBarOpen={setIsSideBarOpen} />
                <aside className={isSideBarOpen ? 'sidebar open' : 'sidebar closed'}>
                    <nav>
                        <ul>
                            <li><Link to="/home" onClick={closeSideBar}><i className="fa-solid fa-house"></i><span>Dashboard</span></Link></li>
                            <li><Link to="/progression" onClick={closeSideBar}><i className="fa-solid fa-chart-line"></i><span>Progression</span></Link></li>
                            <li><Link to="/statistics" onClick={closeSideBar}><i className="fa-solid fa-chart-simple"></i><span>Statistics</span></Link></li>
                        </ul>
                    </nav>
                    <div className="filler">

                    </div>
                </aside>
                <div className={isSideBarOpen ? "overlay" : "overlay closed"} onClick={closeSideBar}></div>
                <main className="content">
                    <Outlet />
                </main>
                <footer><p>Made by Simplemente_ROY</p></footer>
            </div >
        </>
    )
};

export default Layout;