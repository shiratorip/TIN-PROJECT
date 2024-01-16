import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./pages/layout.js"
import Redirect from './Redirect.js';

import GamerCreate from "./pages/gamer/GamerCreate.js"
import Gamer from "./pages/gamer/Gamer.js"
import GamerList from "./pages/gamer/GamerList.js"
import GamerEdit from "./pages/gamer/GamerEdit.js"

import TournamentCreate from "./pages/tournament/TournamentCreate";
import Tournament from "./pages/tournament/Tournament.js"
import TournamentList from "./pages/tournament/TournamentList.js"
import TournamentEdit from './pages/tournament/TournamentEdit.js'

import ParticipationEdit from "./pages/participation/ParticipationEdit.js"
import ParticipationCreate from "./pages/participation/ParticipationCreate.js"
import ParticipationList from "./pages/participation/ParticipationList.js"


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Redirect/>}/>
                    <Route path="/gamer-list" element={<GamerList/>}/>
                    <Route path="/gamer/" element={<Gamer/>}/>
                    <Route path="/gamer-edit/" element={<GamerEdit/>}/>
                    <Route path="/gamer-create/" element={<GamerCreate/>}/>
                    <Route path="/tournament-list" element={<TournamentList/>}/>
                    <Route path="/tournament-edit" element={<TournamentEdit/>}/>
                    <Route path="/tournament-create" element={<TournamentCreate/>}/>
                    <Route path="/tournament/" element={<Tournament/>}/>
                    <Route path="/participation-list" element={<ParticipationList/>}/>
                    <Route path="/participation-create" element={<ParticipationCreate/>}/>
                    <Route path="/participation-edit/" element={<ParticipationEdit/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);