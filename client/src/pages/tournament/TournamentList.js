import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TournamentList = () => {
    const [tournaments, setTournaments] = useState([]);
    const [thisPage, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(2);
    const [prevPage, setPrevPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = parseInt(searchParams.get('page'));
    
        fetch(`/api/tournamentlist/${page}`)
          .then(response => response.json())
          .then(data => {
            setTournaments(data);
            setPage(page);
            setPrevPage(page > 1 ? page - 1 : 1);
            setNextPage(page + 1);
          });
      }, [location.search]);

      useEffect(() => {
        if (tournaments.length < 5) {
          setNextPage(thisPage);
          if (tournaments.length === 0 && thisPage > 1) {
            navigate(`/tournament/?page=${prevPage}`);
          }
        }
      }, [tournaments, thisPage, prevPage, navigate]);
      
    return (
    <div>
      <div className='centered-div'>
        <button disabled={prevPage === null}>
          <Link to={`/tournament-list/?page=${prevPage}`}>previous</Link>
        </button>
        {thisPage}
        <button>
          <Link to={`/tournament-list/?page=${nextPage}`}>next</Link>
        </button>
      </div>
        <div className="centered-div">
            <h1>Tournament List</h1>
            <ul>
                {tournaments.map(tournament => (
                    <li key={tournament.id}>
                        {tournament.name} - <img src={tournament.banner_url} height={100} width={200} alt={"banner"}></img> <Link to={"/tournament/?id="+tournament.id}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        );
};

export default TournamentList;