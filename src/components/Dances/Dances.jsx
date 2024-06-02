import React, { useState } from 'react';
import DanceItem from './DanceItem/DanceItem';
import Menu from './Menu/Menu';
import NewDanceItem from './NewDanceItem/NewDanceItem';

export default function Dances({
  isAdmin,
  handleDeleteDance,
  danceList,
  closeAllPopups,
  setIsDeleteDancePopupOpen,
  isDeleteDancePopupOpen,
  handleSave,
  selectedDanceIndex,
  setSelectedDanceIndex,
  isModifing
}) {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);

  const handleAddItemClick = () => {
    setIsNewItemOpen(true);
  };

  const handleDanceItemClick = (index) => {
    setIsNewItemOpen(false);
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
        isNewItemOpen={isNewItemOpen}
        isModifing={isModifing}
      />
      {danceList[selectedDanceIndex] && (!isNewItemOpen) && (
        <DanceItem
          isModifing={isModifing}
          dance={danceList[selectedDanceIndex]}
          handleDeleteDance={() => handleDeleteDance(selectedDanceIndex)}
          isDeleteDancePopupOpen={isDeleteDancePopupOpen}
          setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
          closeAllPopups={closeAllPopups}
          isNewItemOpen={isNewItemOpen}
        />
      )}
      {(isNewItemOpen || (isNewItemOpen && danceList.length == 0 && isAdmin))  && (
        <NewDanceItem
          isAdmin={isAdmin}
          dance={danceList[selectedDanceIndex]}
          handleDeleteDance={handleDeleteDance}
          isDeleteDancePopupOpen={isDeleteDancePopupOpen}
          setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
          closeAllPopups={closeAllPopups}
          isNewItemOpen={isNewItemOpen}
          onSave={handleSave}
          setSelectedDanceIndex={setSelectedDanceIndex}
        />
      )}
      {danceList.length == 0 && !isNewItemOpen && (
        <h3 className='dances__empty'>На данный момент танцев нет</h3>
      )}
    </section>
  );
}