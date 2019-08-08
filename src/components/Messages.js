import React, { Component } from 'react';

class Messages extends Component {
  constructor(props){
    super(props);
    this.state = {
      msgs: [],
    
    }
  }

  componentDidMount() {
    const ws = new WebSocket('ws://st-chat.shas.tel');
    ws.onmessage = (msg) => (
      this.setState({
        // msgs: [...this.state.msgs, JSON.parse(msg.data)],
        msgs: JSON.parse(msg.data),
      })
    )
  }

  render() {
    const { msgs } = this.state;
    return (
      <ul
        key={msgs.time}
      >
        {msgs.map(msg =>
          <li>
            <div>{msg.message}</div>
          </li>
        )}
      </ul>
    )
  }
}

export default Messages;
