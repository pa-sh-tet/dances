import React from 'react';
import Card from './Card/Card';
import image_dance1 from '../../../images/dance1.jpg';
import image_dance2 from '../../../images/dance2.jpg';
import image_dance3 from '../../../images/dance3.jpg';
import image_dance4 from '../../../images/dance4.jpg';
import image_dance5 from '../../../images/dance5.jpg';
import image_dance6 from '../../../images/dance6.jpg';
const link_rickroll = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const danceCards = [
  {
    name: 'Сахар звезд',
    image: image_dance1,
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    name: '«Счастье - это путь»',
    image: image_dance2,
    videoLink: 'https://youtube.com/shorts/5KzG9bk49oI?feature=share'
  },
  {
    name: 'Сабантуй',
    image: image_dance3,
    videoLink: 'https://youtube.com/shorts/4ze-dGSD_NM?feature=share'
  },
  {
    name: 'Digital',
    image: image_dance4,
    videoLink: link_rickroll
  },
  {
    name: 'Татарский танец',
    image: image_dance5,
    videoLink: link_rickroll
  },
  {
    name: 'Светодиоды',
    image: image_dance6,
    videoLink: link_rickroll
  },
];

export default function Portfolio() {
  return (
    <section className='portfolio' id='portfolio'>
      <div className='portfolio__title'>Наши работы</div>
      <div className="portfolio__cardlist">
        {danceCards.map((dance, index) => (
          <Card key={index} name={dance.name} image={dance.image} link={dance.videoLink} />
        ))}
      </div>
    </section>
  )
}
