import React, { Component } from 'react';

import Head from './components/Head';
import Body from './components/Body';
import Foot from './components/Foot';
import './styles/app.css';

class App extends Component {
  constructor(props){
    super(props);
    // localStorage.clear();
    let msgsInStorage = [];
    const from = localStorage.getItem('from') ? localStorage.getItem('from') : false;
    if (localStorage.getItem('msgs')) {
      msgsInStorage = localStorage.getItem('msgs');
    }

    this.state = {
      connectStatus: null,
      from: from,
      msgs: msgsInStorage,
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

  componentWillUnmount() {
    localStorage.setItem('msgs', this.state.msgs);
  }

  handleLogout = () => {
    localStorage.removeItem('from');
    this.setState({
      from: false,
    })
  }

  handleLogin = () => {
    localStorage.setItem('from', 'me');
    this.setState({
      from: 'me',
    })
  }

  handleScroll = (ev) => {
    const fromTop = ev.target.scrollHeight;
    this.setState({
      scrollTop: fromTop,
    })
  }

  render() {
    const { from, msgs, scrollTop, connectStatus } = this.state;
    return (
      <>
        <Head
          // status={connectStatus}
          from={from}
          onLogout={this.handleLogout}
          onLogin={this.handleLogin}
        />
        <Body
          msgs={msgs}
          onLogin={this.handleLogin}
          from={from}
          user="test"
          ws={this.ws}
          scrollTop={scrollTop}
          scrolling={this.handleScroll}
        />
        <Foot />
      </>
    );
  }
}

export default App;
