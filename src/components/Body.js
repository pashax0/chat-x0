import React from 'react';

import Messages from './Messages';
import MessageForm from './MessageForm';
import LoginForm from './LoginForm';
import '../styles/body.css'

function Body(props) {
  const { onLogin, from, msgs, ws, scrollTop, scrolling } = props;
  return (
    <main>
      <Messages
        msgs={msgs}
        scrollTop={scrollTop}
        scrolling={scrolling}
      />
      {from ? <MessageForm
          ws={ws}
          from={from}
        />
        : <LoginForm
          onLogin={onLogin}
        />}
    </main>
  )
}

export default Body;
