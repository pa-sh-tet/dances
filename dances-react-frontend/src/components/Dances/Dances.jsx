import React from 'react';
import DanceItem from './DanceItem/DanceItem';
import Menu from './Menu/Menu';

export default function Dances () {

  return (
    <>
      <section className='dances'>
        <Menu />
        <DanceItem />
      </section>
    </>
  )
}