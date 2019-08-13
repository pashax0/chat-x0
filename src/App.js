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

    this.ws = new WebSocket('wss://wssproxy.herokuapp.com');
  
  }

  componentDidMount() {
    // this.timer = setInterval(() => this.getWsStatus(), 3000);
    
    
    this.ws.onopen = () => {
      console.log(`onopen - ${this.ws.readyState}`);
      this.setState({
        wsStatus: 'open',
      })
    };
    
    this.ws.onerror = () => {
      console.log(`onerror - ${this.ws.readyState}`);
    };

    this.ws.onmessage = (msg) => {
      console.log(`onmessage - ${this.ws.readyState}`);
      this.setState((state) => {
        const reverseData = JSON.parse(msg.data).reverse();
        return {
          msgs: [...state.msgs, ...reverseData],
        }
      })
    };

    this.ws.onclose = (ev) => {
      console.log(`onclose ${ev.code} - ${this.ws.readyState}`);
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    // const ws = new WebSocket('ws://st-chat.shas.tel');
    // if (ws.readyState !== this.state.wsStatus) {
    //   this.setState({
    //     wsStatus: ws.readyState,
    //   })
    // }
    console.log('App update');
  }

  setNotification() {
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

  getWsStatus() {
    // this.ws.send('');
    if (this.ws.readyState === WebSocket.CLOSED) {
      console.log(`ws status - closed`);
    };
    console.log(`ws status - ${this.ws.readyState}`);
  }
  
  handleLogout = () => {
    localStorage.removeItem('from');
    localStorage.removeItem('notif');
    this.setState({
      from: false,
    })
    
  }

  handleLogin = () => {
    // this.setNotification();
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
          msgs={msgs}
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
