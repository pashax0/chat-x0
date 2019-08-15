import React, { Component } from 'react';

// import Ws from './services/websocket';
import Head from './components/Head';
import Body from './components/Body';
import Foot from './components/Foot';
import './styles/reset.css';
import './styles/app.scss';

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
      online: null,
      isActiveWindow: true,
      wsStatus: null,
      from: from,
      msgs: msgsInStorage,
      scrollTop: 500,
      msgTempl: '',
    }
  }

  componentDidMount() {
    this.handleInternetStatus();
    this.handleWindowStatus();
    this.connectWs();
  }

  componentDidUpdate(prevProps, prevState) {
    clearInterval(this.timer);

    if (this.state.wsStatus !== prevState.wsStatus) {
      this.setState({
        msgs: [],
      })
    }

    if (this.state.wsStatus !== 1) {
      this.timer = setInterval(() => this.connectWs(), 10000);
    }
  }

  handleInternetStatus() {
    this.setState({online: navigator.onLine,})
    window.addEventListener("offline", () => this.setState({online: false, wsStatus: 'offline'}))
    window.addEventListener("online", () => this.setState({online: true,}))
  }

  handleWindowStatus() {
    window.addEventListener("focus", () => (
      this.setState({
        isActiveWindow: true,
      })
    ))
    window.addEventListener("blur", () => (
      this.setState({
        isActiveWindow: false,
      })
    ))
  }

  connectWs() {
    this.ws = new WebSocket('wss://wssproxy.herokuapp.com/');
    
    this.ws.onopen = () => {
      console.log(`onopen - ${this.ws.readyState}`);
      this.setState({
        wsStatus: this.ws.readyState,
      })
    };

    this.ws.onerror = () => {
      console.log(`onerror - ${this.ws.readyState}`);
    };

    this.ws.onclose = (ev) => {
      this.setState({
        wsStatus: ev.code,
      })
      console.log(`onclose ${ev.code} - ${this.ws.readyState}`);
    };

    this.ws.onmessage = (msg) => {
      this.setState((state) => {
        const reverseData = JSON.parse(msg.data).reverse();
        return {
          msgs: [...state.msgs, ...reverseData],
        }
      })
    };
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

 handleLogout = () => {
    localStorage.removeItem('from');
    localStorage.removeItem('notif');
    this.setState({
      from: false,
    })
  }

  handleLogin = (name) => {
    localStorage.setItem('from', name);
    this.setState({
      from: name,
    })
  }

  handleScroll = (ev) => {
    const fromTop = ev.target.scrollHeight;
    this.setState({
      scrollTop: fromTop,
    })
  }

  handleSendMsg = () => {
    const text = this.state.msgTempl;
    if (this.state.wsStatus === 1) {
      const msg = {
        from: this.state.from,
        message: text,
      };
      this.ws.send(JSON.stringify(msg));
    } else {
      let localMsgs = JSON.parse(localStorage.getItem('msgs')) || [];
      localMsgs.push(text);
      localStorage.setItem('msgs', JSON.stringify(localMsgs));
    }
    this.setState({
      msgTempl: '',
    })
  }

  handleAddToMsgFor = (to) => {
    this.setState((state) => {
      const msgFor = state.msgTempl.concat(`@${to} `);
      return {
        msgTempl: msgFor,
      }
    })
  }

  handleAddToMsgText = (text) => {
    this.setState({
      msgTempl: text,
    })
  }

  // handleGetMsg = (msg) => {
  //   this.setState((state) => {
  //     const reverseData = JSON.parse(msg.data).reverse();
  //     return {
  //       msgs: [...state.msgs, ...reverseData],
  //     }
  //   })
  // }

  render() {
    const { wsStatus, from, msgs, scrollTop, msgTempl } = this.state;
    return (
      <>
        <Head
          from={from}
          onLogout={this.handleLogout}
          onLogin={this.handleLogin}
        />
        <Body
          wsStatus={wsStatus}
          from={from}
          msgs={msgs}
          scrollTop={scrollTop}
          scrolling={this.handleScroll}
          addToMsg={this.handleAddToMsgFor}
        />
        <Foot
          onLogin={this.handleLogin}
          from={from}
          msgTempl={msgTempl}
          onSendMsg={this.handleSendMsg}
          addToMsg={this.handleAddToMsgText}
        />
        
      </>
    );
  }
}

export default App;
