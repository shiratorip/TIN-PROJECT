import React, {useState, useEffect} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';

const ParticipationEdit = () => {
    const initialFormData = {
        position: '',
        prize: '',
        tournament_id: '',
        gamer_id: '',
    };
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);
    const [searchParams] = useSearchParams();

    const [gamer, setGamer] = useState({
        nickname: ''
    });
    const [participation, setParticipation] = useState({
        nickname: ''
    });
    const [gamersFound, setGamersFound] = useState({});
    const [selectedGamer, setSelectedGamer] = useState({});


    const [tournament, setTournament] = useState({
        name: ''
    });
    const [tournamentsFound, setTournamentsFound] = useState({});
    const [selectedTournament, setSelectedTournament] = useState({});

    useEffect(() => {
        let id = searchParams.get('id');
        if (id) {
        fetch(`/api/participation/${id}`)
            .then(response => response.json())
            .then(data => {
                setParticipation(data)
            });}
    }, [searchParams]);

    useEffect(() => {
        
        if (participation.id) {
            fetch(`/api/gamer/${participation.Gamer_id}`)
                .then(response => response.json())
                .then(dataGamer => {
                    setGamer(dataGamer)
                    setSelectedGamer(dataGamer)
                    searchGamer()
    
                })
                .catch(error => console.error('Error fetching gamer data:', error));
    
            fetch(`/api/tournament/${participation.Tournament_id}`)
                .then(response => response.json())
                .then(dataTournament => {
                    setTournament(dataTournament)
                    setSelectedTournament(dataTournament)
                    searchTournament()
                })
                .catch(error => console.error('Error fetching tournament data:', error));
        }
    }, [participation]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!searchGamer || !selectedTournament) {
            alert("Select a gamer and a tournament");
            return;
        }
    
        formData.gamer_id = selectedGamer.id;
        formData.tournament_id = selectedTournament.id;
    
        fetch(`/api/participation/${participation.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Participation update successful', data);
            setFormData(initialFormData);
            setSelectedGamer({});
            setSelectedTournament({});
        })
        .catch((error) => {
            console.error('Error during participation creation', error);
        });
    };
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGamerSearch = (e) => {
        const {name, value} = e.target;
        setGamer((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleTournamentSearch = (e) => {
        const {name, value} = e.target;
        setTournament((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const searchGamer = (e) => {
        e.preventDefault();
        fetch(`/api/gamerbn/${gamer.nickname}`
        ).then(
            response => response.json()
        ).then(
            data => setGamersFound(data)
        )
        setGamer({nickname: ''})
    }
    const searchTournament = (e) => {
        e.preventDefault();
        fetch(`/api/tournamentbn/${tournament.name}`
        ).then(
            response => response.json()
        ).then(
            data => setTournamentsFound(data)
        )
        setTournament({name: ''})
    }

    const deleteParticipation =() =>{
        fetch(`/api/participation/${participation.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
                console.log(data);                
            }).then(
                navigate("/participation-list/?page=1")
            )
            
    }


    return (
        <div className="centered-div">
            <h1>Edit Participation with id: {participation.id}</h1>
            <div id="container" style={{display: 'flex'}}>

                <div style={{flex: 1, marginRight: '20px'}}>
                    <h2>search gamer</h2>
                    <input type="text" value={gamer.nickname} name="nickname" onChange={handleGamerSearch}/>
                    <button onClick={searchGamer}>search</button>
                    <div style={{overflowY: 'scroll', height: '300px', border: '1px solid #ccc'}}>
                        <ul>
                            {Array.isArray(gamersFound) && gamersFound.map(gamer => (
                                <li key={gamer.id}>
                                    <button
                                        onClick={() => setSelectedGamer(gamer)}
                                        className={selectedGamer && selectedGamer.id === gamer.id ? 'selectedButton' : ''}
                                    >
                                        <img onError={e => {
                                            e.currentTarget.src = "https://osu.ppy.sh/images/layout/avatar-guest.png"
                                        }} src={gamer.avatar_url} height={50} width={50} alt="Avatar"/> {gamer.nickname}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <h2>search tournament</h2>
                    <input type="text" value={tournament.name} name="name" onChange={handleTournamentSearch}/>
                    <button onClick={searchTournament}>search</button>
                    <div style={{overflowY: 'scroll', height: '300px', border: '1px solid #ccc'}}>
                        <ul>
                            {Array.isArray(tournamentsFound) && tournamentsFound.map(tournament => (
                                <li key={tournament.id}>
                                    <button
                                        onClick={() => setSelectedTournament(tournament)}
                                        className={selectedTournament && selectedTournament.id === tournament.id ? 'selectedButton' : ''}
                                    >
                                        <img onError={e => {
                                            e.currentTarget.src = "https://osu.ppy.sh/images/layout/avatar-guest.png"
                                        }} src={tournament.banner_url} height={50} width={100}
                                             alt="banner"/> {tournament.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Position:<br/>
                    <input type="text" value={participation.position} name="position" onChange={handleChange} required />

                </label>
                <br/>
                <label>
                    Prize:<br/>
                    <input type="text" name="prize" value={participation.prize} onChange={handleChange} required/>
                </label>
                <br/>
            </form>
            <button type="button" onClick={deleteParticipation}>delete</button>
            <button type="submit" onClick={handleSubmit}>update Participation</button>
        </div>
    );
};

export default ParticipationEdit;
