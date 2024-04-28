import React from 'react';
import Card from './Card/Card';
import image_title from '../../images/title1.jpg';
const link_rickroll = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const card_name = 'Название';

export default function Portfolio() {
  return (
    <section className='portfolio' id='portfolio'>
      <div className='portfolio__title'>Наши работы</div>
      <div className="portfolio__cardlist">
        <Card name={card_name}
        image={image_title}
        link={link_rickroll}/>
        <Card name="Название"
        image={image_title}
        link={link_rickroll}/>
        <Card name="Название"
        image={image_title}
        link={link_rickroll}/>
        <Card name="Название"
        image={image_title}
        link={link_rickroll}/>
        <Card name="Название"
        image={image_title}
        link={link_rickroll}/>
        <Card name="Название"
        image={image_title}
        link={link_rickroll}/>
      </div>
    </section>
  )
}