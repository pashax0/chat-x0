import React from 'react';

import '../styles/messages.css';

function Messages (props) {
  const { msgs } = props;
  
  return (
    <ul className="massages">
      {msgs.map(msg =>
        <li
          key={msg.id}
        >
          <div>{msg.message}</div>
          <div>{msg.from}</div>
          <div>{(new Date(msg.time)).toString()}</div>
        </li>
      )}
    </ul>
  )
}

export default Messages;
