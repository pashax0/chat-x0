import React, {Component} from 'react';

import '../styles/messages.scss';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      isActiveWindow: true,
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
    console.log('message update');
    const msgsList = this.refs.list;
    const { scrollTop } = this.props;
    msgsList.scrollTo(0, msgsList.scrollHeight);
  }

  componentDidUpdate(prevProps) {
    const { msgs } = this.props;
    if (Notification.permission === 'granted'
      && prevProps.msgs.length !== msgs.length
      && !this.state.isActiveWindow) {
      const notifText = msgs[msgs.length - 1].message;
      new Notification('Chat-x0',{body: notifText});
    }
  }

  render() {
    // const { msgs } = this.state;
    const { msgs, from } = this.props;
    // if(this.state.showLoader) {
      return (
        <ul
          className="messages"
          ref="list"
          // onScroll={(ev) => this.props.scrolling(ev)}
        >
          {msgs.map(msg =>
            <li
              className={`msg-container ${from === msg.from ? 'own' : ''}`}
              key={msg.id}
            >
              <div className="msg-info">
                <div
                  className="msg-author"
                >{msg.from}</div>
                <div
                  className="msg-date"
                >{(new Date(msg.time)).toLocaleString()}</div>
              </div>
              <p className="msg-text"
              >{msg.message}</p>
            </li>
          )}
        </ul>
      )
    // }
  }
}

export default Messages;
