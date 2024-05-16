import React, { useState, useEffect } from 'react';
import PopupWithForm from '../../PopupWithForm/PopupWithForm';

export default function User({
  user,
  index,
  onSave,
  isNewUserOpen,
  isDeleteUserPopupOpen,
  setIsDeleteUserPopupOpen,
  closeAllPopups,
  handleDeleteUser,
  setIsNewUserOpen
}) {
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [fio, setFio] = useState('');
  const [date, setDate] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userToDelete, setUserToDelete] = useState(null); // добавим состояние для удаления

  useEffect(() => {
    setFio(user.fio);
    setDate(user.date);
    setLogin(user.login);
    setPassword(user.password);
  }, [user, isNewUserOpen]);

  function saveChanges() {
    setIsUserEditing(false);
    if (isNewUserOpen) {
      const newUser = {
        fio: fio,
        date: date,
        login: login,
        password: password
      };
      setIsNewUserOpen(false);
      onSave(newUser);
    } else {
      user.fio = fio;
      user.date = date;
      user.login = login;
      user.password = password;
    }
  }

  function setEditing() {
    setIsUserEditing(true);
  }

  function handleDeleteClick() {
    setUserToDelete(index); // установить индекс для удаления
    setIsDeleteUserPopupOpen(true);
  }

  function handleConfirmDelete() {
    handleDeleteUser(userToDelete); // удалить пользователя с правильным индексом
    setUserToDelete(null); // сбросить индекс после удаления
    closeAllPopups();
  }

  return (
    <li className='user'>
      <p className='user__index'>{index}</p>
      <div className='user__types'>
        <p className="user__type">ФИО:</p>
        <p className="user__type">Д.р.: </p>
        <p className="user__type">Логин: </p>
        <p className="user__type">Пароль: </p>
      </div>
      <div className='user__container'>
      {isUserEditing ? (
        <>
          <input
            className='user__item-input input'
            value={fio}
            onChange={(e) => setFio(e.target.value)}
          />
          <input
            className='user__item-input input'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className='user__item-input input'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className='user__item-input input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      ) : (
        <>
          <p className='user__fio user__item '>{user.fio}</p>
          <p className='user__date user__item'>{user.date}</p>
          <p className='user__login user__item'>{user.login}</p>
          <p className='user__password user__item'>{user.password}</p>
        </>
      )}
      </div>
      <div className='user__buttons'>
        {isUserEditing ? (
          <button className='user__edit-button user__edit-button_active link'
           onClick={saveChanges}
          //  disabled={isEmpty}
           ></button>
        ) : (
          <button className='user__edit-button link' onClick={setEditing}></button>
        )}
        <button className='user__delete-button link' onClick={handleDeleteClick}></button>
      </div>
      <PopupWithForm
        isOpen={isDeleteUserPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleConfirmDelete} // изменено
        name="delete"
        buttonText="Да"
        title="Вы уверены, что хотите удалить этого сотрудника?"
        setIsDeletePopupOpen={setIsDeleteUserPopupOpen}
      />
    </li>
  );
}
