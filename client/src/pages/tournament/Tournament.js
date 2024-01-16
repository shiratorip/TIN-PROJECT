import React, {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom'


const Tournament = () => {
    const [tournament, setTournament] = useState({});
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let id = searchParams.get('id')
        fetch(`/api/tournament/${id}`).then(
            response => response.json()
        ).then(
            data => setTournament(data)
        )
    }, []);

    return (
        <div>
            <h1>Tournament details: <br/>{tournament.name}</h1>
            <div className="centered-div">
                <img className="litourney" src={tournament.banner_url} alt="banner" height={200} width={400}/>
            </div>
            <div className="centered-div">
                <div>
                    <strong>Game:</strong> {tournament.game_name}<br/><br/>
                    <strong>starts:</strong> {tournament.start_date}<br/><br/>
                    <strong>ends:</strong> {tournament.end_date}<br/>
                </div>
            <div className="description">
                    <strong>description:</strong> {tournament.description}<br/>
            </div>
                <Link to={`/tournament-edit/?id=${tournament.id}`}>
                    <button>edit tournament</button>
                </Link>
            </div>
        </div>
    );
};
export default Tournament;