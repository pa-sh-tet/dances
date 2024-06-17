import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Login({
  onLogin,
  setIsAdmin,
  mainCodeword
}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [codeword, setCodeword] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  function handleLoginChange(evt) {
    setLogin(evt.target.value);
  }
  
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleСodewordChange(evt) {
    setCodeword(evt.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codeword === mainCodeword) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    if (!(onLogin(login, password))) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }

  return (
    <div className='login'>
      <div className="login__container">
        <Link className='login__logo link' to='/main'></Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className="login__section">
            <h3 className='login__section-title'>E-mail</h3>
            <input
              type="login"
              id='login'
              className='login__section-input'
              placeholder='Введите логин'
              minLength="2"
              maxLength="40"
              value={login}
              onChange={handleLoginChange}
              required
            />
            <span className='login__section-error'>Что-то пошло не так...</span>
          </div>
          <div className="login__section">
            <h3 className='login__section-title'>Пароль</h3>
            <input
              type="password"
              id='password'
              className='login__section-input'
              placeholder='Введите пароль'
              minLength="2"
              maxLength="40"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className='login__section-error'>Что-то пошло не так...</span>
          </div>
          <div className="login__section">
            <h3 className='login__section-title'>Кодовое слово(только для админов)</h3>
            <input
              type="codeword"
              id='codeword'
              className='login__section-input'
              placeholder='Введите кодовое слово'
              minLength="2"
              maxLength="40"
              value={codeword}
              onChange={handleСodewordChange}
            />
            <span className='login__section-error'>Что-то пошло не так...</span>
          </div>
          <button className='login__submit-button'>Войти</button>
          <span className={`login__submit-error ${isCorrect ? '' : 'login__submit-error_active'}`}>Неправильный логин или пароль</span>
        </form>
      </div>
    </div>
  );
}