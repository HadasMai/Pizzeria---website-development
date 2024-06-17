
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import InfoClient from './components/InfoClient';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound';
import NewOrder from './components/NewOrder';
import Cart from './components/Cart';
import OldOrder from "./components/OldOrder";


function App() {
    return (
        <Router>
            <div className="bg-light-yellow min-vh-100 d-flex flex-column">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/newOrder" element={<NewOrder />} />
                    <Route path="/oldOrder" element={<OldOrder />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/infoClient" element={<InfoClient />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;