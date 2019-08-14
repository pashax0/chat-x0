import React, { Component } from 'react';

import '../styles/login-form.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (ev) => {
    this.props.onLogin(this.state.value);
    ev.preventDefault();
    this.setState({value: ''});
  }

  render() {
    return (
      <div
        className="login-form"
      >
        <h1>Hello!</h1>
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <label>
            <p>Nickname:</p>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="ok" />
        </form>
      </div>
    )
  }
}

export default Login;
