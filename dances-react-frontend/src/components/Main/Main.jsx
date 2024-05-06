import React from 'react';
import Preview from './Preview/Preview';
import Portfolio from './Portfolio/Portfolio';
import Achievs from './Achievs/Achievs';
import Contacts from './Contacts/Contacts';
import Footer from './Footer/Footer';

export default function Main () {

  return (
    <main className="main">
      <Preview />
      <Portfolio />
      <Achievs />
      <Contacts />
      <Footer />
    </main>
  )
}