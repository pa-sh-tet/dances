import React, { useState } from 'react';
import DanceItem from './DanceItem/DanceItem';
import Menu from './Menu/Menu';

export default function Dances({ isAdmin }) {
  const danceList = [
    {
      title: 'Снежинка',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritati',
      links: [
        'https://rutube.ru/video/c6cc4d620b1d4338901770a44b3e82f4/?r=wd',
        // 'https://rutube.ru/video/c6cc4d620b1d4338901770a44b3e82f4/?r=wd',
        'https://rutube.ru/video/54a5eb6ef3f46b667fc8aa799e9c00c3/',
      ],
    },
    {
      title: 'Танец 2',
      description: 'unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritati',
      links: [

      ],
    },
    {
      title: 'Танец 3',
      description: 'unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritat Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit deleniti, reprehenderit natus ipsum repellendus sit amet corrupti quos debitis, ab ullam culpa voluptatum tempora quod vel nulla consectetur, similique voluptatibus',
      links: [
        
      ],    
    },
  ];
  
  const [selectedDanceIndex, setSelectedDanceIndex] = useState(0);

  const handleDanceItemClick = (index) => {
    setSelectedDanceIndex(index);
  };

  return (
    <section className='dances'>
      <Menu danceList={danceList} selectedDanceIndex={selectedDanceIndex} onItemClick={handleDanceItemClick} />
      <DanceItem isAdmin={isAdmin} dance={danceList[selectedDanceIndex]} />
    </section>
  );
}