import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import NavTab from './NavTab/NavTab';

export default function Header ({ isLoggedIn, isModifing, setIsModifing, setIsLoggedIn, isAdmin }) {
  const location = useLocation();

  function goToMain() {
    setIsLoggedIn(false);
  }

  function goToDances() {
    setIsLoggedIn(true);
  }

  function handleModifing() {
    setIsModifing(!isModifing);
  }

  return (
    <header className="header">
      {isLoggedIn ? (
        <>
          <Link className='header__exit link' to='/main' onClick={goToMain}>
            ВЫЙТИ
          </Link>
          {isAdmin ? (
            <>
              {location.pathname === '/admin' ? (
                <Link to='/dances' className='header__admin link'>
                  Танцы
                </Link>
              ) : (
                <Link to='/admin' className='header__admin link'>
                  Сотрудники
                </Link>
              )}
              {location.pathname === '/dances' && (
                <div className='header__container'>
                  <p className="header__type">
                    {isModifing ? "Режим редактирования" : "Режим просмотра"}
                  </p>
                  <Link className='header__switch link' onClick={handleModifing}>
                    {isModifing ? "Перейти в режим просмотра" : "Перейти в режим редактирования"}
                  </Link>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Link to="/signin" className='header__link link' onClick={goToDances}>
            <div className='header__link-logo'></div>
            <p className='header__link-text'>ВХОД ДЛЯ СОТРУДНИКОВ</p>
          </Link>
          <NavTab />
        </>
      )}
    </header>
  )
}