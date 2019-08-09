import React from 'react';

import Messages from './Messages';
import MessageForm from './MessageForm';
import '../styles/body.css'

function Body(props) {
  const { msgs, ws, scrollTop, scrolling } = props;
  return (
    <main>
      <Messages
        msgs={msgs}
        scrollTop={scrollTop}
        scrolling={scrolling}
      />
      <MessageForm
        ws={ws}
      />
    </main>
  )
}

export default Body;
