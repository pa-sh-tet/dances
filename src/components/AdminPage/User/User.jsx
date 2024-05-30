import React, { useState, useEffect } from 'react';
import PopupWithForm from '../../PopupWithForm/PopupWithForm';

export default function User({
  user,
  index,
  onSave,
  isDeleteUserPopupOpen,
  setIsDeleteUserPopupOpen,
  closeAllPopups,
  handleDeleteUser
}) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [fio, setFio] = useState('');
  const [date, setDate] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    fio: '',
    // date: '',
    login: '',
    password: ''
  });

  useEffect(() => {
    setFio(user.fio);
    setDate(user.date);
    setLogin(user.login);
    setPassword(user.password);
  }, [user]);

  function handleSaveChanges() {
    const newErrors = {};
    if (!fio) newErrors.fio = 'Поле ФИО не может быть пустым';
    // if (!date) newErrors.date = 'Поле Дата рождения не может быть пустым';
    if (!login) newErrors.login = 'Поле Логин не может быть пустым';
    if (!password) newErrors.password = 'Поле Пароль не может быть пустым';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // const updatedUser = {
      user.fio = fio;
      user.date = date;
      user.login = login;
      user.password = password;
    // };

    // onSave(updatedUser, index); // Сохранение изменений
    setIsEditPopupOpen(false);
  }

  function handleDeleteClick() {
    setIsDeleteUserPopupOpen(index); // Передаем индекс пользователя, которого хотим удалить
  }

  function handleConfirmDelete() {
    handleDeleteUser(index - 1); // Удалить пользователя с правильным индексом
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
        <p className='user__fio user__item'>{user.fio}</p>
        <p className='user__date user__item'>{user.date}</p>
        <p className='user__login user__item'>{user.login}</p>
        <p className='user__password user__item'>{user.password}</p>
      </div>
      <div className='user__buttons'>
        <button className='user__edit-button link' onClick={() => setIsEditPopupOpen(true)}></button>
        <button className='user__delete-button link' onClick={handleDeleteClick}></button>
      </div>
      <PopupWithForm
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSubmit={handleSaveChanges}
        name="edit-user"
        buttonText="Сохранить"
        title="Редактировать профиль"
      >
        <input
          type="text"
          placeholder="ФИО"
          value={fio}
          onChange={(e) => setFio(e.target.value)}
          className="popup__input input"
        />
        {errors.fio && <span className="popup__input-error">{errors.fio}</span>}
        <input
          type="date"
          placeholder="Дата рождения"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="popup__input input"
        />
        {/* {errors.date && <span className="popup__input-error">{errors.date}</span>} */}
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="popup__input input"
        />
        {errors.login && <span className="popup__input-error">{errors.login}</span>}
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="popup__input input"
        />
        {errors.password && <span className="popup__input-error">{errors.password}</span>}
      </PopupWithForm>
      <PopupWithForm
        isOpen={isDeleteUserPopupOpen === index}
        onClose={closeAllPopups}
        onSubmit={handleConfirmDelete}
        name="delete-user"
        buttonText="Да"
        title="Вы уверены, что хотите удалить пользователя?"
      />
    </li>
  );
}
