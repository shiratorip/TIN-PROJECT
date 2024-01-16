import {Outlet, Link} from "react-router-dom";

const Layout = () => {
    const linkStyle = {
        display: 'inline-block',
        padding: '10px 10px',
        color: '#ffffff',
        'text-decoration': 'none',
        'border-radius': '8px',
        'background-color': '#126cd2',
        transition: 'background-color 0.3s ease'
    }
    return (
        <div className="layout-div">

                <h1>Epic Tournaments</h1>
                <nav>
                    <ul>
                        <li className="navli"><Link  to="/gamer-create"><button className="page-button">Create Gamer</button></Link></li>
                        <li className="navli"><Link  to="/gamer-list/?page=1"><button className="page-button">Gamer List</button></Link></li>
                        <li className="navli"><Link  to="/tournament-create"><button className="page-button">Create Tournament</button></Link></li>
                        <li className="navli"><Link  to="/tournament-list/?page=1"><button className="page-button">Tournament List</button></Link></li>
                        <li className="navli"><Link  to="/participation-create"><button className="page-button">Create Participation</button></Link></li>
                        <li className="navli"><Link  to="/participation-list/?page=1"><button className="page-button">Participation List</button></Link></li>
                    </ul>
                </nav>
                <Outlet/>


        </div>
    )
};

export default Layout;

