import React, { Component } from 'react';
import _ from 'lodash';
import {
  Button,
  Image,
  Input,
  Grid,
  Card,
  Header
 }
from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import axios from 'axios';
import './Home.css';
import knifeforkImg from '../../assets/knifefork.png'

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: "",
      search: "",
      places: [],
      newPlaces: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleChange(e, {value}) {
    this.setState({
      value
    });
  }

  handleSearch(e, {value}) {
    this.setState({
      search: value
    })
  }

  submitSearch() {
    let newSearch = this.state.search.replace(/ /g, '+');
    console.log("updated search:");
    console.log(newSearch);

    var corsUrl = 'https://cors-anywhere.herokuapp.com';
    let googleapi = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
    let apikey = '&key=AIzaSyBDRH-amNMHWJgOXGFuASOFP7x7EOihKF0';

    var newApiCall = corsUrl + googleapi + newSearch + apikey;
    axios.get(newApiCall).then((response) => {
      console.log(response.data)
      console.log(response.data.results)
      console.log(response.data.results[0].name)
      console.log(response.data.results[0].formatted_address)
      this.setState({
        places: response.data.results
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    })
  }

  render() {
		var results = this.state.places.slice(0,20).map((place) => {
			// let photourl = '';
      // if (place.photos == undefined) {
      //   //console.log(place.name + " is undefined");
      //   photourl = knifeforkImg;
      // }
      // else {
      //   let googlephoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=';
      //   let key = '&key=AIzaSyBDRH-amNMHWJgOXGFuASOFP7x7EOihKF0';
      //   photourl = googlephoto + place.photos[0].photo_reference + key;
      // }

			return (
				<Grid.Column key={place.id}>
					<Card>
						<Image centered size="medium" value={place.id} key={place.id} src={knifeforkImg} />
						<Card.Content>
							<Card.Header>
								<Link
									to={{
										pathname: "/location",
										state: {
											location: place.name,
											address: place.formatted_address,
											photo: place.photos
										}
									}}
								>
									{place.name}
								</Link>
							</Card.Header>
							<Card.Description>
								{place.formatted_address}
							</Card.Description>
						</Card.Content>
					</Card>
					<br/>
					<br/>

				</Grid.Column>
			)
		});

		return (
    	<div className="home-text">
				<NavBar/>
				<h1>Home Component</h1>
				<Input
					placeholder='i.e. Cafes in Champaign'
					size='massive'
					onChange={this.handleSearch}
				/>
				<br/>
				<br/>
				<Button
					color="grey"
					className="ui home-submit-btn"
					onClick={this.submitSearch}
				>
					Submit
				</Button>
				<br/>
				<Header size='medium' color='teal' >Results</Header>
				<br/>
				<span>whitespace</span>
				<Grid centered className="placeList" relaxed columns={4}>
					<Grid.Row>
						{results}
					</Grid.Row>
				</Grid>
			</div>

    )
  }
}

export default Home
