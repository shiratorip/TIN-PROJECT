import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const ParticipationList = () => {
    const [participations, setParticipation] = useState([]);
    const [thisPage, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(2);
    const [prevPage, setPrevPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = parseInt(searchParams.get('page'));


        fetch(`/api/participationlist/${page}`)
            .then(response => response.json())
            .then(data => {
                setParticipation(data);
                console.log(data)
                setPage(page);
                setPrevPage(page > 1 ? page - 1 : 1);
                setNextPage(page + 1);
            });
    }, [location.search]);

    useEffect(() => {
        if (participations.length < 5) {
            setNextPage(thisPage);
            if (participations.length === 0 && thisPage > 1) {
                navigate(`/participation-list/?page=${prevPage}`);
            }
        }
    }, [participations, thisPage, prevPage, navigate]);

    useEffect(() => {

    })

    return (
        <div>
            <div className='centered-div-buttons'>
                <Link to={`/participation-list/?page=${prevPage}`}>
                    <button disabled={prevPage === null} className="page-button">previous</button>
                </Link> {thisPage}<Link to={`/participation-list/?page=${nextPage}`}>
                    <button className="page-button">next</button>
                </Link>
            </div>
            <h1>Participation List</h1>
            <div className="centered-div-part">

                {participations.map(participation => (
                    <div className="liparticipation" key={participation.id}>
                        <div className="ligamer">
                            <img onError={e => {
                                e.currentTarget.src = "https://osu.ppy.sh/images/layout/avatar-guest.png"
                            }} src={participation.avatar_url} height={50} width={50} alt="Avatar"/>
                            <Link to={`/gamer/?id=${participation.Gamer_id}`}>{participation.nickname}</Link>
                        </div>

                        <Link to={`/tournament/?id=${participation.Tournament_id}`}>{participation.name}</Link><br/>
                        place:{participation.position} prize:{participation.prize}
                        <div className="justdiv">
                            <Link to={`/participation-edit/?id=${participation.id}`}><br/>

                                <button>edit</button>
                            </Link>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default ParticipationList;