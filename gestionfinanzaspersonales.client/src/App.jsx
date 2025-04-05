import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Panel from './Panel.jsx';
import Gestion from './Gestion.jsx';
import Budget from './Budget.jsx';




function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/gestion" element={<Gestion />} />
            <Route path="/budget" element={<Budget />} />
        </Routes>
    );

}
export default App;