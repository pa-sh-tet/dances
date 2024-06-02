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
  onSave,
  setSelectedDanceIndex
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [nameError, setNameError] = useState(''); // Состояние для ошибки названия
  // Состояния для значений названия, описания и ссылок
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([]);
  useEffect(() => {
    setName('');
    setDescription('');
    setLinks([]);
    if (name.trim() === '') {
      setNameError('Поле не может быть пустым');
      // setIsChanged(false);
    } else {
      setNameError('');
    }
    setIsEditing(true); // Устанавливаем режим редактирования для нового элемента
  }, [dance, isNewItemOpen]);

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    if (value.trim() === '') {
      setNameError('Поле не может быть пустым');
      setIsChanged(false);
    } else {
      setNameError('');
      setIsChanged(true);
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
    onSave(newDance);
    setName('');
    setDescription('');
    setLinks([]);
    setIsEditing(true);
    setSelectedDanceIndex(0);
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
  return (
    <div className='dance-item'>
      {/* {dance != null && isEditing && */}
        <button
          className='dance-item__save-button link'
          type="button"
          onClick={saveEditing}
          disabled={name.trim() === ''}
        >
          <img className='save-button__img'></img>
          Сохранить
        </button>
      {/* } */}
      {isNewItemOpen && (
        <form className='dance-item__form'>
          <input
            type="text" 
            className='dance-item__title-input input' 
            value={name} 
            onChange={handleNameChange} 
          />
          <span className={`dance-item__input-error dance-item__input-error-title ${nameError && "dance-item__input-error_active"}`}>{nameError}</span>

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