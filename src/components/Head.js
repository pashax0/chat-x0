import React from 'react';

import LoginButton from './LoginButton';

function Head(props) {
  const { wsStatus, from, onLogout, onLogin } = props;
  const user = from ? from.toUpperCase() : 'Stranger';
  return (
    <header>
      <h1>{user}, welcome to chat</h1>
      {/* <p>{wsStatus}</p> */}
      {from ? <button onClick={() => onLogout()}>logout</button>
      : <LoginButton
        onLogin={onLogin}
      />}
    </header>
  )
}

export default Head;
