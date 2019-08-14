import React from 'react';

import MessageForm from './MessageForm';
import LoginForm from './LoginForm';

function Foot(props) {
  const { onLogin, from, ws, onSendMsg } = props;

  return (
    <footer>
      {from ? <MessageForm
          onSendMsg={onSendMsg}
          from={from}
        />
        : <LoginForm
          onLogin={onLogin}
        />
      }
      <small className="copyright">© pashax0 {new Date().getFullYear()}</small>
    </footer>
  )
}

export default Foot;
