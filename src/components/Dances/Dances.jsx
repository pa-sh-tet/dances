import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (danceList.length > 0 && selectedDanceIndex === null) {
      setSelectedDanceIndex(0);
    }
  }, [danceList, selectedDanceIndex, setSelectedDanceIndex]);

  const handleAddItemClick = () => {
    setIsNewItemOpen(true);
  };

  const handleDanceItemClick = (index) => {
    setIsNewItemOpen(false);
    setSelectedDanceIndex(index);
  };

  function updateDanceInState(updatedDance) {
    danceList[selectedDanceIndex] = updatedDance;
    setSelectedDanceIndex(selectedDanceIndex);
  }

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
          updateDanceInState={updateDanceInState}
        />
      )}
      {(isNewItemOpen || (isNewItemOpen && danceList.length === 0 && isAdmin)) && (
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
      {danceList.length === 0 && !isNewItemOpen && (
        <h3 className='dances__empty'>На данный момент танцев нет</h3>
      )}
    </section>
  );
}
