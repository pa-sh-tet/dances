import React, { useState, useEffect } from 'react';
import PopupWithForm from '../../PopupWithForm/PopupWithForm';

export default function DanceItem({
  isAdmin,
  dance,
  handleDeleteDance,
  closeAllPopups,
  setIsDeleteDancePopupOpen,
  isDeleteDancePopupOpen,
  isNewItemOpen,
  onSave,
  isModifing
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLink, setNewLink] = useState('');

  // Состояния для значений названия, описания и ссылок
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Устанавливаем значения из объекта dance при первом рендере или при выборе существующего элемента
    setName(dance.title);
    setDescription(dance.description);
    setLinks([...dance.links]);
  }, [dance, isNewItemOpen]);

  function setEditing() {
    setIsEditing(true);
  }

  function deleteLinkInput(indexToDelete) {
    setLinks(prevLinks => prevLinks.filter((_, index) => index !== indexToDelete));
  }

  function saveEditing() {
    setIsEditing(false);
    if (isNewItemOpen) {
      const newDance = {
        title: name,
        description: description,
        links: links
      };
      onSave(newDance); // Вызов функции onSave для сохранения нового элемента
    } else {
        const newDance = [
        dance.title = name,
        dance.description = description,
        dance.links = [...links]
      ]
    }
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

  function handleDeleteClick() {
    setIsDeleteDancePopupOpen(true);
  }

  return (
    <div className='dance-item'>
      {isAdmin && isModifing && (isEditing ? (
        <button className='dance-item__save-button link' type="button" onClick={saveEditing}></button>
      ) : (
        <button className='dance-item__edit-button link' type="button" onClick={setEditing}></button>
      ))}
      {isAdmin && isModifing && <button className="dance-item__delete-button link" type='button' onClick={handleDeleteClick}></button>}
      {isAdmin && isEditing ? (
        <form className='dance-item__form'>
          <input
            type="text" 
            className='dance-item__title-input input' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <textarea 
            className='dance-item__description-input input' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
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
      ) : (
        <>
          <h2 className='dance-item__title'>{dance.title}</h2>
          <p className='dance-item__description'>{dance.description}</p>
          <div className='dance-item__container'>
            {dance.links.map((link, index) => (
              <div key={index} className="dance-item__video">
                <iframe src={link.replace('video/', 'play/embed/').replace('/?r=wd', '')}
                  className="dance-item__iframe" frameBorder="0" allow="clipboard-write; autoplay"
                  webkitAllowFullScreen mozallowfullscreen allowFullScreen />
              </div>
            ))}
          </div>
        </>
      )}
      <PopupWithForm
        isOpen={isDeleteDancePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleDeleteDance}
        name="delete"
        buttonText="Да"
        title="Вы уверены, что хотите удалить этот танец?"
        setIsDeleteDancePopupOpen={setIsDeleteDancePopupOpen}
      />
    </div>
  )
}