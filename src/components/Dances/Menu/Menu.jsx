import React from 'react';

export default function Menu({ danceList, selectedDanceIndex, onItemClick }) {
  return (
    <ul className='menu'>
      {danceList.map((dance, index) => (
        <li key={index} className={`menu__item link ${index === selectedDanceIndex && 'menu__item_active'}`}
         onClick={() => onItemClick(index)}>{dance.title}</li>
      ))}
    </ul>
  );
}