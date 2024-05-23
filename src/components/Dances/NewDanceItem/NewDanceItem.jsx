import React, { useState, useEffect } from 'react';
import PopupWithForm from '../../PopupWithForm/PopupWithForm';

export default function NewDanceItem({
  isAdmin,
  dance,
  handleDeleteDance,
  closeAllPopups,
  setIsDeleteDancePopupOpen,
  isDeleteDancePopupOpen,
  isNewItemOpen,
  onSave
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  // Состояния для значений названия, описания и ссылок
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([]);
  useEffect(() => {
    setName('');
    setDescription('');
    setLinks([]);
    setIsEditing(true); // Устанавливаем режим редактирования для нового элемента
  }, [dance, isNewItemOpen]);

  // setIsEditing(true); 

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    if (value != '') {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }

  function setEditing() {
    setIsEditing(true);
  }

  function deleteLinkInput(indexToDelete) {
    setLinks(prevLinks => prevLinks.filter((_, index) => index !== indexToDelete));
  }

  function saveEditing() {
    setIsEditing(false);
    const newDance = {
      title: name,
      description: description,
      links: links
    };
    onSave(newDance); // Вызов функции onSave для сохранения нового элемента
    setName('');
    setDescription('');
    setLinks([]);
    setIsEditing(true);
  }

  function handleNewLinkChange(event) {
    setNewLink(event.target.value);
  }

  function addNewLink() {
    if (newLink.trim() !== '') {
      setLinks(prevLinks => [...prevLinks, newLink]);
      setNewLink('');
    }
  }

  // function handleDeleteClick() {
  //   setIsDeleteDancePopupOpen(true);
  // }

  return (
    <div className='dance-item'>
      {isEditing ? (
        <button className='dance-item__save-button link' type="button" disabled={!isChanged} onClick={saveEditing}></button>
      ) : (
        <button className='dance-item__edit-button link' type="button" onClick={setEditing}></button>
      )}
      {/* <button className="dance-item__delete-button link" type='button' onClick={handleDeleteClick}></button> */}
      {isNewItemOpen && (
        <form className='dance-item__form'>
          <input
            type="text" 
            className='dance-item__title-input input' 
            value={name} 
            onChange={handleNameChange} 
          />
          <textarea 
            className='dance-item__description-input input' 
            value={description} 
            onChange={(e) => {
              setDescription(e.target.value);
            }} 
          />
          {links.map((link, index) => (
            <div className='dance-item__link' key={index}>
              <input 
                className='dance-item__link-input input' 
                value={link} 
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index] = e.target.value;
                  setLinks(newLinks);
                }}
              />
              <button className='dance-item__link-delete-button link' type='button' onClick={() => deleteLinkInput(index)} />
            </div>
          ))}
          <div className='dance-item__link'>
            <input
              type="link"
              className='dance-item__link-input input'
              value={newLink}
              onChange={handleNewLinkChange}
              placeholder="Введите ссылку на видео"
            />
          </div>
          <button className="dance-item__add-button link" type="button" onClick={addNewLink}>Добавить видео</button>
        </form>
      )}
      <PopupWithForm
        isOpen={isDeleteDancePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleDeleteDance}
        name="delete"
        buttonText="Да"
        title="Вы уверены, что хотите удалить этот танец?"
        // setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
      />
    </div>
  )
}