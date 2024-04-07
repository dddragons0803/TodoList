import React,{useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home } from './home/Home';
import { Login } from './Components/account/Login';
import { Register } from './Components/account/Register';
// import { useDispatch } from 'react-redux';
// import { loginWithToken } from './actions/actions';
import './App.css'

function App() {
  const isAuthenticated = useSelector(state => state.auth.user !== null);
  
  return (
    <div className="app-container main-page">
      <div className='Navbarr'>
        {/* Your navigation component */}
      </div>
      <div className="container pt-4 pb-4">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/account/login" />} />
          <Route path="/account/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/account/register" element={!isAuthenticated ? <Register /> : <Login />} />
          {!isAuthenticated && <Route path="*" element={<Navigate to="/account/login" />} />}
        </Routes>
      </div>
    </div>
  );
}

export default App;
