import React from 'react';

import Head from './components/Head';
import Body from './components/Body';
import Foot from './components/Foot';
import './App.css';

function App() {
  const ws = 'ws://st-chat.shas.tel';

  return (
    <div className="wrapper">
      <Head />
      <Body
        ws={ws}
        isLogin={true}
        user="test"
      />
      <Foot />
    </div>
  );
}

export default App;
