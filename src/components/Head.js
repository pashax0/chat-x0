import React from 'react';

function Head(props) {
  const {status, from, onLogout, onLogin} = props;
  const user = from ? from.toUpperCase() : 'Stranger';
  return (
    <header>
      <h1>{user}, welcome to chat</h1>
      {from ? <button onClick={() => onLogout()}>logout</button>
      :<button onClick={() => onLogin()}>login</button>}
      {/* <p>{status ? 'connected' : 'not'}</p> */}
    </header>
  )
}

export default Head;
