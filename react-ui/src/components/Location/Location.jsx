import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Rating,
  Button,
  Table,
  Header,
  List,
	Popup
 } from 'semantic-ui-react';

import axios from 'axios';
import './Location.css';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location.state.location,
      address: props.location.state.address,
      email: "",
      results: [],
      avgs: [],
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let apiCall = '/api/review?where={"location": "' + this.state.location + '"';
    apiCall = apiCall + ', "address": "' + this.state.address + '"}';
    console.log(apiCall);

    axios.get(apiCall)
    	.then( (res) => {
				// let avg1 = 3;
				// let avg2 = 3;
				// let avg3 = 3;
				// let avg4 = 3;
				// if (res.data.data != undefined && res.data.data.length > 0) {
				//   let data = res.data.data;
				//   avg1 = 0;
				//   avg2 = 0;
				//   avg3 = 0;
				//   avg4 = 0;
				//   for (let i = 0; i < data.length; i++) {
				//     avg1 += data[i].rating1;
				//     avg2 += data[i].rating2;
				//     avg3 += data[i].rating3;
				//     avg4 += data[i].rating4;
				//   }
				//   avg1 /= data.length;
				//   avg2 /= data.length;
				//   avg3 /= data.length;
				//   avg4 /= data.length;
				//   console.log(avg3);
				// }
				this.setState({
					results: res.data.data,
				})
    	})
			.then ( () => {
	      let where = '/api/review?where={"location": "' + this.state.location + '"';
	      where = where + ', "address": "' + this.state.address + '"}';
	      let select = '&select={"rating1": 1, "rating2": 1, "rating3": 1, "rating4": 1,"_id" : 0}';
	      let secondAPICall = where + select;
	      console.log(secondAPICall);

	      axios.get(secondAPICall)
		      .then( (res) => {
		        // console.log("second api call:");
		        // console.log(res.data.data);
		        if (res.data.data.length > 0) {
		          let a = 0;
		          let b = 0;
		          let c = 0;
		          let d = 0;
		          for(let i=0; i<res.data.data.length; i++) {
		            a += res.data.data[i].rating1;
		            b += res.data.data[i].rating2;
		            c += res.data.data[i].rating3;
		            d += res.data.data[i].rating4;
		          }
		          console.log("a: " + (a/res.data.data.length));
		          this.setState({
		            r1: Math.round(a/res.data.data.length * 100) / 100,
		            r2: Math.round(b/res.data.data.length * 100) / 100,
		            r3: Math.round(c/res.data.data.length * 100) / 100,
		            r4: Math.round(d/res.data.data.length * 100) / 100
		          });
		        }
		      });
		  })
  }

  render() {
    let output = this.state.results;
		console.log(this.state.avgs);
    console.log("Actual results:");
    console.log(this.state.r1);
    console.log(this.state.r2);
    console.log(this.state.r3);
    console.log(this.state.r4);

    if (output != undefined && output.length > 0) {
      output = this.state.results.map((review) => {
        return (
					<Table.Row>
            <Table.Cell textAlign="center">{review.dateCreated}</Table.Cell>
            <Table.Cell singleLine><b>{review.email}</b></Table.Cell>
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
													<Popup
														trigger={<Button>Quietness: {this.state.r1}</Button>}
														content='1 star: very loud 5 star: very quiet'
													/>
												</div>
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
                            trigger={<Button>Wi-Fi Strength: {this.state.r2}</Button>}
                            content='1 star: no wi-fi 5 star: great wi-fi'
                          />
                        </div>
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
														trigger={<Button>Food Availability: {this.state.r3}</Button>}
														content='1 star: no nearby food 5 star: food in building'
													/>
												</div>
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
                            trigger={<Button>Open Late: {this.state.r4}</Button>}
                            content='1 star: closes 3pm or earlier 5 star: open 12pm or later'
                          />
                        </div>
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
