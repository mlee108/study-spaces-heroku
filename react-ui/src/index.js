import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Location from './components/Location/Location.jsx';
import Profile from './components/Profile/Profile.jsx';
import ListView from './components/ListView/ListView.jsx';
import Review from './components/Review/Review.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Test from './components/Test/Test.jsx';

ReactDom.render(
	<Router>
		<div>
			<NavBar/>
			<div className="main">
				<Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/signup" component={Signup}/>
				<Route exact path="/location" component={Location}/>
				<Route exact path="/profile" component={Profile}/>
				<Route exact path="/listview" component={ListView}/>
				<Route exact path="/review" component={Review}/>
				<Route exact path="/test" component={Test}/>
			</div>
		</div>
  </Router>,
  document.getElementById('root')
);
