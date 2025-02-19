// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginAndRegistration/Login';
import TaskManager from './Taskmanager/TaskManager';
import Register from './LoginAndRegistration/Register'; // Optional: Add a register component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskManager />} />
            </Routes>
        </Router>
    );
};

export default App;
