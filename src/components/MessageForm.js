import React, { Component } from 'react';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    const msg = {
      from: this.props.from,
      message: this.state.value,
    };
    this.props.ws.send(JSON.stringify(msg));
    event.preventDefault();
    this.setState({value: ''});
  }

  render() {
    return (
      <>
        <form className="mess-form" onSubmit={(ev) => this.handleSubmit(ev)}>
          <label>
            <div>Message:</div>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>
      </>
    )
  }
}

export default MessageForm;
