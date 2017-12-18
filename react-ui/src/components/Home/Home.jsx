import React, { Component } from 'react';
import _ from 'lodash';
import {
  Button,
	Card,
	Grid,
	Header,
  Image,
  Input,
	Item,
  List
 }
from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../NavBar/NavBar.jsx';
import './Home.css';
import knifeforkImg from '../../assets/knifefork.png'
import locationIcon from '../../assets/locationIcon.png'

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

    var corsUrl = 'https://cors-anywhere.herokuapp.com/';
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
				<List.Item>
					<Image size="small" src={locationIcon} />
					<List.Content>
						<List.Description></List.Description>
						<List.Header>
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
						</List.Header>
						{place.formatted_address}
					</List.Content>
					<br/>
				</List.Item>
			)
		});

		return (
			<div className="home-text">
				<h1 id="header">StudySpaces</h1>
				<h5>Looking for a place to do work? Find one here, and leave a review!</h5>
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
				<br/>
				<List relaxed celled verticalAlign="middle">
					{results}
				</List>
			</div>
    )
  }
}

export default Home
