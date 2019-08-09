import React, {Component} from 'react';

import '../styles/messages.scss';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
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
    // setTimeout(() => {
    //   if(this.loading){
    //     this.setState({ showLoader: true })
    //   }
    // }, 5000);
  }

  componentDidUpdate(prevProps) {
    const { msgs } = this.props;
    const msgsList = this.refs.list;
    const { scrollTop } = this.props;
    if (prevProps.msgs.length !== msgs.length) {
      const notifText = msgs[msgs.length - 1].message;
      new Notification('Chat-x0',{body: notifText});
      // msgsList.scrollTo(0, scrollTop);
    }
  }

  render() {
    const { msgs } = this.props;
    // if(this.state.showLoader) {
      return (
        <ul
          className="messages"
          ref="list"
          // onScroll={(ev) => this.props.scrolling(ev)}
        >
          {msgs.map(msg =>
            <li
              className="msg-container"
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
              <div className="msg-text"
              >{msg.message}</div>
            </li>
          )}
        </ul>
      )
    // }
  }
}

export default Messages;
