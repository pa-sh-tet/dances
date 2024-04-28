import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export default function Card({ image, link, name }) {

  return (
    <div className='card'>
      <div className='card__image-container'>
        <img className='card__image' 
        src={image}
        alt='Фото выступления'/>
        <Link to={link} target='_blank' className='card__link'/>
      </div>
      <p className='card__name'>{name}</p>
    </div>
  )
}