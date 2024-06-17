import React, { useState } from 'react';
import User from './User/User';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AdminPage({
  usersList,
  onSave,
  isDeleteUserPopupOpen,
  setIsDeleteUserPopupOpen,
  closeAllPopups,
  handleDeleteUser,
  handleUpdateUser
}) {
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fio: '',
    date: '',
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    fio: '',
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
    setErrors({
      fio: '',
      login: '',
      password: ''
    });
    setIsNewUserOpen(true);
  };

  const handleSaveNewUser = () => {
    const newErrors = {};
    if (!newUser.fio) newErrors.fio = 'Поле ФИО не может быть пустым';
    if (!newUser.login) newErrors.login = 'Поле Логин не может быть пустым';
    if (!newUser.password) newErrors.password = 'Поле Пароль не может быть пустым';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (usersList.some(user => user.login === newUser.login)) {
      setErrors({ ...newErrors, login: 'Сотрудник с таким логином уже существует!' });
      return;
    }

    onSave(newUser);
    setIsNewUserOpen(false);
    closeAllPopups();
  };

  return (
    <section className='admin'>
      <div className='admin__container'>
        <h3 className='admin__title'>Список сотрудников</h3>
        <ul className='admin__list'>
          {usersList.map((user, index) => (
            <User
              key={index}
              user={user}
              index={index + 1}
              onSave={onSave}
              isDeleteUserPopupOpen={isDeleteUserPopupOpen}
              setIsDeleteUserPopupOpen={setIsDeleteUserPopupOpen}
              closeAllPopups={closeAllPopups}
              handleDeleteUser={handleDeleteUser}
              handleUpdateUser={handleUpdateUser}
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
        {errors.fio && <span className="popup__input-error">{errors.fio}</span>}
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
        {errors.login && <span className="popup__input-error">{errors.login}</span>}
        <input
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="popup__input input"
        />
        {errors.password && <span className="popup__input-error">{errors.password}</span>}
      </PopupWithForm>
    </section>
  );
}
