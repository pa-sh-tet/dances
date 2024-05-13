import React, { useState } from 'react';

export default function DanceItem({ isAdmin, dance }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLink, setNewLink] = useState('');

  function setEditing() {
    setIsEditing(true);
  }

  function saveEditing() {
    setIsEditing(false);
  }

  function handleNewLinkChange(event) {
    setNewLink(event.target.value);
  }

  function addNewLink() {
    if (newLink.trim() !== '') {
      dance.links.push(newLink);
      setNewLink('');
    }
  }

  return (
    <div className='dance-item'>
      {isAdmin && (isEditing ? (
        <button className='dance-item__save-button link' type="button" onClick={saveEditing}></button>
      ) : (
        <button className='dance-item__edit-button link' type="button" onClick={setEditing}></button>
      ))}
      {isEditing && isAdmin ? (
        <form className='dance-item__form'>
          <input type="text" className='dance-item__title-input input' value={dance.title} />
          <textarea className='dance-item__description-input input' value={dance.description} />
          {dance.links.map((link, index) => (
            // <div className=''></div>
            <input key={index} className='dance-item__link-input input' value={link} readOnly />
          ))}
          <input
            type="text"
            className='dance-item__link-input input'
            value={newLink}
            onChange={handleNewLinkChange}
            placeholder="Введите ссылку на видео"
          />
          <button className="dance-item__add-button" type="button" onClick={addNewLink}>Добавить видео танца</button>
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
    </div>
  )
}
