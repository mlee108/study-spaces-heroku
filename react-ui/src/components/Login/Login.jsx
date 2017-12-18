import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        password: '',
        email: ''
      },

      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onSubmit(e) {
		console.log("click!");

    e.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // let apiBaseUrl = 'http://localhost:3000/api/';
    let self = this;
    let payload = {
      "email": this.state.username,
      "password": this.state.password
    }
    console.log("formData="+formData);
    // console.log(apiBaseUrl+'login '+payload);
    axios.post('api/login?'+formData)
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
					// self.setState({message: response.data.message});
					window.location = response.data.redirectURL;
        } else {
					// nothing should reach this, hopefully
        }
      })
      .catch(function (error) {
				if (error.response.status == 401) {
					self.setState({message: error.response.data.message});
				} else {
					console.log(error);
				}
      })
  }

  onChangeEmail(e) {
    const user = this.state.user;
    user.email = e.target.value;
    this.setState({user});
  }

  onChangePassword(e) {
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({user});
  }


  render() {
    return (
      <div>
				<form className="Login" action="/" onSubmit={this.onSubmit}>
					<Card className="Login__content">
						<div>
							<h1>Login</h1>
							<p className="loginMessage">{this.state.message}</p>

							<Input placeholder="Email" type="email" onChange={this.onChangeEmail} />
							<br/><br/>
							<Input placeholder="Password" type="password" onChange={this.onChangePassword} />
							<br/><br/>
							<Input type="submit" />
							<h4>No account yet? Click <Link to="/signup">here</Link> to Sign Up!</h4>
						</div>
					</Card>
        </form>
      </div>
    )
  }
}

export default Login
