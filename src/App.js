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
    const notif = localStorage.getItem('notif') ? localStorage.getItem('notif') : null;
    const from = localStorage.getItem('from') ? localStorage.getItem('from') : false;
    if (localStorage.getItem('msgs')) {
      msgsInStorage = localStorage.getItem('msgs');
    }
    
    this.state = {
      notificationPerm: notif,
      wsStatus: null,
      from: from,
      msgs: msgsInStorage,
      scrollTop: 500,
    }
    this.ws = new WebSocket('ws://st-chat.shas.tel');
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      if (!this.state.notificationPerm) {
        Notification.requestPermission()
          .then(result => {
            this.setState({
              notificationPerm: result,
            })
          })
      }
    }
    //   if (Notification.permission === "granted") {
    //   this.notification = new Notification("Hi there!");
    // } else if (Notification.permission !== 'denied') {
    //   Notification.requestPermission(function (permission) {
    //     if (permission === "granted") {
    //       var notification = new Notification("Hi there!");
    //     }
    //   });
    // }

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
