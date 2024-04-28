import React from 'react';

export default function Contacts () {

  return (
    <section className='contacts' id='contacts'>
      <div className="contacts__container">
        <h3 className='contacts__title'>Контакты</h3>
        <p className='contacts__subtitle'>Напишите нам по номеру:</p>
        <p className='contacts__subtitle-number'>+7 (999) 999 99 99</p>
        <p className='contacts__subtitle'>Или оставьте заявку:</p>
        <form action="" className='contacts__form'>
          <input type="name"
          className='contacts__input input-name'
          placeholder='Введите Ваше имя'/>
          <input type="tel"
          className='contacts__input input-number'
          placeholder='Введите Ваш номер телефона'/>
          <textarea type="text"
          className='contacts__input input-text'
          placeholder='Введите текст Вашей заявки или оставьте "-"'/>
          <button className='contacts__button'>Отправить</button>
        </form>
      </div>
    </section>
  )
}