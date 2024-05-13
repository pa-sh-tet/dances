import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Dances from '../Dances/Dances';
import Main from '../Main/Main';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const isAdmin = useState(false);

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
                  setIsAdmin={setIsAdmin}
                  setIsLoggedIn={setIsLoggedIn} />
                <Main />
              </>}>
            </Route>
            <Route path="/dances" element={
              <>
                <ProtectedRouteElement element={Header}
                  isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRouteElement element={Dances}
                 isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
              </>}>
            </Route>
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dances" : "/main"} replace />} />
          </Routes>
        </div>
      </div>
    </>
  )
}