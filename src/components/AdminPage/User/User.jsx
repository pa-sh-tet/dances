import React, { useState, useEffect } from 'react';

export default function User({
  user,
  index

}) {

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
        <p className='user__fio user__item '>{user.fio}</p>
        <p className='user__date user__item'>{user.date}</p>
        <p className='user__login user__item'>{user.login}</p>
        <p className='user__password user__item'>{user.password}</p>
      </div>
      <div className='user__buttons'>
        <button className='user__edit-button'></button>
        <button className='user__delete-button'></button>
      </div>
    </li>
  );
}