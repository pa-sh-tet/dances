import React from 'react';

export default function PopupWithForm({ title, name, children, isOpen, buttonText, onClose, onSubmit, setIsDeleteDancePopupOpen }) {
  function handleSubmit(event) {
    event.preventDefault(); // Предотвращение отправки формы
    onSubmit(); // Вызов обработчика onSubmit
    setIsDeleteDancePopupOpen(false);
  }
  
  return (
    <section className={`popup popup_${name} ${isOpen && `popup_active`}`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form name={`${name}`} className="popup__form" id={`${name}__form`} onSubmit={handleSubmit}>
          {children}
          <button type="submit" id={`${name}-save-button`} className="popup__save-button link">{buttonText}</button>
        </form>
        <button type="button" id={`${name}-close-button`} className="popup__close-button link" onClick={onClose}></button>
      </div>
    </section>
  );
}