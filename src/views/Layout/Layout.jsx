import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import './Layout.css';

export default function Layout(){

    return <div className="body">
        <Header />
    <div className="spacer"></div>
        <Outlet />
    <div className="spacer"></div>
    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2025 - AzurePv311 - <Link to="/signup">Privacy</Link>
        </div>
    </footer>
    </div>;
}

function Header(){
    const {user} = useContext(AppContext)
    
    
    return <header>
                <nav className="nav-shadow navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">AzurePv311</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">Auth</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/signup">Signup</Link>
                            </li>
                        </ul>
                        {!user ? <></> : <span className="avatar">{user.name.charAt(0)}</span>}
                    </div>
                </div>
            </nav>
        </header>
}

