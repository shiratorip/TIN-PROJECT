import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const GamerList = () => {
    const [gamers, setGamers] = useState([]);
    const [thisPage, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(2);
    const [prevPage, setPrevPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = parseInt(searchParams.get('page'));

        fetch(`/api/gamerlist/${page}`)
            .then(response => response.json())
            .then(data => {
                setGamers(data);
                setPage(page);
                setPrevPage(page > 1 ? page - 1 : 1);
                setNextPage(page + 1);
            });
    }, [location.search]);

    useEffect(() => {
        if (gamers.length < 5) {
            setNextPage(thisPage);
            if (gamers.length === 0 && thisPage > 1) {
                navigate(`/gamer-list/?page=${prevPage}`);
            }
        }
    }, [gamers, thisPage, prevPage, navigate]);


    return (
        <div>
            <div className='centered-div'>
                <button disabled={prevPage === null}>
                    <Link to={`/gamer-list/?page=${prevPage}`}>previous</Link>
                </button>
                {thisPage}
                <button>
                    <Link to={`/gamer-list/?page=${nextPage}`}>next</Link>
                </button>
            </div>
            <div className="centered-div">
                <h1>Gamer List</h1>
                <ul>
                    {gamers.map(gamer => (
                        <li key={gamer.id}>
                            <img onError={e => {
                                e.currentTarget.src = "https://osu.ppy.sh/images/layout/avatar-guest.png"
                            }} src={gamer.avatar_url} height={50} width={50} alt="Gamer Avatar"/> {gamer.nickname} <Link
                            to={`/gamer/?id=${gamer.id}`}>Details</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GamerList;