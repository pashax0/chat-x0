import React from 'react';

import MessageForm from './MessageForm';
import LoginButton from './LoginButton';

function Foot(props) {
  const { onLogin, from, onSendMsg } = props;

  return (
    <footer>
      {from ? <MessageForm
          onSendMsg={onSendMsg}
          from={from}
        />
        : <div
          className="login-attent"
        >
          <h1>For commenting, please, login!</h1>
          <LoginButton
            onLogin={onLogin}
          />
        </div>
      }
      <small className="copyright">© pashax0 {new Date().getFullYear()}</small>
    </footer>
  )
}

export default Foot;
