import React, {useState} from 'react';

const GamerCreate = () => {

    const initialFormData = {
        nickname: '',
        password: '',
        description: '',
        platform: '',
        avatar_url: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(initialFormData);

        fetch('/api/gamer', {
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

    return (<div>
            <h1>Create Gamer</h1>
            <div className="centered-div">

                <form onSubmit={handleSubmit}>
                    <label>
                        Nickname:<br/>
                        <input className="inputfield" type="text" name="nickname" value={formData.nickname}
                               onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Password:<br/>
                        <input className="inputfield" type="text" name="password" value={formData.password}
                               onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Description:<br/>
                        <textarea className="inputfield" name="description" value={formData.description}
                                  onChange={handleChange}
                                  required/>
                    </label>
                    <br/>
                    <label>
                        Platform:<br/>
                        <input className="inputfield" type="text" name="platform" value={formData.platform}
                               onChange={handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Avatar URL:<br/>
                        <input className="inputfield" type="text" name="avatar_url" value={formData.avatar_url}
                               onChange={handleChange}/>
                    </label>
                    <br/>
                    <button className="createButton" type="submit">Create Gamer</button>
                </form>
            </div>
        </div>
    );
};

export default GamerCreate;
