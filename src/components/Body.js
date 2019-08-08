import React from 'react';

import Messages from './Messages';
import MessageForm from './MessageForm';

function Body(props) {
  const { msgs, ws } = props;
  return (
    <main>
      <Messages
        msgs={msgs}
      />
      <MessageForm
        ws={ws}
      />
    </main>
  )
}

export default Body;
