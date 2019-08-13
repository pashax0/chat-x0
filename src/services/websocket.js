export default class Ws {
  constructor(url) {
    this.url = url;
  }

  connect() {
    this.ws = new WebSocket(this.url);
  }

  reconnect() {
    
  }

}
