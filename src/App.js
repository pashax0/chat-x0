import React, { Component } from 'react';

import Head from './components/Head';
import Body from './components/Body';
import Foot from './components/Foot';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      connectStatus: null,
      isLogin: false,
      msgs: [],
    }
    this.ws = new WebSocket('ws://st-chat.shas.tel');
  }

  componentDidMount() {
    
    this.ws.onopen = () => (
      this.setState({
        connectStatus: true,
      })
    )
    this.ws.onerror = () => (
      this.setState({
        connectStatus: false,
      })
    )
    this.ws.onmessage = (msg) => (
      this.setState((state) => {
        const reverseData = JSON.parse(msg.data).reverse();
        return {
          msgs: [...state.msgs, ...reverseData],
        }
      })
    )
  }

  render() {
    const { msgs, connectStatus } = this.state;
    return (
      <>
        <Head
          status={connectStatus}
        />
        <Body
          msgs={msgs}
          isLogin={true}
          user="test"
          ws={this.ws}
        />
        <Foot />
      </>
    );
  }
}

export default App;
