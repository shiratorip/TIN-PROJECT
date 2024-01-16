import React, {useEffect, useState, useCallback} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom'

const GamerEdit = () => {
    const [searchParams] = useSearchParams()
    const initialFormData = {
        nickname: '',
        password: '',
        description: '',
        platform: '',
        avatar_url: '',
    };
    const [gamer, setGamer] = useState({});
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const updateGamer = useCallback(() => {
            let id = searchParams.get('id')
            fetch(`/api/gamer/${id}`).then(
                response => response.json()
            ).then(
                data =>
                    setGamer(data)
            )
        }
    );
    useEffect(() => {
        updateGamer()
    }, []);

    useEffect(() => {
        setFormData({
            nickname: gamer.nickname,
            password: gamer.password,
            description: gamer.description,
            platform: gamer.platform,
            avatar_url: gamer.avatar_url,
        })
    }, [gamer])

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(initialFormData);
        fetch(`/api/gamer/${gamer.id}`, {
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
        updateGamer();
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const deleteGamer = () => {
        fetch(`/api/participationgamer/${gamer.id}`, {
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
            updateGamer()

        }).then(
            fetch(`/api/gamer/${gamer.id}`, {
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
                updateGamer()

            }).then(
                navigate("/gamer-list/?page=1")
            )
        )
    }

    return (
        <div>
            <h1>Edit Gamer with id:{gamer.id}</h1>

            <div className="centered-div">
                <form onSubmit={handleSubmit}>
                    <label>
                        Nickname:
                        <input className="inputfield" type="text" name="nickname" value={formData.nickname}
                               onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input className="inputfield" type="text" name="password" value={formData.password}
                               onChange={handleChange} required/>
                    </label>
                    <br/>
                    <label>
                        Description:
                        <textarea className="inputfield" name="description" value={formData.description}
                                  onChange={handleChange}
                                  required/>
                    </label>
                    <br/>
                    <label>
                        Platform:
                        <input className="inputfield" type="text" name="platform" value={formData.platform}
                               onChange={handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Avatar URL:
                        <input className="inputfield" type="text" name="avatar_url" value={formData.avatar_url}
                               onChange={handleChange}/>
                    </label>
                    <br/>
                    <button className="button-red" type="button" onClick={deleteGamer}>delete</button>
                    <button className="button-green" type="submit">save</button>
                    <br/>
                    <Link to={`/gamer/?id=${gamer.id}`}>
                        <button type="submit">back to profile</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default GamerEdit;
