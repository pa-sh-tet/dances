import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Dances from '../Dances/Dances';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteDancePopupOpen, setIsDeleteDancePopupOpen] = useState(false);

  const navigate = useNavigate();

  const [danceList, setDanceList] = useState([
    {
      title: 'Снежинка',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritati',
      links: [
        'https://rutube.ru/video/c6cc4d620b1d4338901770a44b3e82f4/?r=wd',
        'https://rutube.ru/video/54a5eb6ef3f46b667fc8aa799e9c00c3/',
      ],
    },
    {
      title: 'Танец 2',
      description: 'unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritati',
      links: [

      ],
    },
    {
      title: 'Танец 3',
      description: 'unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritat Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit deleniti, reprehenderit natus ipsum repellendus sit amet corrupti quos debitis, ab ullam culpa voluptatum tempora quod vel nulla consectetur, similique voluptatibus',
      links: [
        
      ],    
    },
  ]);
  

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dances", { replace: true });
    } else {
      navigate("/main", { replace: true });
    }
  }, []);

  const handleDeleteDance = (index) => {
    const updatedDanceList = [...danceList];
    updatedDanceList.splice(index, 1);
    setDanceList(updatedDanceList);
  };

  const closeAllPopups = () => {
    setIsDeleteDancePopupOpen(false);
  }

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
                  danceList={danceList}
                  handleDeleteDance={handleDeleteDance}
                  isAdmin={isAdmin}
                  isLoggedIn={isLoggedIn}
                  closeAllPopups={closeAllPopups}
                  isDeleteDancePopupOpen={isDeleteDancePopupOpen}
                  setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
                />
              </>}>
            </Route>
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dances" : "/main"} replace />} />
          </Routes>
        </div>
      </div>
    </>
  )
}