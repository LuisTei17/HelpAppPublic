var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function(app){
	var controller = app.controllers.login;

	// Registra usuario
	app.route('/registro').post(controller.registro).get(function(req, res){
		res.redirect('/#!/registro');
	});
	// Loga usuario
	app.route('/login').post(controller.login).get(function(req, res){
		res.redirect('/#!/login');
	});

	app.route('/logout').post(controller.logout).get(function(req, res){
		res.redirect('/#!/login');
	});

	var apiRoutes = express.Router();
	var logout = express.Router();

	apiRoutes.use(function(req, res, next) {
		var token = req.session.token;
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					res.user = req.session.user;
					next();
				}
			});
		} else {
			res.redirect('/#!/login');
		}
	});

	logout.use(function(req, res) {
		var token = req.session.token;
		if(token) {
			console.log(token);
			token = null;
			next();
		} else {
			res.redirect('/#!/registro');
		}
	})
	app.use('/in/*', apiRoutes);
	//app.use('/in/', apiRoutes )
	//app.post('/in', controller.login);
	app.get('/in', apiRoutes, function(req, res){
		res.redirect('/#!/feed', {
			user:req.session.user
		});
	})

	app.get(`/in/luis`, function(req,res){
		res.redirect('/#!/profile');
	})

	app.get('/in/logout', apiRoutes, function(req, res){
		req.session.token =  null;
		res.redirect('/#!/login');
	})

}
