import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Dances from '../Dances/Dances';
import Main from '../Main/Main';
import Login from '../Login/Login';
import AdminPage from '../AdminPage/AdminPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModifing, setIsModifing] = useState(false);
  const [isDeleteDancePopupOpen, setIsDeleteDancePopupOpen] = useState(false);
  const [isDeleteUserPopupOpen, setIsDeleteUserPopupOpen] = useState(false);
  const [selectedDanceIndex, setSelectedDanceIndex] = useState(0);

  const navigate = useNavigate();

  const [danceList, setDanceList] = useState([
    {
      title: 'Аргентинское танго',
      description: 'Аргентинское танго – это квинтэссенция страсти. Мало найдется танцев, которые так же сближают партнеров, как этот. Уже аргентинское танго покоряет сердца танцоров, которые преданно и навсегда влюбляются в эти движения и эмоции, и зрителей, которым передается волна куража со сцены.',
      links: [
        'https://rutube.ru/video/fc9d57c54ead9b8d6f8a749fca469236/',
        'https://rutube.ru/video/9e8685a715f1aabb796e15e6c32ed8a5/',
      ],
    },
    {
      title: 'Джаз-модерн',
      description: 'Уникальность этого танца состоит в том, что каждый преподаватель имеет собственный взгляд на методику обучения, а ученик может дополнять стиль собственными элементами, создавая свой, ни на что не похожий танец.\n\nУвлечение джаз-модерном прекрасно расширяет творческий потенциал, поскольку человек овладевает сразу множеством элементов из разных стилей и учится их грамотно комбинировать. Этот танец поможет стать королем любого танцпола.\n\n Обязательным условием освоения джаз-модерна является обучение правильному дыханию и грамотному переносу веса тела во время смены элементов.',
      links: [
        'https://rutube.ru/video/fa6d431ece793446bf772aba62168c13/',
      ],
    },
    {
      title: 'Бальные танцы',
      description: 'Парный танец с жесткими хореографическими стандартами. Танцоры полностью привязаны к своему партнеру, которого крайне сложно заменить.',
      links: [
        'https://rutube.ru/video/fd84b9ec4f2deeaac6c06fa95302bf8a/',
        'https://rutube.ru/video/c6f1be1ce8e0ab5b80d520393486dd07/',
      ],
    },
  ]);

  const [usersList, setUserList] = useState([
    {
      fio: 'Иванов Иван Иванович',
      date: '22.02.1914',
      login: 'alex',
      password: '1111'
    },
    {
      fio: 'Ушаков Иван Иванович',
      date: '22.02.2004',
      login: 'fred',
      password: '2222',
    },
    {
      fio: 'Петорв Иван Иванович',
      date: '22.02.1995', 
      login: 'admin',
      password: 'asdasda',
    }
  ]);
  
  const mainCodeword = 'admin';



  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dances", { replace: true });
    } else {
      navigate("/main", { replace: true });
    }
  }, []);

  function handleLogin(login, password) {
    // Проверяем каждый объект в массиве usersList
    for (const user of usersList) {
      // Если логин и пароль совпадают с данными в массиве, устанавливаем isLoggedIn в true
      if (user.login === login && user.password === password) {
        navigate('/dances');
        return true;
      }
    }
    return false;
  };

  const handleSaveDance = (newDance) => {
    setDanceList(prevDanceList => [...prevDanceList, newDance]);
  };

  const handleSaveUser = (newUser) => {
    setUserList(prevUserList => [...prevUserList, newUser]);
  };

  const handleDeleteDance = (index) => {
    const updatedDanceList = [...danceList];
    updatedDanceList.splice(index, 1);
    setDanceList(updatedDanceList);
    setSelectedDanceIndex(0);
  };

  const handleDeleteUser = (index) => {
    const updatedUserList = [...usersList];
    updatedUserList.splice(index, 1);
    setUserList(updatedUserList);
  };

  

  const closeAllPopups = () => {
    setIsDeleteDancePopupOpen(false);
    setIsDeleteUserPopupOpen(false);
  }

  return (
    <>
      <div className='page'>
        <div className='app'>
          <Routes>
            <Route path="/signin"
              element={<Login
                onLogin={handleLogin}
                setIsAdmin={setIsAdmin}
                mainCodeword={mainCodeword}
              />}>
            </Route>
            <Route path="/main" element={
              <>
                <Header isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  isModifing={isModifing}
                  setIsModifing={setIsModifing}
                  setIsLoggedIn={setIsLoggedIn} />
                <Main />
              </>}>
            </Route>
            <Route path="/dances" element={
              <>
                <ProtectedRouteElement element={Header}
                  isAdmin={isAdmin}
                  isLoggedIn={isLoggedIn}
                  isModifing={isModifing}
                  setIsModifing={setIsModifing}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRouteElement element={Dances}
                  handleSave={handleSaveDance}
                  danceList={danceList}
                  handleDeleteDance={handleDeleteDance}
                  isAdmin={isAdmin}
                  isModifing={isModifing}
                  isLoggedIn={isLoggedIn}
                  closeAllPopups={closeAllPopups}
                  isDeleteDancePopupOpen={isDeleteDancePopupOpen}
                  setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
                  selectedDanceIndex={selectedDanceIndex}
                  setSelectedDanceIndex={setSelectedDanceIndex}
                />
              </>}>
            </Route>
            <Route path="/admin" element={
              <>
                <ProtectedRouteElement element={Header}
                  isAdmin={isAdmin}
                  isLoggedIn={isLoggedIn}
                  isModifing={isModifing}
                  setIsModifing={setIsModifing}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRouteElement element={AdminPage}
                  UsersList={usersList}
                  isLoggedIn={isLoggedIn}
                  onSave={handleSaveUser}
                  isDeleteUserPopupOpen={isDeleteUserPopupOpen}
                  setIsDeleteUserPopupOpen={setIsDeleteUserPopupOpen}
                  closeAllPopups={closeAllPopups}
                  handleDeleteUser={handleDeleteUser}
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