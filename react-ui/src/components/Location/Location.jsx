import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
  Rating,
  Button,
  Table,
  Header,
  Card,
  Icon,
  Dropdown,
  List
 } from 'semantic-ui-react';

import axios from 'axios';
import styles from './Location.scss';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location.state.location,
      address: props.location.state.address,
      email: "",
      results: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let apiCall = '/api/review?where={"location": "' + this.state.location + '"';
    apiCall = apiCall + ', "address": "' + this.state.address + '"}';
    console.log(apiCall);

    axios.get(apiCall)
    .then( (res) => {
      console.log(res);
      this.setState({
        results: res.data.data
      });
    })
  }

  render() {
    let output = this.state.results;
    if (output != undefined && output.length > 0) {
      output = this.state.results.map((review) => {
        return (
          <Table.Row>
            <Table.Cell singleLine><b>{review.dateCreated}</b></Table.Cell>
            <Table.Cell singleLine><b>{review.email}</b></Table.Cell>
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
            <Header textAlign='center'>No Reviews for this location.</Header>
          </Table.Cell>
        </Table.Row>
    }


    return (
      <div>
        <h1>{this.state.location}</h1>
        <h4>{this.state.address}</h4>

        <div className="location-btn">
          <Link
            to={{
              pathname: "/review",
              state: {
                location: this.state.location,
                address: this.state.address
              }
            }}
          >
            <Button
              className="ui blue"
              >
              Submit a review for this location!
            </Button>
          </Link>
        </div>

        <div className="location-rating">
          <div className="middle aligned grid">
            <div className="ui items">

              <div className="ui grid">
                <div className="eight wide column">
                  <div className="ui items">
                  <div className="ui item">
                    <div className="middle aligned content">
                      <div className="header">
                        Rating 1
                      </div>
                      <Rating
                        className="ui star"
                        defaultRating={3}
                        maxRating={5}
                        disabled
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
                          Rating 2
                        </div>
                        <Rating
                          className="ui star"
                          defaultRating={3}
                          maxRating={5}
                          disabled
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
                        Rating 3
                      </div>
                      <Rating
                        className="ui star"
                        defaultRating={3}
                        maxRating={5}
                        disabled
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
                          Rating 4
                        </div>
                        <Rating
                          className="ui star"
                          defaultRating={3}
                          maxRating={5}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div className="ui container center aligned">
             <Table celled padded color="teal" striped>
               <Table.Header>
                 <Table.Row>
                   <Table.HeaderCell singleLine>Date</Table.HeaderCell>
                   <Table.HeaderCell>Username</Table.HeaderCell>
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



      </div>
    )
  }
}

export default Location
