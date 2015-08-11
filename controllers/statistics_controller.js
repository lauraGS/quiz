var models = require('../models/models.js');

// GET /statics
exports.load = function(req, res){
	var datos = {};
		
	//n�mero de preguntas
	models.Quiz.findAndCountAll().then(function(result){
		datos.numPreguntas = result.count;
		
		models.Comment.findAndCountAll().then(function(result){
			//n�mero de comentarios totales
				datos.numComentarios = result.count;
			//n�mero medio de comentarios por pregunta
			datos.numComentariosMedio = datos.numComentarios / datos.numPreguntas;
			
			models.Quiz.findAll({include: [{ model: models.Comment }]}).then(function (result) {
				if (result) { 
					var numPregNoComments = 0;
					result.forEach(function (quiz) {
						if (quiz.Comments.length === 0) {
							numPregNoComments++;
						}
					});
					//n�mero preguntas sin comentarios
					datos.numPregSinComent = numPregNoComments;
					//n�mero de preguntas con comentarios
					datos.numPregComent = datos.numPreguntas - datos.numPregSinComent;
				}else{
					datos.numPregSinComent = 0;
					datos.numPregComent = 0;
				}
			
			
				res.render('statistics/statistics', {statistics: datos, errors:[]});
			});
		});	
	}).catch(function(error){next(error)});

	
	
};