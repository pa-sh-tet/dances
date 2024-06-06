import React, { useState } from 'react';
import { api } from '../../../utils/Api';

export default function Contacts() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.sendContact({ name, phone, message });
      if (response.ok) {
        setStatus('Заявка отправлена успешно!');
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setStatus(`Ошибка при отправке заявки: ${response.json.message || response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Ошибка при отправке заявки.');
    }
  };

  return (
    <section className='contacts' id='contacts'>
      <div className="contacts__container">
        <h3 className='contacts__title'>Контакты</h3>
        <p className='contacts__subtitle'>Напишите нам по номеру:</p>
        <p className='contacts__subtitle-number'>+7 (999) 999 99 99</p>
        <p className='contacts__subtitle'>Или оставьте заявку:</p>
        <form className='contacts__form' onSubmit={handleSubmit}>
          <input
            type="text"
            className='contacts__input input-name'
            placeholder='Введите Ваше имя'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            className='contacts__input input-number'
            placeholder='Введите Ваш номер телефона'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            className='contacts__input input-text'
            placeholder='Введите текст Вашей заявки или оставьте "-"'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type='submit' className='contacts__button link'>Отправить</button>
        </form>
        {status && <p className='contacts__status'>{status}</p>}
      </div>
    </section>
  );
}
