import React, { useState } from 'react';
import DanceItem from './DanceItem/DanceItem';
import Menu from './Menu/Menu';

export default function Dances({
  isAdmin,
  handleDeleteDance,
  danceList,
  closeAllPopups,
  setIsDeleteDancePopupOpen,
  isDeleteDancePopupOpen,
  handleSave
}) {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);
  const [selectedDanceIndex, setSelectedDanceIndex] = useState(0);

  const handleAddItemClick = () => {
    setIsNewItemOpen(true);
  };

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
        handleAddItemClick={handleAddItemClick}
      />
      <DanceItem
        isAdmin={isAdmin}
        dance={danceList[selectedDanceIndex]}
        handleDeleteDance={handleDeleteDance}
        isDeleteDancePopupOpen={isDeleteDancePopupOpen}
        setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
        closeAllPopups={closeAllPopups}
        isNewItemOpen={isNewItemOpen}
        onSave={handleSave}
      />
    </section>
  );
}