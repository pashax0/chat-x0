import React, { Component } from 'react';

import Messages from './Messages';
import MessageForm from './MessageForm';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectStatus: null,
      error: null,
      isLogin: this.props.isLogin,
    };
  }

  render() {
    const { isLogin } = this.state;
    if (isLogin === true) {
      return (
        <>
          <Messages
            msgs={this.props.msgs}
          />
          <h2>login</h2>
          <MessageForm
            ws={this.props.ws}
          />
        </>
      )
    } else {
      return (
        <>
          <h2>not login</h2>
        </>
      )
    }
  }
}

export default Body;
