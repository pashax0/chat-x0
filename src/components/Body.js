import React, { Component } from 'react';

import Messages from './Messages';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectStatus: null,
      error: null,
      isLogin: this.props.isLogin,
    };
  }

  componentDidMount() {
    // const ws = new WebSocket(this.props.ws);
    // // ws.onopen = () => (
    // //   this.setState({
    // //     connectStatus: 
    // //   })
    // // )
    // ws.onmessage = (message) => (
    //   this.setState({
    //     messages: [...this.state.messages, JSON.parse(message.data)],
    //   })
    // )
  }

  
  render() {
    const { isLogin } = this.state;
    if (isLogin === true) {
      return (
        <>
          <Messages />
          <h2>login</h2>
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
