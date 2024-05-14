import React, { useState, useEffect } from 'react';
import AddButton from '../../../images/addButton.svg';

export default function Menu({
  isAdmin,
  danceList,
  selectedDanceIndex,
  onItemClick,
  handleAddItemClick,
  isNewItemOpen
}) {

  return (
    <ul className='menu'>
      {isAdmin ? (
        <>
          {danceList.map((dance, index) => (
            <li key={index} className={`menu__item link ${index === selectedDanceIndex && (!isNewItemOpen) && 'menu__item_active'}`}
              onClick={() => onItemClick(index)}>{dance.title}</li>
          ))}
          <li className='menu__item menu__add-item link' onClick={handleAddItemClick}>
            Добавить Танец
            <img className='menu__add-image' src={AddButton} alt="добавить" />
          </li>
        </>
      ) : (
        <>
          {danceList.map((dance, index) => (
            <li key={index} className={`menu__item link ${index === selectedDanceIndex && 'menu__item_active'}`}
            onClick={() => onItemClick(index)}>{dance.title}</li>
          ))}
        </>
      )}
    </ul>
  );
}