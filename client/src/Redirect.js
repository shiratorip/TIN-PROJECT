import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
const Redirect = ()=>{
let navigate = useNavigate();
useEffect(()=>{
    navigate(`/gamer-create/`)
},[])

    return(
        <div>loading...</div>
    );
};
export default Redirect;