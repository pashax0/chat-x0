import React from 'react';

function Head(props) {
  const {status} = props;
  return (
    <header>
      <h1>Welcome to chat</h1>
      <p>{status ? 'connected' : 'not'}</p>
    </header>
  )
}

export default Head;
