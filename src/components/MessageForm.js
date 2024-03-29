import React, { Component } from 'react';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    // this.setState({value: event.target.value});
  }

  handleSubmit = (ev) => {
    this.props.onSendMsg();
    ev.preventDefault();
    this.setState({value: ''});
  }

  render() {
    return (
      <>
        <form className="mess-form" onSubmit={(ev) => this.handleSubmit(ev)}>
          <label>
            {/* <div>Message:</div> */}
            <textarea type="text"
              value={this.props.msgTempl}
              onChange={ev => this.props.addToMsg(ev.target.value)}
            />
          </label>
          <input type="submit" value="Send" />
        </form>
      </>
    )
  }
}

export default MessageForm;
