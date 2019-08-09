import React, { Component } from 'react';

import Head from './components/Head';
import Body from './components/Body';
import Foot from './components/Foot';
import './styles/app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      connectStatus: null,
      isLogin: false,
      msgs: [],
      scrollTop: 500,
    }
    this.ws = new WebSocket('ws://st-chat.shas.tel');
  }

  componentDidMount() {
    
    // this.ws.onopen = () => (
    //   this.setState({
    //     connectStatus: true,
    //   })
    // )
    // this.ws.onerror = () => (
    //   this.setState({
    //     connectStatus: false,
    //   })
    // )
    this.ws.onmessage = (msg) => (
      this.setState((state) => {
        const reverseData = JSON.parse(msg.data).reverse();
        return {
          msgs: [...state.msgs, ...reverseData],
        }
      })
    )
  }

  handleScroll = (ev) => {
    const fromTop = ev.target.scrollHeight;
    this.setState({
      scrollTop: fromTop,
    })
  }

  render() {
    const { msgs, connectStatus } = this.state;
    return (
      <>
        <Head
          // status={connectStatus}
        />
        <Body
          msgs={msgs}
          isLogin={true}
          user="test"
          ws={this.ws}
          scrollTop={this.state.scrollTop}
          scrolling={this.handleScroll}
        />
        <Foot />
      </>
    );
  }
}

export default App;
