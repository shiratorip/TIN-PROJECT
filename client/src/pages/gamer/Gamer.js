import React, {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom'

const Gamer = () => {
    const [gamer, setGamer] = useState({});
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let id = searchParams.get('id')
        fetch(`/api/gamer/${id}`).then(
            response => response.json()
        ).then(
            data => setGamer(data)
        )
    }, [searchParams]);

    return (
        <div>
            <h1>Gamer Profile: {gamer.nickname}</h1>
            <div className="centered-div">
                    <img className="ligamer" onError={e => {
                        e.currentTarget.src = "https://osu.ppy.sh/images/layout/avatar-guest.png"
                    }} src={gamer.avatar_url} alt="Avatar" height={100} width={100}/>
            </div>
            <div className="centered-div">
                <div className="divel">

                        <strong>Nickname:</strong> {gamer.nickname}


                    <div className="divel">
                         <div className="description"><strong>Description:</strong><br/>{gamer.description}</div>
                    </div>
                    <div className="divel">
                        <strong>Platform:</strong> {gamer.platform}
                    </div>
                </div>
            </div>
            <Link to={`/gamer-edit/?id=${gamer.id}`}>
                <button>edit profile</button>
            </Link>
        </div>

    );


};

export default Gamer;
