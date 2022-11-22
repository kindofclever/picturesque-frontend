import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import Login from './components/Login';
import { fetchUserFromLS } from './utils/fetchUserFromLS';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUserFromLS;
    if (!user) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
