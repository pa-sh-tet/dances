import React, { useState } from 'react';
import User from './User/User';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AdminPage({
  UsersList,
  onSave,
  isDeleteUserPopupOpen,
  setIsDeleteUserPopupOpen,
  closeAllPopups,
  handleDeleteUser,
  usersList
}) {
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fio: '',
    date: '',
    login: '',
    password: ''
  });

  const handleAddUserClick = () => {
    setNewUser({
      fio: '',
      date: '',
      login: '',
      password: ''
    });
    setIsNewUserOpen(true);
  };

  const handleSaveNewUser = () => {
    if (!usersList.some(user => user.login === newUser.login)) {
      onSave(newUser);
      setIsNewUserOpen(false);
    } else {
      alert('Логин уже существует!');
    }
  };

  return (
    <section className='admin'>
      <div className='admin__container'>
        <h3 className='admin__title'>Список сотрудников</h3>
        <ul className='admin__list'>
          {UsersList.map((user, index) => (
            <User
              key={index}
              user={user}
              index={index + 1}
              onSave={onSave} 
              isDeleteUserPopupOpen={isDeleteUserPopupOpen}
              setIsDeleteUserPopupOpen={setIsDeleteUserPopupOpen}
              closeAllPopups={closeAllPopups}
              handleDeleteUser={() => handleDeleteUser(index)}
            />
          ))}
        </ul>
        <button className='admin__add-button link' onClick={handleAddUserClick}>Добавить сотрудника</button>
      </div>
      <PopupWithForm
        title="Добавить нового сотрудника"
        name="add-user"
        isOpen={isNewUserOpen}
        buttonText="Сохранить"
        onClose={() => setIsNewUserOpen(false)}
        onSubmit={handleSaveNewUser}
      >
        <input
          type="text"
          placeholder="ФИО"
          value={newUser.fio}
          onChange={(e) => setNewUser({ ...newUser, fio: e.target.value })}
          className="popup__input input"
        />
        <input
          type="date"
          placeholder="Дата рождения"
          value={newUser.date}
          onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
          className="popup__input input"
        />
        <input
          type="text"
          placeholder="Логин"
          value={newUser.login}
          onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
          className="popup__input input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="popup__input input"
        />
      </PopupWithForm>
    </section>
  );
}
