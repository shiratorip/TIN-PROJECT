import React, {useState} from 'react';

const TournamentCreate = () => {
    const initialFormData = {
        name: '',
        start_date: '',
        end_date: '',
        game_name: '',
        banner_url: '',
        description: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(initialFormData);

        fetch('/api/tournament', {
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
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Create Tournament</h1>
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
                    <button type="submit">Create Tournament</button>
                </form>
            </div>
        </div>
    );
};

export default TournamentCreate;
