import React, {Component} from 'react';

import '../styles/messages.scss';

class Messages extends Component {
  constructor(props) {
    super(props);

    const posFromTop = localStorage.getItem('top') ? +localStorage.getItem('top') : 0;

    this.state = {
      showLoader: false,
      isActiveWindow: true,
      anchorEl: null,
      posFromTop: posFromTop,
      // msgs: [],
    }
    this.listRef = React.createRef();
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // Добавляются ли в список новые элементы?
  //   // Запоминаем значение прокрутки, чтобы использовать его позже.
  //   if (prevProps.list.length < this.props.list.length) {
  //     const list = this.listRef.current;
  //     return list.scrollHeight - list.scrollTop;
  //   }
  //   return null;
  // }

  componentDidMount() {
    if (this.state.posFromTop) {
      this.scrolling(this.state.posFromTop);
    }
    window.onbeforeunload = () => localStorage.setItem('top', this.state.posFromTop);
    window.onunload = () => localStorage.setItem('top', this.state.posFromTop);
  }

  componentWillUnmount() {
    localStorage.setItem('top', this.state.posFromTop);
  }

  componentDidUpdate(prevProps) {
    if (this.props.wsStatus !== prevProps.wsStatus && this.state.posFromTop) {
      this.scrolling(this.state.posFromTop);
    }

    const { msgs } = this.props;
    if (Notification.permission === 'granted'
      && prevProps.msgs.length !== msgs.length
      && !this.state.isActiveWindow) {
      const notifText = msgs[msgs.length - 1].message;
      new Notification('Chat-x0',{body: notifText});
    }
  }

  scrolling(height) {
    const msgsList = this.refs.list;
    msgsList.scrollTo(0, height);
  }

  handleScrolling(target) {
    this.setState({
      posFromTop: +target.scrollTop,
    })
  }

  handlePopoverOpen = (id) => {
    this.setState({anchorEl: id});
  }

  handlePopoverClose = () => {
    this.setState({anchorEl: null});
  }

  handleAddToMessage = (to) => {
    this.props.addToMsg(to);
  }

  render() {
    // const { msgs } = this.state;
    const { msgs, from } = this.props;
    const regLink = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;
    // if(this.state.showLoader) {
      return (
        <ul
          className="messages"
          ref="list"
          onScroll={(ev) => this.handleScrolling(ev.target)}
        >
          {msgs.map(msg =>
            <li
              className={`msg-container ${from === msg.from ? 'own' : ''}`}
              key={msg.id}
            >
              <div className="msg-info">
                <div
                  className="msg-author"
                  onMouseEnter={() => this.handlePopoverOpen(msg.id)}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {msg.from}
                  {this.state.anchorEl === msg.id
                    ? <div
                      className="popover"
                      onClick={() => this.handleAddToMessage(msg.from)}
                    >
                      Send message to {msg.from}
                    </div>
                    : null}
                </div>
                <div
                  className="msg-date"
                >{(new Date(msg.time)).toLocaleString()}</div>
              </div>
              <p className="msg-text" dangerouslySetInnerHTML={{__html: `${msg.message.replace(regLink, `<a class="ext-link" href="$&" target="_blank">link</a>`)}`}}></p>
            </li>
          )}
        </ul>
      )
    // }
  }
}

export default Messages;
