import React from 'react';

function Head(props) {
  const { wsStatus, from, onLogout, onLogin } = props;
  const user = from ? from.toUpperCase() : 'Stranger';
  return (
    <header>
      <h1>{user}, welcome to chat</h1>
      <p>{wsStatus}</p>
      {from ? <button onClick={() => onLogout()}>logout</button>
      :<button onClick={() => onLogin()}>login</button>}
    </header>
  )
}

export default Head;
