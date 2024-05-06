import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Dances from '../Dances/Dances';
import Main from '../Main/Main';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dances", { replace: true });
    } else {
      navigate("/main", { replace: true });
    }
  }, []);

  return (
    <>
      <div className='page'>
        <div className='app'>
          <Routes>
            <Route path="/main" element={
              <>
                <Header isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  setIsLoggedIn={setIsLoggedIn} />
                <Main />
              </>}>
            </Route>
            <Route path="/dances" element={
              <>
                {/* <Header isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin} /> */}
                <ProtectedRouteElement element={Header}
                  isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  setIsLoggedIn={setIsLoggedIn}
                />
                {/* <Dances /> */}
                <ProtectedRouteElement element={Dances} isLoggedIn={isLoggedIn} />
              </>}>
            </Route>
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dances" : "/main"} replace />} />
          </Routes>
        </div>
      </div>
    </>
  )
}