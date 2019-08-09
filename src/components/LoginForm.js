import React from 'react';

function Login(props) {
  return (
    <div
      className="login-attent"
    >
      <h1>For commenting, please, login!</h1>
      <button
        onClick={() => props.onLogin()}
      >Login</button>
    </div>
  )
}

export default Login;
