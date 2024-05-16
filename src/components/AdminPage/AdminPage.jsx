import React, { useState, useEffect } from 'react';
import User from './User/User';

export default function AdminPage({
  UsersList
}) {

  return (
    <section className='admin'>
      <div className='admin__container'>
        <h3 className='admin__title'>Список сотрудников</h3>
        <ul className='admin__list'>
          {UsersList.map((user, index) => (
            <User user={user} index={index+1} />
          ))}
        </ul>
      </div>
    </section>
  );
}