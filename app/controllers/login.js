var express = require('express');
var bcrypt = require('bcryptjs')
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

module.exports = function(app){



  var User = app.models.user;

  var controller = {};
  function hashGen(pass) {
    return crypto.createHash('md5').update(pass).digest("hex");
  }
  controller.registro = function(req, res){
    console.log("erro");
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var categorias = req.body.categorias;

    console.log(categorias[0] + " !!!Categorias!!!");
    console.log(typeof categorias + "!!! tipo de categorias!!!");
    console.log(password + " !pass req.body!");
    // Validation
    req.checkBody('email', 'Email em branco').notEmpty();
    req.checkBody('email', 'Email não é válido').isEmail();
    req.checkBody('username', 'Usuário em branco').notEmpty();
    req.checkBody('password', 'Senha em branco').notEmpty();
    req.checkBody('password2', 'Senhas não são iguais').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
      res.render('registro',{
        errors:errors
      });
    } else {
      var passwordHash = hashGen(password);
      console.log(passwordHash + " !hash fora funcao!");
      var newUser = new User({
        email:email,
        username: username,
        password: passwordHash,
        categorias: categorias
      });
      newUser.save(function(err){
        if(err) throw err;
        console.log('Usuario salvo');
        res.redirect('/login');
      });
    }

  }


  controller.login = function(req, res) {
    var passLogin = req.body.password;

    var passHashLogin = hashGen(passLogin);
    console.log(passHashLogin);
    User.findOne({
      username: req.body.username
      },function(err, user){
        console.log(user + " !NAME");
        if(!user) {
          res.mensagem = 'Usuario não encontrado';
          console.log('user not found');
          res.redirect('/login');
      } else if(user) {
          console.log(passHashLogin);
          console.log(user.password + " ! ass");

          if(user.password != passHashLogin ) {
            console.log(passHashLogin);
            console.log('pass wrong');
            res.menssagem = 'Senha errada'
            res.redirect('/login');
          }
          else {
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresIn: 60*8
            });
            req.session.user = user;
            req.session.token = token;
            res.redirect('/in');

          }
      }
    })
  }


  return controller;
}
