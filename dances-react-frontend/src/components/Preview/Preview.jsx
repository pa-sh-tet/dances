import React, { useState, useEffect } from 'react';
import image1 from '../../images/title1.jpg';
import image2 from '../../images/title2.jpg';
import image3 from '../../images/title3.jpg';

export default function Preview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // 3 - количество изображений
    }, 3000);

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, []); // Пустой массив зависимостей, чтобы useEffect сработал только один раз

  const images = [image1, image2, image3];

  return (
    <section className='preview'>
      <div className="carousel">
        <div className="carousel__inner">
          {images.map((image, index) => (
            <div key={index} className={`carousel__item ${index === currentIndex ? 'carousel__item_active' : ''}`}>
              <img src={image} alt='Фото выступления' />
            </div>
          ))}
        </div>
      </div>
      <div className="preview__text">
        <h1 className='preview__title'>CRYSTAL</h1>
        <p className='preview__subtitle'>Творческое объединение</p>
      </div>
    </section>
  );
}

