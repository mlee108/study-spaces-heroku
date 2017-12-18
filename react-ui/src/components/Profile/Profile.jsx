import React, { Component } from 'react';
import { Header, Image, Card, Icon, Table, Rating, Dropdown, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import axios from 'axios';
import styles from './Profile.scss';

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
        let profileIcon = ".../../assets/" + charVal.toString() + ".png";
        apiCall = '/api/review?where={"email": "' + this.state.email + '"}';
        this.setState({
          icon: profileIcon
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
                <List.Item>Quiet</List.Item>
                <Rating icon='star' defaultRating={review.rating1} maxRating={5} disabled/> <br/>
                <List.Item>Wifi</List.Item>
                <Rating icon='star' defaultRating={review.rating2} maxRating={5} disabled/> <br/>
                <List.Item>Group</List.Item>
                <Rating icon='star' defaultRating={review.rating3} maxRating={5} disabled/> <br/>
                <List.Item>Other</List.Item>
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
             <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
               <Dropdown.Menu>
                 <Dropdown.Item>Rating</Dropdown.Item>
                 <Dropdown.Item>Date Updated</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>

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
