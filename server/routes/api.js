var Review = require('../models/review');

module.exports = function(router, passport) {

	router.post('/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) {
				return next(err); // Error 500
			}

			if (!user) { //Sign up failed
				return res.status(401).json({message: info.message});
			}

			var msg = user.email + " signup successful";
			return res.status(200).json({redirectURL: '/', message: msg});
		})(req, res, next);
	});

	router.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
				return next(err); // Error 500
			}

			if (!user) { //Authentication failed
				return res.status(401).json({message: info.message});
			}

			//Authentication successful
			console.log("req--" + req.user);
			//res.status(200).json({ user: req.user.email});
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				/* return res.status(200).json({ user: user.email}); */
				return res.status(200).json({redirectURL: '/', message: "Login successful"});
			});
		})(req, res, next);
	});

	router.get('/profile', isLoggedIn, function(req, res) {
		console.log("profile here! " + req.isAuthenticated());
		res.status(200).json({user: req.user, message: "Welcome!"});
	});

	router.get('/logout', function(req, res) {
		req.logOut();
		res.status(200).json({message: "logged out "});
	});

	// Review Routes
	var reviewRoute = router.route('/review');
	var reviewIdRoute = router.route('/review/:id');

	// GET review
	reviewRoute.get(function(req, res) {
		var query = Review.find();

		var where = req.query.where;
		var select = req.query.select;

		if (where != null) {
			query.where(JSON.parse(where));
		}
		if (select != null) {
			query.select(JSON.parse(select));
		}

		query.exec(function(err, results) {
			if (err) {
				return res.status(404).json({message: "404: REVIEW NOT FOUND", data: []});
			}
			return res.status(200).json({message: "200: REVIEW OK", data: results});
		});
	});

	//POST a new review
	reviewRoute.post(function(req, res) {
		console.log(req.body.email);
		var newReview = new Review({
			email: req.body.email,
			icon: req.body.icon,
			rating1: req.body.rating1,
			rating2: req.body.rating2,
			rating3: req.body.rating3,
			rating4: req.body.rating4,
			text: req.body.text,
			location: req.body.location,
			address: req.body.address
		});
		newReview.save(function(err) {
			if (err) {
				return res.status(404).json({message: "404: NOT FOUND", data: err})
			}
			return res.status(201).json({message: "201: CREATED", data: newReview});
		});
	});

	//PUT a review
	reviewIdRoute.put(function(req, res) {
		Review.findById(req.params.id, function(err, edit_review) {
			if (err) {
				return res.status(404).json({message: "404: NOT FOUND (find query)", data: []});
			}
			edit_review.rating1 = req.body.rating1;
			edit_review.rating2 = req.body.rating2;
			edit_review.rating3 = req.body.rating3;
			edit_review.rating4 = req.body.rating4;
			edit_review.text = req.body.text;
			edit_review.save(function(err) {
				if (err) {
					return res.status(404).json({message: "404: NOT FOUND (failed to update)", data: []});
				}
				return res.status(200).json({message: "200: OK", data: edit_review});
			});
		});
	});

	// DELETE a review
	reviewIdRoute.delete(function(req, res) {
		Review.findById(req.params.id, function(err, get_review) {
			if (err) {
				return res.status(404).json({message: "404: REVIEW NOT FOUND", data: []});
			} else if (get_review == null) {
				return res.status(404).json({message: "404: REVIEW NOT FOUND", data: []});
			} else {
				Review.remove({
					_id: req.params.id
				}, function(err, deleted_review) {
					if (err) {
						return res.status(404).json({message: "404: REVIEW NOT FOUND", data: []});
					}
					return res.status(200).json({message: "DELETE: OK", data: deleted_review});
				});
			}
		});
	});

	return router;
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({message: "unable to auth"});
}
