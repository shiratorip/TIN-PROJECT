import React, {useState, useEffect, useCallback} from 'react';
import {useSearchParams, useNavigate, Link} from 'react-router-dom';

const TournamentEdit = () => {
    const [searchParams] = useSearchParams()
    const initialFormData = {
        name: '',
        start_date: '',
        end_date: '',
        game_name: '',
        banner_url: '',
        description: '',
    };
    const [tournament, setTournament] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const updateTournament = useCallback(() => {
            let id = searchParams.get('id')
            fetch(`/api/tournament/${id}`).then(
                response => response.json()
            ).then(
                data =>
                    setTournament(data)
            )
        }
    );
    useEffect(() => {
        updateTournament()
    }, []);

    useEffect(() => {
        setFormData({
            name: tournament.name,
            start_date: tournament.start_date,
            end_date: tournament.end_date,
            game_name: tournament.game_name,
            banner_url: tournament.banner_url,
            description: tournament.description,
        })
    }, [tournament])

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(initialFormData);
        fetch(`/api/tournament/${tournament.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Update successful', data);

            })
            .catch((error) => {
                console.error('Error during Update', error);
            });
        updateTournament();
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const deleteTournament = () => {
        fetch(`/api/participationtournament/${tournament.id}`, {
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
            updateTournament()

        }).then(
            fetch(`/api/tournament/${tournament.id}`, {
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
                updateTournament()

            }).then(
                navigate("/tournament-list/?page=1")
            )
        )
    }

    return (
        <div>

            <h1>Edit Tournament with id:{tournament.id}</h1>
            <div className="centered-div">
                <form onSubmit={handleSubmit}>
                    <label>
                        Tournament Name:
                        <input className="inputfield" type="text" name="name" value={formData.name} onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Start Date:
                        <input className="inputfield" type="date" name="start_date" value={formData.start_date} onChange={handleChange}
                               required/>
                    </label>
                    <br/>
                    <label>
                        End Date:
                        <input className="inputfield" type="date" name="end_date" value={formData.end_date} onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Game Name:
                        <input className="inputfield" type="text" name="game_name" value={formData.game_name} onChange={handleChange}
                               required/>
                    </label>
                    <br/>
                    <label>
                        Banner URL:
                        <input className="inputfield" type="text" name="banner_url" value={formData.banner_url} onChange={handleChange}
                               required/>
                    </label>
                    <br/>
                    <label>
                        Description:
                        <textarea className="inputfield" name="description" value={formData.description} onChange={handleChange} required/>
                    </label>
                    <br/>
                    <button className="button-red" type="button" onClick={deleteTournament}>delete</button><button className="button-green" type="submit">save</button><br/><br/>
                    <Link to={`/tournament/?id=${tournament.id}`}>
                        <button type="submit">back to profile</button>
                    </Link>                </form>
                           </div>
        </div>
    );
};

export default TournamentEdit;
