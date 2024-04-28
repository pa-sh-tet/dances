import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import NavTab from './NavTab/NavTab';

export default function Header () {

  return (
    <header className="header">
      <Link to="/" className='header__link'>
        <div className='header__link-logo'></div>
        <p className='header__link-text'>ВХОД ДЛЯ СОТРУДНИКОВ</p>
      </Link>
      <div className='header__nav'>
        <NavTab />
      </div>
    </header>
  )
}