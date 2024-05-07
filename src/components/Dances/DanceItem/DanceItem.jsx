// import React from 'react';

const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export default function DanceItem() {
  return (
    <div className='dance-item'>
      <h2 className='dance-item__title'>Название</h2>
      <p className='dance-item__description'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, unde? Et, pariatur. Quis nostrum dolorem nulla dicta cum nemo numquam voluptas. Quis beatae eius vitae reprehenderit aliquam veritatis iste hic?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur reiciendis quo sequi, cumque quia nemo, asperiores possimus, sed quis officiis ipsam minima. Accusantium sed, quasi minima hic numquam quia enim!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur reiciendis quo sequi, cumque quia nemo, asperiores possimus, sed quis officiis ipsam minima. Accusantium sed, quasi minima hic numquam quia enim!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur reiciendis quo sequi, cumque quia nemo, asperiores possimus, sed quis officiis ipsam minima. Accusantium sed, quasi minima hic numquam quia enim!
      </p>
      <div className='dance-item__container'>
        <div className="dance-item__video">
          <iframe src={link.replace('watch?v=', 'embed/')} className="dance-item__iframe" allowFullScreen />
        </div>
        <div className="dance-item__video">
          <iframe src={link.replace('watch?v=', 'embed/')} className="dance-item__iframe" allowFullScreen />
        </div>
      </div>
    </div>
  )
}
