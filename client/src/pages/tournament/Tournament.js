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
        <div className="centered-div">
            <h1>Tournament details: {tournament.name}</h1>
            <div>
                <img src={tournament.banner_url} alt="banner" height={100} width={100}/>
            </div>
            <div>
                <strong>Game:</strong> {tournament.game_name}
            </div>
            <div>
                <strong>starts:</strong> {tournament.start_date}
            </div>
            <div>
                <strong>ends:</strong> {tournament.end_date}
            </div>
            <div>
                <strong>description:</strong> {tournament.description}
            </div>
            <Link to={`/tournament-edit/?id=${tournament.id}`}>
                <button>edit tournament</button>
            </Link>
        </div>
    );
};
export default Tournament;