import React, {useState} from 'react';

const ParticipationCreate = () => {
    const initialFormData = {
        position: '',
        prize: '',
        tournament_id: '',
        gamer_id: '',

    };
    const [formData, setFormData] = useState(initialFormData);

    const [gamer, setGamer] = useState({
        nickname: ''
    });
    const [gamersFound, setGamersFound] = useState({});
    const [selectedGamer, setSelectedGamer] = useState({});


    const [tournament, setTournament] = useState({
        name: ''
    });
    const [tournamentsFound, setTournamentsFound] = useState({});
    const [selectedTournament, setSelectedTournament] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(initialFormData);
        if (searchGamer && selectedTournament) {
            formData.gamer_id = selectedGamer.id
            formData.tournament_id = selectedTournament.id
            console.log(formData)
            fetch('/api/participation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Registration successful', data);

                })
                .catch((error) => {
                    console.error('Error during registration', error);
                });
        } else alert("select gamer AND tournament")
        setSelectedGamer({})
        setSelectedTournament({})
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
        fetch(`api/gamerbn/${gamer.nickname}`
        ).then(
            response => response.json()
        ).then(
            data => setGamersFound(data)
        )
        setGamer({nickname: ''})
    }
    const searchTournament = (e) => {
        e.preventDefault();
        fetch(`api/tournamentbn/${tournament.name}`
        ).then(
            response => response.json()
        ).then(
            data => setTournamentsFound(data)
        )
        setTournament({name: ''})
    }

    return (
        <div>
        <div className="centered-div">
            <h1>Create Participation</h1>
            <div id="container" style={{display: 'flex'}}>

                <div style={{flex: 1, marginRight: '20px', width:"300px"}}>
                    <h2>search gamer</h2>
                    <input className="inputfield" type="text" value={gamer.nickname} name="nickname" onChange={handleGamerSearch}/>
                    <br/><button onClick={searchGamer}>search</button>
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
                <div style={{flex: 1, width:"300px"}}>
                    <h2>search tournament</h2>
                    <input className="inputfield"  type="text" value={tournament.name} name="name" onChange={handleTournamentSearch}/>
                    <br/><button onClick={searchTournament}>search</button>
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
                    <input className="inputfield"  type="text" name="position" value={formData.position} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Prize:<br/>
                    <input className="inputfield"  type="text" name="prize" value={formData.prize} onChange={handleChange} required/>
                </label>
                <br/>
                <button type="submit">Create Participation</button>
            </form>
        </div>
        </div>
    );
};

export default ParticipationCreate;
