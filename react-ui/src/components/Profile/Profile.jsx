import React, { Component } from 'react';
import { Header, Image, Card, Icon, Table, Rating, Dropdown, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import axios from 'axios';
import './Profile.css';

import img0 from '../../assets/0.png';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import img6 from '../../assets/6.png';
import img7 from '../../assets/7.png';
import img8 from '../../assets/8.png';
import img9 from '../../assets/9.png';
let images = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];

class Profile extends Component {
  constructor(props){
      super(props);

      this.state = {
        email: "",
        icon: "",
        results: []
      }

      this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let apiCall = "";
    axios.get('/api/profile')
			.then( (res) => {
	      this.setState({
          email: res.data.user.email
        });
	    })
      .then ( (res) => {
        let firstChar = this.state.email.charAt(0);
        let charVal = (firstChar.charCodeAt(0)-96) % 10;
        // let profileIcon = profileImg;//url("../../assets/" + charVal.toString() + ".png");
        apiCall = '/api/review?where={"email": "' + this.state.email + '"}';
        this.setState({
          icon: images[charVal]
        })
      })
      .then ( (res) => {
        axios.get(apiCall, {
          params: {
            email: this.state.email,
          }
        })
        .then( (res) => {
          this.setState({
            results: res.data.data
          });
          console.log("review data...");
          console.log(res.data.data);
        });
      })
			.catch( (err) => {
				console.log(err);
	    })

  }

  render() {
    let output = this.state.results;
    if (output != undefined && output.length > 0) {
      output = this.state.results.map((review) => {
        return (
          <Table.Row>
            <Table.Cell>
              <Header textAlign='center'>{review.dateCreated}</Header>
            </Table.Cell>
            <Table.Cell singleLine><b>{review.location}</b></Table.Cell>
            <Table.Cell textAlign='center'>
              <List verticalAlign='middle'>
                <List.Item>Quietness</List.Item>
                <Rating icon='star' defaultRating={review.rating1} maxRating={5} disabled/> <br/>
                <List.Item>Wi-Fi</List.Item>
                <Rating icon='star' defaultRating={review.rating2} maxRating={5} disabled/> <br/>
                <List.Item>Food</List.Item>
                <Rating icon='star' defaultRating={review.rating3} maxRating={5} disabled/> <br/>
                <List.Item>Open Late</List.Item>
                <Rating icon='star' defaultRating={review.rating4} maxRating={5} disabled/> <br/>
              </List>
            </Table.Cell>
            <Table.Cell>
              {review.text}
            </Table.Cell>
          </Table.Row>
        )
      });
    } else {
      output =
        <Table.Row>
          <Table.Cell>
            <Header textAlign='center'>No Reviews Written</Header>
          </Table.Cell>
        </Table.Row>
    }

    return (
			<div className="ui container center aligned">
				<Header color="black" size="huge" textAlign="center">
					<Image src={this.state.icon} />
					<h1>{this.state.email}</h1>
				</Header>
				<br/>
				<Table celled padded color="teal" striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell singleLine>Date</Table.HeaderCell>
							<Table.HeaderCell>Location</Table.HeaderCell>
							<Table.HeaderCell>Ratings</Table.HeaderCell>
							<Table.HeaderCell>Reviews</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{output}
					</Table.Body>
				</Table>
				<br/>
      </div>
    )
  }
}

export default Profile
