var models = require('../models/models.js');

// GET /statics
exports.load = function(req, res){
	var datos = {};
		
	//número de preguntas
	models.Quiz.findAndCountAll().then(function(result){
		datos.numPreguntas = result.count;
		
		models.Comment.findAndCountAll().then(function(result){
			//número de comentarios totales
				datos.numComentarios = result.count;
			//número medio de comentarios por pregunta
			datos.numComentariosMedio = datos.numComentarios / datos.numPreguntas;
				
			models.Comment.findAll({group: ['QuizId']}).then(function(result){
					//número de preguntas con comentarios
					datos.numPregComent = result.length;
					
					//número preguntas sin comentarios
					datos.numPregSinComent = datos.numPreguntas - datos.numPregComent;
					

				
				res.render('statistics/statistics', {statistics: datos, errors:[]});
			});
		});	
	}).catch(function(error){next(error)});

	
	
};