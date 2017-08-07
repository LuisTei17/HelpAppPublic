var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Usuario Schema
module.exports = function(){
	var UsuarioSchema = mongoose.Schema({
		username: {
			type: String,
			index:true
		},
		password: {
			type: String
		},
		email: {
			type: String
		}
	});

	var Usuario = mongoose.model('Usuario', UsuarioSchema);
 /*
	Usuario.criaUsuario = function(novoUsuario, callback){
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(novoUsuario.password, salt, function(err, hash) {
		        novoUsuario.password = hash;
		        novoUsuario.save(callback);
		    });
		});
	}

	Usuario.usuarioPorNome = function(username, callback){
		var query = {username: username};
		Usuario.findOne(query, callback);
	}

	Usuario.usuarioPorId = function(id, callback){
		Usuario.findById(id, callback);
	}

	Usuario.comparaSenha = function(candidatoSenha, hash, callback){
		bcrypt.compare(candidatoSenha, hash, function(err, achou) {
	    	if(err) {
	        throw err;
	      }
	    	callback(null, achou);
		});
	}
	*/
	return Usuario;
}
