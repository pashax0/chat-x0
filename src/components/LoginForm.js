import React from 'react';

function Head(props) {
  return (
    <>
      <h1>Please, login!</h1>
      <button
        onClick={() => props.onLogin()}
      >Login</button>
    </>
  )
}

export default Head;
