import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Signup.scss';

class Signup extends Component {

  constructor() {
    super();

    this.state = {
      user: {
				email: '',
        password: ''
      },
			password2: '',
      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangePassword2 = this.onChangePassword2.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

		if (this.state.password2 != this.state.user.password) {
			this.setState({message: 'Passwords don\'t match'});
		} else {
			const email = encodeURIComponent(this.state.user.email);
	    const password = encodeURIComponent(this.state.user.password);
	    const formData = `email=${email}&password=${password}`;

	    let self = this;
	    let payload = {
	      "email": this.state.username,
	      "password": this.state.password
	    }

	    axios.post('api/signup?'+formData)
	      .then(function (response) {
	        console.log(response);
	        if (response.status == 200) {
						axios.post('api/login?'+formData)
				      .then(function (response) {
								// if signup worked correctly, user should be able to login with no problem
				        if (response.status == 200) {
									window.location = response.data.redirectURL;
				        }
				      })
				      .catch(function (error) {
								console.log(error);
							})
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
	}

  onChangeEmail(e) {
    const user = this.state.user;
    user.email = e.target.value;
    this.setState({user})
  }

  onChangePassword(e) {
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({user})
  }

	onChangePassword2(e) {
    this.setState({password2: e.target.value});
  }

  render() {
    return (
      <div>
        <form className="Signup test" action="/" onSubmit={this.onSubmit}>
          <Card className="Signup_content">
            <div>
              <h1>Sign Up</h1>
							<p>{this.state.message}</p>

              <Input placeholder="Email" type="email" onChange={this.onChangeEmail} />
              <br/><br/>
              <Input placeholder="Password" type="password" onChange={this.onChangePassword} />
							<Input placeholder="Verify Password" type="password" onChange={this.onChangePassword2} />
              <br/><br/>
              <Input type="submit" />
              <h4>Already registered? Click <Link to="/login">here</Link> to Log In!</h4>
            </div>
          </Card>
        </form>
      </div>
    )
  }
}

export default Signup
