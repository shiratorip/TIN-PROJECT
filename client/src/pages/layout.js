import {Outlet, Link} from "react-router-dom";

const Layout = () => {
    const linkStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        color: '#ffffff',
        'text-decoration': 'none',
        'border-radius': '8px',
        'background-color': '#3498db',
        transition: 'background-color 0.3s ease'
    }
    return (
        <div>
            <header>
                <h1>Epic Tournaments</h1>
                <nav>
                    <ul>
                        <li className="navli"><Link style={linkStyle} to="/gamer-create">Create Gamer</Link></li>
                        <li className="navli"><Link style={linkStyle} to="/gamer-list/?page=1">Gamer List</Link></li>
                        <li className="navli"><Link style={linkStyle} to="/tournament-create">Create Tournament</Link>
                        </li>
                        <li className="navli"><Link style={linkStyle} to="/tournament-list/?page=1">Tournament
                            List</Link></li>
                        <li className="navli"><Link style={linkStyle} to="/participation-create">Create
                            Participation</Link></li>
                        <li className="navli"><Link style={linkStyle} to="/participation-list/?page=1">Participation
                            List</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </div>
    )
};

export default Layout;

