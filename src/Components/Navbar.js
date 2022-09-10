import {useState} from "react"
import "../Assets/Core/Components/Navbar.css"
import {Link} from "react-router-dom";

export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                MacroSoft
            </a>
            <button className="nav-button" onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <Link to="/library/home">Biblioteca</Link>
                    </li>
                    <li>
                        <Link to="/finance/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/finance/records">Registros</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}