import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Rating,
  Form,
  TextArea,
  Button,
  Popup
} from 'semantic-ui-react';
import axios from 'axios';

import './Review.css';

class Review extends Component {
  constructor(props){
      super(props);

      this.state = {
        email: "",
        icon: "",
        location: props.location.state.location,
        address: props.location.state.address,
        rating1: 3,
        rating2: 3,
        rating3: 3,
        rating4: 3,
        text: ""
      }

      this.handleRating1 = this.handleRating1.bind(this);
      this.handleRating2 = this.handleRating2.bind(this);
      this.handleRating3 = this.handleRating3.bind(this);
      this.handleRating4 = this.handleRating4.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
      this.submitReview = this.submitReview.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleRating1(e, {rating}) {
    this.setState({
      rating1: rating
    });
  }
  handleRating2(e, {rating}) {
    this.setState({
      rating2: rating
    });
  }
  handleRating3(e, {rating}) {
    this.setState({
      rating3: rating
    });
  }
  handleRating4(e, {rating}) {
    this.setState({
      rating4: rating
    });
  }
  handleFormChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  submitReview(e) {
    e.preventDefault();

    let apiCall = '/api/review?where={"email": "' + this.state.email + '"';
    apiCall = apiCall + ', "address": "' + this.state.address + '"}';
    console.log(apiCall);

    let firstChar = this.state.email.charAt(0);
    let charVal = (firstChar.charCodeAt(0)-96) % 10;
    let profileIcon = charVal.toString() + ".png";
    console.log(profileIcon);

    axios.get(apiCall)
    .then ( (res) => {
      console.log(res.data.data.length);
      if (res.data.data.length == 0) {
        // POST new review
        console.log("POSTING NEW REVIEW: ");
        console.log(this.state.email);
        console.log(profileIcon);
        console.log(this.state.location);
        console.log(this.state.address);
        console.log(this.state.rating1);
        console.log(this.state.rating2);
        console.log(this.state.rating3);
        console.log(this.state.rating4);
        console.log(this.state.text);
        axios.post('/api/review', {
          email: this.state.email,
          icon: profileIcon,
          location: this.state.location,
          address: this.state.address,
          rating1: this.state.rating1,
          rating2: this.state.rating2,
          rating3: this.state.rating3,
          rating4: this.state.rating4,
          text: this.state.text
        })
        .then ( (res) => {
          console.log("post success");
          console.log(res);
        })
        .catch ( (err) => {
          console.log("post error");
          console.log(err);
        })
      }
      else {
        console.log("updating a review");
        let id = res.data.data[0]._id;
        console.log(id);
        axios.put('/api/review/'+id, {
          email: this.state.email,
          icon: profileIcon,
          location: this.state.location,
          address: this.state.address,
          rating1: this.state.rating1,
          rating2: this.state.rating2,
          rating3: this.state.rating3,
          rating4: this.state.rating4,
          text: this.state.text
        })
        .then ( (res) => {
          console.log("PUT success");
        })
        .catch ( (err) => {
          console.log(err);
        })
      }
    })
    .catch ( (err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    console.log("inside ComponentDidMount");
    axios.get('/api/profile')
			.then( (res) => {
	      this.setState({
          email: res.data.user.email
        });
				console.log("user can review: " + res.data.user.email);
	    })
			.catch( (err) => {
				console.log(err);
	    });
  }

  render() {
    return (
      <div>
        <h1>Reviewing {this.state.location}</h1>
        <h4>{this.state.address}</h4>
        <div className="ratings">
        <div className="middle aligned grid">
          <div className="ui items">

            <div className="ui grid">
              <div className="eight wide column">
                <div className="ui items">
                <div className="ui item">
                  <div className="middle aligned content">
                    <div className="header">
                      <Popup
                        trigger={<Button content='Quietness:' />}
                        content='1 star: very loud 5 star: very quiet'
                      />
                    </div>
                    <Rating
                      className="ui star"
                      defaultRating={3}
                      maxRating={5}
                      onRate={this.handleRating1}
                    />
                  </div>
                </div>
              </div>
            </div>

              <div className="eight wide column">
                <div className="ui items">
                  <div className="ui item">
                    <div className="middle aligned content">
                      <div className="header">
                        <Popup
                          trigger={<Button content='Wi-Fi Strength:' />}
                          content='1 star: no wi-fi 5 star: great wi-fi'
                        />
                      </div>
                      <Rating
                        className="ui star"
                        defaultRating={3}
                        maxRating={5}
                        onRate={this.handleRating2}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>


            <div className="ui grid">
              <div className="eight wide column">
                <div className="ui items">
                  <div className="ui item">
                    <div className="middle aligned content">
                      <div className="header">
                        <Popup
                          trigger={<Button content='Food Availability:' />}
                          content='1 star: no nearby food 5 star: food in building'
                        />
                      </div>
                      <Rating
                        className="ui star"
                        defaultRating={3}
                        maxRating={5}
                        onRate={this.handleRating3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="eight wide column">
                <div className="ui items">
                  <div className="ui item">
                    <div className="middle aligned content">
                      <div className="header">
                        <Popup
                          trigger={<Button content='Open Late:' />}
                          content='1 star: closes 3pm or earlier 5 star: open 12pm or later'
                        />
                      </div>
                      <Rating
                        className="ui star"
                        defaultRating={3}
                        maxRating={5}
                        onRate={this.handleRating4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Form>
          <label>Enter your review below (500 char limit)</label>
          <TextArea
            placeholder="This place is good/bad because..."
            rows={5}
            onChange={this.handleFormChange}
            maxLength={500}
          />
        </Form>

      </div>
        <Button
          className="blue"
          onClick={this.submitReview}
        >Submit</Button>

      </div>
    )
  }
}

export default Review
