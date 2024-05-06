import React, { useState, useEffect } from 'react';
import image1 from '../../../images/title1.jpg';
import image2 from '../../../images/title2.jpg';
import image3 from '../../../images/title3.jpg';

export default function Preview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className='preview'>
      <div className='slider'>
        <div className='slider__list' style={{transform: `translateX(-${currentIndex * (100/3)}%)`}}>
          <div className='slider__item'>
            <img src={image1} alt="заставка" />
          </div>
          <div className='slider__item'>
            <img src={image2} alt="заставка" />
          </div>
          <div className='slider__item'>
            <img src={image3} alt="заставка" />
          </div>
        </div>
      </div>
      <div className="preview__text">
        <h1 className='preview__title'>CRYSTAL</h1>
        <p className='preview__subtitle'>Творческое объединение</p>
      </div>
    </section>
  );
}
