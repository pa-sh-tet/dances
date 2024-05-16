import React, { useState, useEffect } from 'react';
import User from './User/User';

export default function AdminPage({
  UsersList,
  onSave,
  isDeleteUserPopupOpen,
  setIsDeleteUserPopupOpen,
  closeAllPopups,
  handleDeleteUser
}) {
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fio: '',
    date: '',
    login: '',
    password: ''
  });

  const handleAddUserClick = () => {
    setIsNewUserOpen(true);
  };

  return (
    <section className='admin'>
      <div className='admin__container'>
        <h3 className='admin__title'>Список сотрудников</h3>
        <ul className='admin__list'>
          {UsersList.map((user, index) => (
            <User
              user={user}
              index={index+1}
              onSave={onSave} 
              isNewUserOpen={isNewUserOpen}
              isDeleteUserPopupOpen={isDeleteUserPopupOpen}
              setIsDeleteUserPopupOpen={setIsDeleteUserPopupOpen}
              closeAllPopups={closeAllPopups}
              handleDeleteUser={() => handleDeleteUser(index)}
              setIsNewUserOpen={setIsNewUserOpen}
            />
          ))}
          {isNewUserOpen && (
            <User
              key={0}
              user={newUser}
              index={0}
              onSave={onSave} 
              isNewUserOpen={true}
              isDeleteUserPopupOpen={isDeleteUserPopupOpen}
              setIsDeleteUserPopupOpen={setIsDeleteUserPopupOpen}
              closeAllPopups={closeAllPopups}
              handleDeleteUser={() => handleDeleteUser(newUser)}
              setIsNewUserOpen={setIsNewUserOpen}
            />
          )}
        </ul>
        <button className='admin__add-button link' onClick={handleAddUserClick}>Добавить сотрудника</button>
      </div>
    </section>
  );
}