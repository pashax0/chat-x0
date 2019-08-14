export default class Ws {
  constructor(url, reconnect) {
    this.url = url;
    this.reconnect = reconnect;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log(`onopen - ${this.ws.readyState}`);
      this.readyState = this.ws.readyState;
    };
    this.ws.onerror = () => {
      console.log(`onerror - ${this.ws.readyState}`);
      this.readyState = this.ws.readyState;
    };
    this.ws.onclose = (ev) => {
      // setInterval(() => this.connect(), 3000);
      console.log(`onclose ${ev.code} - ${this.ws.readyState}`);
      this.readyState = this.ws.readyState;
    };

    
    
    // if (this.reconnect && this.readyState !== 1) {
    //   this.timer = setInterval(() => this.connect(), 3000);
    // }
  }

  onmessage(msgIn) {
    this.ws.onmessage = (msg) => {
      console.log(`onmessage - ${this.ws.readyState}`);
      this.onmessage(msg);
    };
    
    return msgIn;
  }

  reconnect() {

  }

  send(msgOut) {
    this.ws.send(msgOut);
  }

  getStatus() {
    return this.readyState;
  }

}
