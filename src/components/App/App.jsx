import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Header from '../Header/Header';
import Dances from '../Dances/Dances';
import Main from '../Main/Main';
import Login from '../Login/Login';
import AdminPage from '../AdminPage/AdminPage';
import { api } from '../../utils/Api';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModifing, setIsModifing] = useState(false);
  const [isDeleteDancePopupOpen, setIsDeleteDancePopupOpen] = useState(false);
  const [isDeleteUserPopupOpen, setIsDeleteUserPopupOpen] = useState(false);
  const [selectedDanceIndex, setSelectedDanceIndex] = useState(0);

  const navigate = useNavigate();
  const [danceList, setDanceList] = useState([]);
  const [usersList, setUserList] = useState([]);

  useEffect(() => {
    fetchDances();
    fetchUsers();
  }, []);

  const mainCodeword = 'admin';

  const fetchDances = async () => {
    try {
      const data = await api.getDances();
      setDanceList(data);
    } catch (error) {
      console.error('Error fetching dances:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogin = async (login, password) => {
    try {
      const data = await api.login({ login, password });
      if (data.success) {
        setIsLoggedIn(true);
        navigate('/dances');
        return true;
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    return false;
  };

  const handleSaveDance = async (newDance) => {
    try {
      const data = await api.addDance(newDance);
      setDanceList(prevDanceList => [...prevDanceList, data]);
    } catch (error) {
      console.error('Error adding dance:', error);
    }
  };

  const handleUpdateDance = async (danceId, updatedDance) => {
    try {
      const data = await api.updateDance(danceId, updatedDance);
      setDanceList(prevDanceList => prevDanceList.map(dance => dance._id === danceId ? data : dance));
    } catch (error) {
      console.error('Error updating dance:', error);
    }
  };

  const handleDeleteDance = async (index) => {
    const danceToDelete = danceList[index];
    try {
      await api.deleteDance(danceToDelete._id);
      setDanceList(prevDanceList => prevDanceList.filter((_, i) => i !== index));
      setSelectedDanceIndex(0);
      closeAllPopups();
    } catch (error) {
      console.error('Error deleting dance:', error);
    }
  };

  const handleSaveUser = async (newUser) => {
    try {
      const data = await api.addUser(newUser);
      setUserList(prevUserList => [...prevUserList, data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (userId, updatedUser) => {
    try {
      const data = await api.updateUser(userId, updatedUser);
      setUserList(prevUserList => prevUserList.map(user => user._id === userId ? data : user));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (index) => {
    const userToDelete = usersList[index];
    try {
      await api.deleteUser(userToDelete._id);
      setUserList(prevUserList => prevUserList.filter((_, i) => i !== index));
      closeAllPopups();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeAllPopups = () => {
    setIsDeleteDancePopupOpen(false);
    setIsDeleteUserPopupOpen(false);
  }

  return (
    <div className='page'>
      <div className='app'>
        <Routes>
          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              setIsAdmin={setIsAdmin}
              mainCodeword={mainCodeword}
            />
          } />
          <Route path="/main" element={
            <>
              <Header
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                isModifing={isModifing}
                setIsModifing={setIsModifing}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Main />
            </>
          } />
          <Route path="/dances" element={
            <>
              <ProtectedRouteElement
                element={Header}
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
                isModifing={isModifing}
                setIsModifing={setIsModifing}
                setIsLoggedIn={setIsLoggedIn}
              />
              <ProtectedRouteElement
                element={Dances}
                handleSave={handleSaveDance}
                handleUpdateDance={handleUpdateDance}
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
            </>
          } />
          <Route path="/admin" element={
            <>
              <ProtectedRouteElement
                element={Header}
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
                isModifing={isModifing}
                setIsModifing={setIsModifing}
                setIsLoggedIn={setIsLoggedIn}
              />
              <ProtectedRouteElement
                element={AdminPage}
                usersList={usersList}
                isLoggedIn={isLoggedIn}
                onSave={handleSaveUser}
                handleUpdateUser={handleUpdateUser}
                isDeleteUserPopupOpen={isDeleteUserPopupOpen}
                setIsDeleteUserPopupOpen={setIsDeleteUserPopupOpen}
                closeAllPopups={closeAllPopups}
                handleDeleteUser={handleDeleteUser}
              />
            </>
          } />
          <Route path="*" element={
            <Navigate to={isLoggedIn ? "/dances" : "/main"} replace />
          } />
        </Routes>
      </div>
    </div>
  );
}
