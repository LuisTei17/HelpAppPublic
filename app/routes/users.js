var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function(app){
	var controller = app.controllers.login;
	var apiRoutes = express.Router();

	apiRoutes.use(function(req, res, next) {
		var token = req.session.token;
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
					return res.redirect('/index');
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					res.user = req.session.user;
					next();
				}
			});
		} else {
			res.redirect('/login');
		}
	});

	app.use('/in', apiRoutes);
	// Registra usuario
	app.route('/registro').post(controller.registro).get(function(req, res){
		res.render('registro');
	});
	// Loga usuario
	app.route('/login').post(controller.login).get(function(req, res){
		res.render('login');
	});
	// Verifica se usuario está autenticado e mostra dados
	app.route('/index').get(function(req, res){
		if(req.session.token) {

			res.render('index', {
				user: req.session.user
			});
		} else {
			res.render('index');
		}
	})

	app.get('/in', apiRoutes, function(req, res){
		res.render('feed', {
			user:req.session.user
		});
	})

	app.route(`/in/profile`).get(function(req,res){
		res.render('profile', {
			user:req.session.user
		});
	})

	app.get('/in/logout', apiRoutes, function(req, res){
		req.session.token =  null;
		res.render('login', {
			mensagem: 'Você se deslogou'
		});
	})

	app.use('/*', function(req, res){
		res.redirect('/index');
	})
}
