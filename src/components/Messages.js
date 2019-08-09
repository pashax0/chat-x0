import React, {Component} from 'react';

import '../styles/messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
    return (
      <ul
        className="massages"
        ref="list"
        // onScroll={(ev) => this.props.scrolling(ev)}
      >
        {msgs.map(msg =>
          <li
            key={msg.id}
          >
            <div>{msg.message}</div>
            <div>{msg.from}</div>
            <div>{(new Date(msg.time)).toString()}</div>
          </li>
        )}
      </ul>
    )
  }
}

export default Messages;
