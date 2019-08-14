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
    localStorage.clear();
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

    
    // this.ws = new Ws('wss://wssproxy.herokuapp.com', true);
    // this.ws.connect();
  }

  componentDidMount() {
    const ws = new WebSocket('wss://wssproxy.herokuapp.com/');
    
    ws.onopen = () => {
      // console.log(`onopen - ${this.ws.readyState}`);
      this.setState({
        wsStatus: ws.readyState,
      })
    };

    ws.onerror = () => {
      // console.log(`onerror - ${this.ws.readyState}`);
      // this.setState({
      //   wsStatus: 'error',
      // })
    };

    ws.onclose = (ev) => {
      this.setState({
        wsStatus: ev.code,
      })

      // console.log(`onclose ${ev.code} - ${this.ws.readyState}`);
    };

    ws.onmessage = (msg) => {
      this.setState((state) => {
        const reverseData = JSON.parse(msg.data).reverse();
        return {
          msgs: [...state.msgs, ...reverseData],
        }
      })
    };
}

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
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

  handleSendMsg = (text) => {
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
    const { wsStatus, from, msgs, scrollTop } = this.state;
    return (
      <>
        <Head
          wsStatus={wsStatus}
          from={from}
          onLogout={this.handleLogout}
          onLogin={this.handleLogin}
        />
        <Body
          wsStatus={wsStatus}
          msgs={msgs}
          scrollTop={scrollTop}
          scrolling={this.handleScroll}
        />
        <Foot
          onLogin={this.handleLogin}
          from={from}
          onSendMsg={this.handleSendMsg}
          // ws={this.ws}
        />
      </>
    );
  }
}

export default App;
