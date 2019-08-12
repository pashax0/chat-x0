import React, { Component } from 'react';

import Head from './components/Head';
import Body from './components/Body';
import Foot from './components/Foot';
import './styles/reset.css';
import './styles/app.scss';

class App extends Component {
  constructor(props){
    super(props);
    let msgsInStorage = [];
    const from = localStorage.getItem('from') ? localStorage.getItem('from') : false;
    if (localStorage.getItem('msgs')) {
      msgsInStorage = localStorage.getItem('msgs');
    }
    
    this.state = {
      wsStatus: null,
      from: from,
      msgs: msgsInStorage,
      scrollTop: 500,
    }
    this.ws = new WebSocket('ws://st-chat.shas.tel');
  }

  componentDidMount() {
    this.handleNotification();
    
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
    this.ws.onmessage = (msg) => {
      this.setState((state) => {
        const reverseData = JSON.parse(msg.data).reverse();
        return {
          msgs: [...state.msgs, ...reverseData],
        }
      })
    }

    this.ws.onclose = (ev) => console.log(ev.code);
  }

  componentDidUpdate() {
    // const ws = new WebSocket('ws://st-chat.shas.tel');
    // if (ws.readyState !== this.state.wsStatus) {
    //   this.setState({
    //     wsStatus: ws.readyState,
    //   })
    // }
    console.log(this.ws.readyState);
  }

  handleNotification() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      if (Notification.permission === 'default') {
        Notification.requestPermission()
          .then(result => {
            result === 'granted' ? alert(`Thank, you!`) : alert('If you change your mind, please - click this button!');
          })
      }
    }
  }
  
  handleLogout = () => {
    localStorage.removeItem('from');
    localStorage.removeItem('notif');
    this.setState({
      from: false,
      notificationPerm: null,
    })
    
  }

  handleLogin = () => {
    this.handleNotification();
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
    const { wsStatus, from, msgs, scrollTop, connectStatus } = this.state;
    return (
      <>
        <Head
          // status={connectStatus}
          from={from}
          onLogout={this.handleLogout}
          onLogin={this.handleLogin}
        />
        <Body
          wsStatus={wsStatus}
          msgs={msgs}
          onLogin={this.handleLogin}
          from={from}
          user="test"
          ws={this.ws}
          scrollTop={scrollTop}
          scrolling={this.handleScroll}
        />
        <Foot
          onLogin={this.handleLogin}
          from={from}
          ws={this.ws}
        />
      </>
    );
  }
}

export default App;
