import React, { useState } from 'react';
import './App.css';
import Home from "./components/home";
import Apps from './components/apps';
import AppInfo from './components/appinfo';
import Layout from "./components/layout";
import Login from "./components/login";
import Logout from "./components/logout";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [token, setToken] = useState();

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout token={token} />} >
              <Route index element={<Home />} />
              <Route path="apps" element={<Apps />} />
              <Route path="app/:id" element={<AppInfo />} />
              <Route path="login" element={<Login setToken={setToken} />} />
              <Route path="logout" element={<Logout setToken={setToken} />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Router>
    </div>    
  );
}

export default App;
