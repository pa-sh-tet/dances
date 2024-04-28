import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Preview from '../Preview/Preview';
import Portfolio from '../Portfolio/Portfolio';
import Achievs from '../Achievs/Achievs';
import Contacts from '../Contacts/Contacts';
import Footer from '../Footer/Footer';

export default function App() {
  return (
    <>
      <div className='page'>
        <div className='app'>
          <Header />
          <Preview />
          <Portfolio />
          <Achievs />
          <Contacts />
          <Footer />
        </div>
      </div>
    </>
  )
}