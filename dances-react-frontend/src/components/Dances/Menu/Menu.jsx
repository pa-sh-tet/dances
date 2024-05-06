import React from 'react';

export default function Menu () {
  // const [isActiveDance, setIsActiveDance] = useState(false);

  // function setActiveDance() {
  //   setIsActiveDance(true);
  // }

  return (
    <ul className='menu'>
      <li className='menu__item link menu__item_active'>Название</li>
      <li className='menu__item link'>Название</li>
      <li className='menu__item link'>Название</li>
    </ul>
  )
}