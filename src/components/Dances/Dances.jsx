import React, { useState } from 'react';
import DanceItem from './DanceItem/DanceItem';
import Menu from './Menu/Menu';

export default function Dances({
  isAdmin,
  handleDeleteDance,
  danceList,
  closeAllPopups,
  setIsDeleteDancePopupOpen,
  isDeleteDancePopupOpen
}) {

  const [selectedDanceIndex, setSelectedDanceIndex] = useState(0);

  const handleDanceItemClick = (index) => {
    setSelectedDanceIndex(index);
  };

  return (
    <section className='dances'>
      <Menu
        isAdmin={isAdmin}
        danceList={danceList}
        selectedDanceIndex={selectedDanceIndex}
        onItemClick={handleDanceItemClick}
      />
      <DanceItem
        isAdmin={isAdmin}
        dance={danceList[selectedDanceIndex]}
        handleDeleteDance={handleDeleteDance}
        isDeleteDancePopupOpen={isDeleteDancePopupOpen}
        setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
      />
    </section>
  );
}